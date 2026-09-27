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
    <section className="bg-black border-y border-[#111111] py-10 overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-6 mb-6">
        <h3 className="text-xs text-[#555555] uppercase tracking-widest text-center font-medium">
          Trusted by creators at
        </h3>
      </div>

      {/* Row 1: Scrolling Left */}
      <div className="relative w-full overflow-hidden flex items-center py-2 mask-radial">
        <div className="flex w-max animate-marquee-left gap-8">
          {[...ROW_1, ...ROW_1, ...ROW_1].map((logo, idx) => (
            <div key={idx} className="flex items-center gap-8">
              <span className="text-sm font-semibold tracking-wide text-white opacity-40 hover:opacity-75 transition-opacity whitespace-nowrap cursor-default">
                {logo}
              </span>
              <span className="w-1 h-1 rounded-full bg-[#262626]" />
            </div>
          ))}
        </div>
      </div>

      {/* Row 2: Scrolling Right */}
      <div className="relative w-full overflow-hidden flex items-center py-2 mt-2">
        <div className="flex w-max animate-marquee-right gap-8">
          {[...ROW_2, ...ROW_2, ...ROW_2].map((logo, idx) => (
            <div key={idx} className="flex items-center gap-8">
              <span className="text-sm font-semibold tracking-wide text-white opacity-40 hover:opacity-75 transition-opacity whitespace-nowrap cursor-default">
                {logo}
              </span>
              <span className="w-1 h-1 rounded-full bg-[#262626]" />
            </div>
          ))}
        </div>
      </div>

      {/* Trust Rating Footnote */}
      <div className="text-center mt-6">
        <p className="text-xs text-[#555555] tracking-wide">
          <span className="text-amber-400 mr-1">★★★★★</span> G2 Rating 4.8 · Trustpilot 4.8 · 12M+ Creators
        </p>
      </div>
    </section>
  );
}
