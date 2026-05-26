export default function Home() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-[#08010F]">
      {/* ── deep violet core glow ── */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 40%, rgba(120,1,255,0.45) 0%, transparent 70%)",
        }}
      />

      {/* ── soft purple halo ── */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 90% 70% at 50% 30%, rgba(184,110,249,0.20) 0%, transparent 65%)",
        }}
      />

      {/* ── magenta edge accent – bottom-left ── */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 50% 40% at 0% 100%, rgba(210,66,215,0.25) 0%, transparent 60%)",
        }}
      />

      {/* ── magenta edge accent – top-right ── */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 40% 35% at 100% 0%, rgba(210,66,215,0.20) 0%, transparent 60%)",
        }}
      />

      {/* ── subtle noise / grain overlay ── */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          backgroundSize: "200px 200px",
        }}
      />
    </main>
  );
}
