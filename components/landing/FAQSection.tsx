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
    q: "Why use Studio3D's Image to 3D AI converter?",
    a: "Studio3D converts any 2D photo into a detailed 3D model in about one minute — no 3D modeling experience required. Features include Image Enhancement, AI Multi-view, and export in 8 formats including GLB, OBJ, FBX, USDZ, STL.",
  },
  {
    q: "How long does it take to generate a 3D model from an image?",
    a: "Most conversions complete in about one minute. The exact time depends on image complexity and settings — enabling Multi-view may add a few seconds.",
  },
  {
    q: "What image formats can I upload?",
    a: "Supported formats: PNG, JPG, WEBP. Max file size: 20MB. For best results, use a clean background and single centered subject.",
  },
  {
    q: "What 3D formats can I export?",
    a: "FBX, OBJ, GLB, USDZ, STL, BLEND, 3MF, DXF — ready for Blender, Unity, Unreal, Maya, and 3D printing slicers.",
  },
  {
    q: "Do I need to download any software?",
    a: "No — everything runs in your browser. No installation or plugins needed.",
  },
  {
    q: "Can I use my own images as a reference?",
    a: "Yes — you can upload any image. You can also browse example references for inspiration in the gallery.",
  },
  {
    q: "Who owns the rights to the generated 3D models?",
    a: "Models on the free tier are licensed CC BY 4.0 (commercial use with attribution). Paid plans offer Private licensing with full ownership.",
  },
  {
    q: "What is Multi-view mode?",
    a: "Multi-view combines up to 4 photos of the same object into one model, reading geometry and texture from every angle for more accurate back/side reconstruction.",
  },
  {
    q: "Are the models compatible with Blender, Unity, Unreal?",
    a: "Yes. GLB/glTF for Blender and web; FBX for Unity/Unreal/Maya; OBJ for most 3D editors; STL/3MF for 3D printing; USDZ for Apple AR.",
  },
  {
    q: "Is there a free plan?",
    a: "Yes — free tier includes credits every month, no credit card required. Free models are licensed CC BY 4.0 for commercial use with attribution.",
  },
];

export function FAQSection() {
  return (
    <section id="faq" className="bg-black py-24 lg:py-32">
      <div className="max-w-3xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            Frequently Asked Questions
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-12"
        >
          <Accordion type="single" collapsible className="w-full">
            {FAQS.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left font-medium text-white hover:text-violet-300">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-[#888888] leading-relaxed">
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
