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

  const chipTypes = ["green", "blue", "purple", "blue", "green", "purple"];

  return (
    <section id="features" className="relative bg-bg-base py-24 lg:py-32 overflow-hidden transition-colors">
      {/* Subtle ambient radial glows behind feature section */}
      <div className="absolute top-1/3 left-10 w-[500px] h-[500px] bg-neon-green/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-neon-blue/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="section-label mb-3">
            Core Capabilities
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary tracking-tight mt-2">
            Why Creators Choose Studio3D&apos;s Image to 3D
          </h2>
        </motion.div>

        {/* 3-Column Glassmorphism Grid with Gradient Border Glow & Lift on Hover */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
          {features.map((item, idx) => {
            const Icon = item.icon;
            const chipClass = chipTypes[idx % chipTypes.length];
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="glass-card p-8 flex flex-col justify-between group cursor-default"
              >
                <div>
                  <div className={`icon-chip ${chipClass} group-hover:scale-105 transition-transform`}>
                    <Icon className="w-4 h-4" />
                  </div>

                  <h3 className="card-title text-xl font-semibold mt-4">
                    {item.title}
                  </h3>
                  <p className="text-sm text-text-secondary mt-3 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-border-subtle flex items-center justify-between text-xs text-text-muted">
                  <span>Studio3D AI Engine</span>
                  <div className="flex items-center gap-1.5 text-neon-green opacity-0 group-hover:opacity-100 transition-opacity font-medium">
                    <span className="status-dot" />
                    <span>Active</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
