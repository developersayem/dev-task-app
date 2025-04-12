"use client";

import { motion } from "framer-motion";

interface SectionHeadingProps {
  badge?: string;
  title: string;
  description?: string;
  centered?: boolean;
}

export function SectionHeading({
  badge,
  title,
  description,
  centered = true,
}: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5 }}
      className={`flex flex-col space-y-4 ${
        centered ? "items-center justify-center text-center" : "items-start"
      }`}
    >
      <div className="space-y-2">
        {badge && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground"
          >
            {badge}
          </motion.div>
        )}
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-3xl font-bold tracking-tighter md:text-4xl lg:text-5xl"
        >
          {title}
        </motion.h2>
        {description && (
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-xl/relaxed"
          >
            {description}
          </motion.p>
        )}
      </div>
    </motion.div>
  );
}
