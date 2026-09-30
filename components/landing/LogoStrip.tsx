"use client";

const ROW_1 = [
  "Nexon",
  "DNEG",
  "Meta",
  "Supercell",
  "Flashforge",
  "ELEGOO",
  "Bambu Lab",
  "FunPlus",
  "Square Enix",
  "PICO XR",
];

const ROW_2 = [
  "Stanford",
  "Niantic",
  "MIT",
  "Harvard",
  "Google",
  "UC Berkeley",
  "Microsoft",
  "Duke",
  "Georgia Tech",
  "D5 Render",
];

export function LogoStrip() {
  return (
    <section className="bg-bg-base py-12 overflow-hidden select-none relative transition-colors">
      <div className="max-w-7xl mx-auto px-6 mb-6">
        <h3 className="section-label text-center">
          Trusted by creators at
        </h3>
      </div>

      {/* Trust badge strip in a frosted glass pill */}
      <div className="max-w-6xl mx-auto px-4">
        <div className="relative rounded-3xl md:rounded-full border border-border-subtle bg-bg-surface/80 backdrop-blur-[20px] py-6 px-4 sm:px-8 shadow-md overflow-hidden">
          {/* Gradient edges mask using bg-surface */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-bg-surface to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-bg-surface to-transparent z-10" />

          {/* Row 1: Scrolling Left */}
          <div className="relative w-full overflow-hidden flex items-center py-1">
            <div className="flex w-max animate-marquee-left gap-8">
              {[...ROW_1, ...ROW_1, ...ROW_1].map((logo, idx) => (
                <div key={idx} className="flex items-center gap-8">
                  <span className="text-sm font-semibold tracking-wide text-text-muted hover:text-text-primary transition-opacity whitespace-nowrap cursor-default">
                    {logo}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-border-secondary" />
                </div>
              ))}
            </div>
          </div>

          {/* Row 2: Scrolling Right */}
          <div className="relative w-full overflow-hidden flex items-center py-1 mt-2">
            <div className="flex w-max animate-marquee-right gap-8">
              {[...ROW_2, ...ROW_2, ...ROW_2].map((logo, idx) => (
                <div key={idx} className="flex items-center gap-8">
                  <span className="text-sm font-semibold tracking-wide text-text-muted hover:text-text-primary transition-opacity whitespace-nowrap cursor-default">
                    {logo}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-border-secondary" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Trust Rating Footnote */}
      <div className="text-center mt-6">
        <p className="text-xs text-text-muted tracking-wide">
          <span className="text-neon-green mr-1">★★★★★</span> G2 Rating 4.8 · Trustpilot 4.8 · 12M+ Creators
        </p>
      </div>
    </section>
  );
}
