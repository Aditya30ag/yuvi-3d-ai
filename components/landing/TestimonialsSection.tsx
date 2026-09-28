"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

export function TestimonialsSection() {
  const testimonials = [
    {
      avatar: "B",
      avatarBg: "bg-gradient-to-tr from-[#00ffa3] to-[#00c3ff] text-[#050508]",
      name: "bernie b.",
      role: "Arts & Crafts · United States",
      review:
        "The image-to-3D feature works surprisingly well for quick conversions. I can upload a picture and get a usable 3D model without needing advanced 3D modeling skills.",
    },
    {
      avatar: "D",
      avatarBg: "bg-gradient-to-tr from-[#00c3ff] to-[#6300ff] text-white",
      name: "Darlene C.",
      role: "Animation Industry · United States",
      review:
        "Studio3D significantly enhances my work by providing more accurate image-to-3D conversions, even from a single angle, which is a massive time-saver for developing 3D concepts.",
    },
    {
      avatar: "A",
      avatarBg: "bg-gradient-to-tr from-[#6300ff] to-[#00ffa3] text-white",
      name: "Aaron P.",
      role: "3D Printing Enthusiast",
      review:
        "I just need to upload the photos and start generating, which saves me a great deal of time. The image to 3D function allows me to take photos of miniatures and convert them into 3D models to print myself.",
    },
    {
      avatar: "S",
      avatarBg: "bg-gradient-to-tr from-[#00ffa3] to-[#6300ff] text-[#050508]",
      name: "Sarah M.",
      role: "Game Developer · Canada",
      review:
        "The quality of the 3D models is impressive. Being able to go from concept art directly to a game-ready asset saves our team hours of work.",
    },
  ];

  return (
    <section id="testimonials" className="relative bg-[#050508] py-24 lg:py-32 overflow-hidden border-y border-white/[0.06]">
      {/* Ambient radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-r from-[#00ffa3]/10 to-[#00c3ff]/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="section-label mb-3">
            Community Reviews
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight mt-2">
            Loved by 12,000,000+ Creators Worldwide
          </h2>
        </motion.div>
      </div>

      {/* Infinite scrolling marquee track */}
      <div className="mt-16 relative w-full overflow-hidden flex items-center py-4">
        {/* Subtle gradient edges mask */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#050508] to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#050508] to-transparent z-10" />

        <div className="flex w-max animate-marquee-testimonials gap-6">
          {[...testimonials, ...testimonials, ...testimonials].map((t, idx) => (
            <div
              key={idx}
              className="testimonial-card-gradient-top p-6 w-80 flex-shrink-0 flex flex-col justify-between"
            >
              <div>
                {/* Author Info */}
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className={`w-9 h-9 rounded-full ${t.avatarBg} font-bold flex items-center justify-center text-sm shadow-md`}
                  >
                    {t.avatar}
                  </div>
                  <div>
                    <h4 className="card-title text-sm font-semibold leading-tight">
                      {t.name}
                    </h4>
                    <p className="text-xs text-white/50">{t.role}</p>
                  </div>
                </div>

                {/* Stars in neon green */}
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-3.5 h-3.5 fill-[#00ffa3] text-[#00ffa3]"
                    />
                  ))}
                </div>

                {/* Review Text */}
                <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
                  &ldquo;{t.review}&rdquo;
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-white/[0.07] flex items-center justify-between text-[10px] text-white/40">
                <span>Verified Studio3D Creator</span>
                <span className="text-[#00ffa3] font-medium">5/5 Rating</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Badges footer */}
      <div className="mt-12 flex items-center justify-center gap-4 relative z-10">
        <div className="meta-pill">
          <span className="font-semibold text-white">G2</span>
          <span className="text-[#00ffa3] font-bold">★</span>
          <span>4.8</span>
        </div>
        <div className="meta-pill">
          <span className="font-semibold text-white">Trustpilot</span>
          <span className="text-[#00ffa3] font-bold">★</span>
          <span>4.8</span>
        </div>
      </div>
    </section>
  );
}
