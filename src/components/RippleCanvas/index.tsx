"use client";

import { useEffect, useRef, useCallback, useState } from "react";

const MAX_DROPS = 16;

interface Drop {
  x: number;
  y: number;
  radius: number;
  amplitude: number;
  time: number;
}

const VERTEX_SRC = `
attribute vec2 a_position;
varying vec2 v_uv;
void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
  v_uv = a_position * 0.5 + 0.5;
}`;

const FRAGMENT_PREFIX = `#define MAX_DROPS ${MAX_DROPS}\n`;

const FRAGMENT_SRC = `
precision highp float;
varying vec2 v_uv;
uniform sampler2D u_image;
uniform vec2 u_drops[MAX_DROPS];
uniform float u_dropTimes[MAX_DROPS];
uniform float u_dropRadii[MAX_DROPS];
uniform float u_dropAmplitudes[MAX_DROPS];
uniform int u_dropCount;
uniform float u_time;
uniform float u_perturbance;

void main() {
  vec2 uv = v_uv;
  vec2 distortion = vec2(0.0);

  for (int i = 0; i < MAX_DROPS; i++) {
    if (i >= u_dropCount) break;
    float age = u_time - u_dropTimes[i];
    if (age < 0.0 || age > 3.0) continue;

    float dist = distance(uv, u_drops[i]);
    float maxRadius = u_dropRadii[i] * (1.0 + age * 0.8);
    if (dist > maxRadius) continue;

    float wave = sin(dist * 60.0 - age * 12.0);
    float envelope = exp(-age * 1.5) * (1.0 - smoothstep(0.0, maxRadius, dist));
    vec2 dir = uv - u_drops[i];
    float d = length(dir);
    if (d > 0.001) {
      distortion += normalize(dir) * u_dropAmplitudes[i] * envelope * wave;
    }
  }

  vec2 distortedUV = uv + distortion * u_perturbance;
  distortedUV = clamp(distortedUV, 0.0, 1.0);
  gl_FragColor = texture2D(u_image, distortedUV);
}`;

interface RippleCanvasProps {
  imageUrl: string;
  isActive: boolean;
  resolution?: number;
  perturbance?: number;
  dropRadius?: number;
  interactive?: boolean;
  className?: string;
}

