export default function Home() {
  return (
    <main className="relative min-h-screen w-full bg-black">
      {/* Clipping wrapper — contains the blur to the Figma-specified bounds */}
      <div
        className="pointer-events-none absolute overflow-hidden"
        style={{
          width: "1675px",
          height: "853px",
          top: "-390px",
          left: "-82px",
        }}
      >
        {/* Figma: radial gradient rgba(184,110,249) → rgba(120,1,255), blur 394.6px */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse at center, rgba(184,110,249,1) 0%, rgba(120,1,255,1) 100%)",
            filter: "blur(394.6px)",
          }}
        />
      </div>
    </main>
  );
}
