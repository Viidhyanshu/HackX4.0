export default function Home() {
  return (
    <div className="relative min-h-screen w-full bg-black">
      {/* Figma: 1675×853px, top:-390px left:-82px — gradient fades to transparent so black shows outside */}
      <div
        className="pointer-events-none absolute"
        style={{
          width: "1675px",
          height: "853px",
          top: "-390px",
          left: "-82px",
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(184,110,249,0.95) 0%, rgba(120,1,255,0.85) 35%, rgba(60,0,130,0.4) 60%, transparent 75%)",
        }}
      />
      <div className="flex-grow">
        {/* Page content goes here */}
      </div>
    </div>
  );
}