export default function RippleCanvas({
  imageUrl,
  isActive,
  resolution = 256,
  perturbance = 0.03,
  dropRadius = 20,
  interactive = true,
  className = "",
}: RippleCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dropsRef = useRef<Drop[]>([]);
  const startTimeRef = useRef(0);
  const glRef = useRef<WebGLRenderingContext | null>(null);
  const programRef = useRef<WebGLProgram | null>(null);
  const textureRef = useRef<WebGLTexture | null>(null);
  const rafRef = useRef(0);
  const pointerRef = useRef<{ x: number; y: number } | null>(null);
  const lastDropTimeRef = useRef(0);
  const [textureReady, setTextureReady] = useState(false);
  const readyRef = useRef(false);

  useEffect(() => {
    if (!isActive) {
      setTextureReady(false);
      readyRef.current = false;
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", { alpha: false, antialias: false });
    if (!gl) return;
    glRef.current = gl;

    const compileShader = (src: string, type: number) => {
      const shader = gl.createShader(type)!;
      gl.shaderSource(shader, src);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error("Shader compile error:", gl.getShaderInfoLog(shader));
      }
      return shader;
    };

    const vs = compileShader(VERTEX_SRC, gl.VERTEX_SHADER);
    const fs = compileShader(FRAGMENT_PREFIX + FRAGMENT_SRC, gl.FRAGMENT_SHADER);

    const program = gl.createProgram()!;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error("Program link error:", gl.getProgramInfoLog(program));
    }
    programRef.current = program;

    const positions = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]);
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

    const aPosition = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(aPosition);
    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);

    const img = new Image();
    img.crossOrigin = "anonymous";

    img.onload = () => {
      if (!readyRef.current) {
        readyRef.current = true;
        setTextureReady(true);
        return;
      }

      const texture = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);

      const maxDim = resolution;
      const aspect = img.naturalWidth / img.naturalHeight;
      if (aspect > 1) {
        canvas.width = maxDim;
        canvas.height = Math.round(maxDim / aspect);
      } else {
        canvas.height = maxDim;
        canvas.width = Math.round(maxDim * aspect);
      }
      gl.viewport(0, 0, canvas.width, canvas.height);

      textureRef.current = texture;
      startTimeRef.current = performance.now() / 1000;
      dropsRef.current = [];
    };

    img.onerror = () => {
      if (!readyRef.current) {
        readyRef.current = true;
        setTextureReady(true);
      }
    };

    img.src = imageUrl;

    return () => {
      readyRef.current = false;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteBuffer(buffer);
      if (textureRef.current) gl.deleteTexture(textureRef.current);
      programRef.current = null;
      textureRef.current = null;
      glRef.current = null;
    };
  }, [imageUrl, isActive, resolution]);

  useEffect(() => {
    if (!isActive || !textureReady) return;

    const gl = glRef.current;
    const program = programRef.current;
    const texture = textureRef.current;
    if (!gl || !program || !texture) return;

    const uLoc = (name: string) => gl.getUniformLocation(program, name)!;
    const uImage = uLoc("u_image");
    const uDrops = uLoc("u_drops[0]");
    const uDropTimes = uLoc("u_dropTimes[0]");
    const uDropRadii = uLoc("u_dropRadii[0]");
    const uDropAmplitudes = uLoc("u_dropAmplitudes[0]");
    const uDropCount = uLoc("u_dropCount");
    const uTime = uLoc("u_time");
    const uPerturbance = uLoc("u_perturbance");

    const dropXs = new Float32Array(MAX_DROPS);
    const dropYs = new Float32Array(MAX_DROPS);
    const dropTimesArr = new Float32Array(MAX_DROPS);
    const dropRadiiArr = new Float32Array(MAX_DROPS);
    const dropAmpsArr = new Float32Array(MAX_DROPS);
    const combinedDrops = new Float32Array(MAX_DROPS * 2);

    const render = () => {
      const now = performance.now() / 1000 - startTimeRef.current;
      const drops = dropsRef.current;
      const count = Math.min(drops.length, MAX_DROPS);

      for (let i = 0; i < count; i++) {
        dropXs[i] = drops[i].x;
        dropYs[i] = drops[i].y;
        dropTimesArr[i] = drops[i].time;
        dropRadiiArr[i] = drops[i].radius;
        dropAmpsArr[i] = drops[i].amplitude;
      }

      for (let i = count; i < MAX_DROPS; i++) {
        dropXs[i] = 0;
        dropYs[i] = 0;
        dropTimesArr[i] = -999;
        dropRadiiArr[i] = 0;
        dropAmpsArr[i] = 0;
      }

      for (let i = 0; i < MAX_DROPS; i++) {
        combinedDrops[i * 2] = dropXs[i];
        combinedDrops[i * 2 + 1] = dropYs[i];
      }

      gl.useProgram(program);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.uniform1i(uImage, 0);

      gl.uniform2fv(uDrops, combinedDrops);
      gl.uniform1fv(uDropTimes, dropTimesArr);
      gl.uniform1fv(uDropRadii, dropRadiiArr);
      gl.uniform1fv(uDropAmplitudes, dropAmpsArr);
      gl.uniform1i(uDropCount, count);
      gl.uniform1f(uTime, now);
      gl.uniform1f(uPerturbance, perturbance);

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

      rafRef.current = requestAnimationFrame(render);
    };

    rafRef.current = requestAnimationFrame(render);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isActive, textureReady, perturbance]);

  const addDrop = useCallback(
    (x: number, y: number) => {
      const drops = dropsRef.current;
      const now = performance.now() / 1000 - startTimeRef.current;
      drops.push({
        x,
        y,
        radius: dropRadius / (interactive ? 500 : 200),
        amplitude: 0.025,
        time: now,
      });
      if (drops.length > MAX_DROPS) {
        drops.splice(0, drops.length - MAX_DROPS);
      }
    },
    [dropRadius, interactive],
  );

  useEffect(() => {
    if (!isActive || !interactive) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      pointerRef.current = { x, y };

      const now = performance.now() / 1000 - startTimeRef.current;
      if (now - lastDropTimeRef.current > 0.04) {
        addDrop(x, y);
        lastDropTimeRef.current = now;
      }
    };

    const onPointerLeave = () => {
      pointerRef.current = null;
    };

    const onPointerDown = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;

      const drops = dropsRef.current;
      const now = performance.now() / 1000 - startTimeRef.current;
      drops.push({
        x,
        y,
        radius: dropRadius / 300,
        amplitude: 0.06,
        time: now,
      });
      if (drops.length > MAX_DROPS) {
        drops.splice(0, drops.length - MAX_DROPS);
      }
    };

    canvas.addEventListener("pointermove", onPointerMove, { passive: true });
    canvas.addEventListener("pointerleave", onPointerLeave);
    canvas.addEventListener("pointerdown", onPointerDown);

    return () => {
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerleave", onPointerLeave);
      canvas.removeEventListener("pointerdown", onPointerDown);
    };
  }, [isActive, interactive, addDrop, dropRadius]);

  if (!isActive) return null;

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-auto absolute inset-0 h-full w-full ${className}`}
    />
  );
}
