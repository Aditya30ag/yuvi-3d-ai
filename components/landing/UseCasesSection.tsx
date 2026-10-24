"use client";

import { motion } from "framer-motion";
import { Gamepad2, Printer, ShoppingBag, Wrench } from "lucide-react";
import { SectionHeading } from "./HowItWorksSection";

const USE_CASES = [
  {
    icon: Printer,
    title: "3D printing",
    body: "Go from a photo to a sliceable STL without touching CAD.",
  },
  {
    icon: Wrench,
    title: "Product prototyping",
    body: "Turn sketches and product shots into physical mockups to test size and shape.",
  },
  {
    icon: ShoppingBag,
    title: "Product previews",
    body: "Give customers a model they can rotate, starting from photos you already have.",
  },
  {
    icon: Gamepad2,
    title: "Games & AR",
    body: "Use the GLB output as a starting point for props and scene assets.",
  },
];

export function UseCasesSection() {
  return (
    <section id="use-cases" className="relative scroll-mt-20 px-6 py-24 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading label="Use cases" title="Built for makers, designers and sellers" />

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {USE_CASES.map((useCase, i) => (
            <motion.div
              key={useCase.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="rounded-2xl border border-border-subtle bg-bg-surface p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-neon-green/40 hover:shadow-md"
            >
              <useCase.icon className="h-5 w-5 text-neon-green" />
              <h3 className="mt-4 text-sm font-semibold text-text-primary">{useCase.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-text-secondary">{useCase.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
