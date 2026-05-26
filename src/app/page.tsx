export default function Home() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-black">
      {/* Figma: 1675×853px radial gradient, top:-390px left:-82px, blur:394.6px */}
      <div
        className="pointer-events-none absolute"
        style={{
          width: "1675px",
          height: "853px",
          top: "-390px",
          left: "-82px",
          background:
            "radial-gradient(ellipse at center, rgba(184,110,249,1) 0%, rgba(120,1,255,1) 100%)",
          filter: "blur(394.6px)",
        }}
      />
    </main>
  );
}
