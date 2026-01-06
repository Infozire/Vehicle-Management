import React from "react";
import { motion } from "framer-motion";
import heroImg from "../../assets/mines.png"; 
import Header from "../../components/Header";

export default function DhanushMines() {
  const highlights = [
    "High-grade mineral extraction and processing",
    "Environmentally compliant operations",
    "State-of-the-art machinery and automation",
    "24x7 mining operations",
    "Quality assurance at every stage",
    "Direct supply to industries and construction projects",
    "Experienced and trained workforce",
    "Nationwide distribution network",
  ];

  // Variants for staggered highlights
  const listVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2, duration: 0.5, ease: "easeOut" },
    }),
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div
          className="relative h-80 flex items-center justify-center"
          style={{
            backgroundImage: `url(${heroImg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <motion.div
            className="bg-black/50 p-6 rounded"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-4xl font-bold text-white text-center">Dhanush Mines</h1>
          </motion.div>
        </div>

        {/* Description Section */}
        <section className="max-w-5xl mx-auto py-12 px-6">
          <motion.p
            className="text-gray-700 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            Dhanush Mines forms the core of our mining operations, focusing on extraction, processing,
            and supply of high-quality minerals. Our mines operate with strict safety and environmental
            standards, ensuring sustainable production and responsible mining practices.
          </motion.p>

          <motion.h2
            className="text-2xl font-semibold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            Key Highlights
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-800">
            {highlights.map((item, index) => (
              <motion.p
                key={index}
                className="italic text-yellow-700"
                custom={index}
                initial="hidden"
                animate="visible"
                variants={listVariants}
              >
                * {item}
              </motion.p>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
