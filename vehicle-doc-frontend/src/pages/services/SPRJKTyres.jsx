import React from "react";
import { motion } from "framer-motion";
import heroImg from "../../assets/sprtyres.png";
import Header from "../../components/Header";

export default function SPRJKTyres() {
  const highlights = [
    "Wide variety of tyre options for all vehicles",
    "Professional tyre fitting and alignment services",
    "Quality testing and assurance at each stage",
    "Replacement and warranty support",
    "Bulk supply to commercial fleets",
    "24x7 roadside assistance for tyre issues",
    "Durable and long-lasting products",
    "Nationwide distribution network",
  ];

  // Variants for highlights: scale + fade
  const highlightVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: (i) => ({
      opacity: 1,
      scale: 1,
      transition: { delay: i * 0.15, duration: 0.5, ease: "easeOut" },
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
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-4xl font-bold text-white text-center">SPR JK Tyres</h1>
          </motion.div>
        </div>

        {/* Description Section */}
        <section className="max-w-5xl mx-auto py-12 px-6">
          <motion.p
            className="text-gray-700 mb-8"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            SPR JK Tyres focuses on supplying high-quality tyres for commercial, industrial, and
            personal vehicles. Our network ensures availability, fitting, and maintenance support at
            competitive rates.
          </motion.p>

          <motion.h2
            className="text-2xl font-semibold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
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
                variants={highlightVariants}
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
