"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  MessageSquare,
  FileText,
  Palette,
  Image,
  Play,
  Code,
  ArrowRight,
} from "lucide-react";

export function ExploreFeaturesSection() {
  const features = [
    {
      icon: MessageSquare,
      chipClass: "icon-chip green",
      title: "3D Agent",
      desc: "Chat from idea, photo, or sketch to a 3D model.",
      href: "/workspace",
    },
    {
      icon: FileText,
      chipClass: "icon-chip blue",
      title: "Text to 3D",
      desc: "Describe it, generate it — 3D models from text prompts.",
      href: "/workspace",
    },
    {
      icon: Palette,
      chipClass: "icon-chip purple",
      title: "AI Texturing",
      desc: "Add realistic PBR textures to any 3D model with AI.",
      href: "/workspace",
    },
    {
      icon: Image,
      chipClass: "icon-chip green",
      title: "AI Image Generator",
      desc: "Generate multi-view images optimized for 3D creation.",
      href: "/workspace",
    },
    {
      icon: Play,
      chipClass: "icon-chip blue",
      title: "Animation",
      desc: "Auto-rig and animate any 3D character in seconds.",
      href: "/workspace",
    },
    {
      icon: Code,
      chipClass: "icon-chip purple",
      title: "API",
      desc: "Integrate Studio3D's 3D AI into your app or pipeline.",
      href: "/workspace",
    },
  ];

  return (
    <section id="explore-features" className="relative bg-bg-base py-24 border-y border-border-subtle overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-to-r from-[#00ffa3]/10 to-[#00c3ff]/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="section-label mb-3">
            Ecosystem
          </div>
          <h2 className="text-3xl font-bold text-text-primary tracking-tight mt-2">
            Explore More Features
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-12">
          {features.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
              >
                <Link
                  href={item.href}
                  className="glass-card block p-6 group h-full flex flex-col justify-between"
                >
                  <div>
                    <div
                      className={`${item.chipClass} group-hover:scale-105 transition-transform`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>

                    <h3 className="card-title text-base font-semibold group-hover:text-neon-green dark:group-hover:text-white transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm text-text-muted mt-1.5 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>

                  <div className="mt-5 flex items-center gap-1.5 text-xs text-neon-blue group-hover:text-neon-green font-medium transition-colors">
                    <span>Explore</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
