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
      color: "text-violet-400 bg-violet-950/40 border-violet-800/30",
      title: "3D Agent",
      desc: "Chat from idea, photo, or sketch to a 3D model.",
      href: "/workspace",
    },
    {
      icon: FileText,
      color: "text-blue-400 bg-blue-950/40 border-blue-800/30",
      title: "Text to 3D",
      desc: "Describe it, generate it — 3D models from text prompts.",
      href: "/workspace",
    },
    {
      icon: Palette,
      color: "text-violet-400 bg-violet-950/40 border-violet-800/30",
      title: "AI Texturing",
      desc: "Add realistic PBR textures to any 3D model with AI.",
      href: "/workspace",
    },
    {
      icon: Image,
      color: "text-blue-400 bg-blue-950/40 border-blue-800/30",
      title: "AI Image Generator",
      desc: "Generate multi-view images optimized for 3D creation.",
      href: "/workspace",
    },
    {
      icon: Play,
      color: "text-violet-400 bg-violet-950/40 border-violet-800/30",
      title: "Animation",
      desc: "Auto-rig and animate any 3D character in seconds.",
      href: "/workspace",
    },
    {
      icon: Code,
      color: "text-blue-400 bg-blue-950/40 border-blue-800/30",
      title: "API",
      desc: "Integrate Studio3D's 3D AI into your app or pipeline.",
      href: "/workspace",
    },
  ];

  return (
    <section id="explore-features" className="bg-[#050505] py-24 border-y border-[#111111]">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold text-white tracking-tight">
            Explore More Features
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-12">
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
                  className="block bg-[#0d0d0d] border border-[#1f1f1f] rounded-2xl p-6 hover:border-violet-500/30 hover:bg-[#111111] transition-all group h-full flex flex-col justify-between"
                >
                  <div>
                    <div
                      className={`w-10 h-10 rounded-xl border flex items-center justify-center mb-4 ${item.color}`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>

                    <h3 className="text-base font-semibold text-white group-hover:text-violet-300 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm text-[#888888] mt-1.5 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>

                  <div className="mt-5 flex items-center gap-1 text-xs text-violet-400 group-hover:text-violet-300 font-medium">
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
