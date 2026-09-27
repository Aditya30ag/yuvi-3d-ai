"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

export function TestimonialsSection() {
  const testimonials = [
    {
      avatar: "B",
      avatarBg: "bg-violet-700",
      name: "bernie b.",
      role: "Arts & Crafts · United States",
      review:
        "The image-to-3D feature works surprisingly well for quick conversions. I can upload a picture and get a usable 3D model without needing advanced 3D modeling skills.",
    },
    {
      avatar: "D",
      avatarBg: "bg-blue-700",
      name: "Darlene C.",
      role: "Animation Industry · United States",
      review:
        "Studio3D significantly enhances my work by providing more accurate image-to-3D conversions, even from a single angle, which is a massive time-saver for developing 3D concepts.",
    },
    {
      avatar: "A",
      avatarBg: "bg-emerald-700",
      name: "Aaron P.",
      role: "3D Printing Enthusiast",
      review:
        "I just need to upload the photos and start generating, which saves me a great deal of time. The image to 3D function allows me to take photos of miniatures and convert them into 3D models to print myself.",
    },
    {
      avatar: "S",
      avatarBg: "bg-orange-700",
      name: "Sarah M.",
      role: "Game Developer · Canada",
      review:
        "The quality of the 3D models is impressive. Being able to go from concept art directly to a game-ready asset saves our team hours of work.",
    },
  ];

  return (
    <section id="testimonials" className="bg-[#050505] py-24 lg:py-32 border-y border-[#111111] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            Loved by 12,000,000+ Creators Worldwide
          </h2>
        </motion.div>
      </div>

      {/* Infinite scrolling marquee track */}
      <div className="mt-16 relative w-full overflow-hidden flex items-center py-4">
        <div className="flex w-max animate-marquee-testimonials gap-6">
          {[...testimonials, ...testimonials, ...testimonials].map((t, idx) => (
            <div
              key={idx}
              className="bg-[#0d0d0d] border border-[#1f1f1f] rounded-2xl p-6 w-80 flex-shrink-0 flex flex-col justify-between hover:border-[#2a2a2a] transition-colors"
            >
              <div>
                {/* Author Info */}
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className={`w-9 h-9 rounded-full ${t.avatarBg} text-white font-semibold flex items-center justify-center text-sm shadow-inner`}
                  >
                    {t.avatar}
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-white leading-tight">
                      {t.name}
                    </h4>
                    <p className="text-xs text-[#888888]">{t.role}</p>
                  </div>
                </div>

                {/* Stars */}
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-3.5 h-3.5 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>

                {/* Review Text */}
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                  &ldquo;{t.review}&rdquo;
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-[#181818] flex items-center justify-between text-[10px] text-[#555555]">
                <span>Verified Studio3D Creator</span>
                <span>5/5 Rating</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Badges footer */}
      <div className="mt-12 flex items-center justify-center gap-4">
        <div className="inline-flex items-center gap-1.5 border border-[#2a2a2a] rounded-full px-4 py-2 text-xs text-white bg-[#0d0d0d]">
          <span className="font-semibold">G2</span>
          <span className="text-amber-400">★</span>
          <span className="text-zinc-300">4.8</span>
        </div>
        <div className="inline-flex items-center gap-1.5 border border-[#2a2a2a] rounded-full px-4 py-2 text-xs text-white bg-[#0d0d0d]">
          <span className="font-semibold">Trustpilot</span>
          <span className="text-emerald-400">★</span>
          <span className="text-zinc-300">4.8</span>
        </div>
      </div>
    </section>
  );
}
