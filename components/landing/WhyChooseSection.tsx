"use client";

import { motion } from "framer-motion";
import { Image, LayoutGrid, Download, Globe, Box, Layers } from "lucide-react";

export function WhyChooseSection() {
  const features = [
    {
      icon: Image,
      title: "Single Image to 3D",
      desc: "Upload one photo and generate a fully textured 3D model in about a minute. Choose Meshy 7 (latest) or Meshy 6 for speed vs quality balance.",
    },
    {
      icon: LayoutGrid,
      title: "Multi-view & Batch",
      desc: "Upload up to 4 angles of one object for accurate reconstruction, or batch convert up to 10 images into 10 separate models in one run.",
    },
    {
      icon: Download,
      title: "Any Format, Ready to Use",
      desc: "Export to GLB, OBJ, FBX, STL, USDZ and more. Every file works straight out of the box — no conversion friction.",
    },
    {
      icon: Globe,
      title: "No Software, No Setup",
      desc: "Everything runs in your browser. No download, no plugin, no learning curve — generate your first 3D model in under a minute.",
    },
    {
      icon: Box,
      title: "High-Fidelity Mesh Output",
      desc: "Sharp edges, accurate proportions, and rich surface detail. Generated models can reach nearly 600K faces for maximum fidelity.",
    },
    {
      icon: Layers,
      title: "PBR-Ready Textures Included",
      desc: "Every model comes with Diffuse, Roughness, Metallic, and Normal maps — ready for any game engine or 3D renderer right out of the box.",
    },
  ];

  return (
    <section id="features" className="bg-black py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            Why Creators Choose Studio3D&apos;s Image to 3D
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
          {features.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="bg-[#0d0d0d] border border-[#1f1f1f] rounded-2xl p-8 hover:border-[#2a2a2a] transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-white group-hover:scale-105 transition-transform shadow-sm">
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="text-xl font-semibold text-white mt-6">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[#888888] mt-3 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#181818] flex items-center justify-between text-xs text-[#555555]">
                  <span>Studio3D AI Engine</span>
                  <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity font-medium">
                    Active
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
