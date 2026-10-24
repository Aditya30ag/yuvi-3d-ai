"use client";

import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQS = [
  {
    q: "What file formats do I get?",
    a: "Every completed design can be downloaded as an STL, ready for slicers like Cura, PrusaSlicer or Bambu Studio. Engines that build a full 3D object (TRELLIS, Tripo) also produce a GLB, which powers the in-browser 3D preview.",
  },
  {
    q: "How long does a conversion take?",
    a: "Hyperbolic usually finishes in a few seconds. The full-3D engines typically take one to a few minutes, and the shared Hugging Face space can queue when it's busy. The workspace updates on its own, so you can leave it open or come back later.",
  },
  {
    q: "What kind of photo works best?",
    a: "A single object, well lit, on a plain background, photographed from a slight angle so its depth is visible. Avoid busy scenes, heavy reflections and cropped edges. Images can be JPG, PNG, WebP or GIF up to 10 MB.",
  },
  {
    q: "Which engine should I choose?",
    a: "Use Hyperbolic for fast relief-style prints such as signs, logos and embossed shapes. Use TRELLIS or Tripo when you need a complete object you can view from every side.",
  },
  {
    q: "How do I sign in?",
    a: "Enter your email and we send you a 6-digit code. There's no password, and your account is created the first time you sign in.",
  },
  {
    q: "Who can see my designs?",
    a: "Only you. Designs are tied to your account, and you can delete any of them from the workspace at any time.",
  },
];

export function FAQSection() {
  return (
    <section id="faq" className="relative scroll-mt-20 py-24 lg:py-28 overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-gradient-to-r from-[#00ffa3]/10 to-[#00c3ff]/10 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-3xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="section-label mb-3">
            FAQ
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary tracking-tight mt-2">
            Questions, answered
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-12"
        >
          <Accordion type="single" collapsible className="w-full space-y-3.5">
            {FAQS.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="glass-card px-6 transition-all duration-300 overflow-hidden"
              >
                <AccordionTrigger className="text-left font-medium text-text-primary hover:text-neon-green py-5">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-text-secondary leading-relaxed pb-5">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
