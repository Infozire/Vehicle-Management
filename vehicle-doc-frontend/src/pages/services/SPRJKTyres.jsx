import React from "react";
import { motion } from "framer-motion";
import heroImg from "../../assets/hero/hero4.jpg";
import Header from "../../components/Header";
import t1 from "../../assets/tyres/t1.jpg";
import t2 from "../../assets/tyres/t2.jpg";

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

        {/* ------------------- HERO SECTION: Diagonal Split ------------------- */}
        <div className="relative h-96 flex overflow-hidden">
          {/* Left Image */}
          <motion.div
            className="w-1/2 h-full"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <img
              src={heroImg}
              alt="SPR JK Tyres"
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Right Text Panel */}
          <motion.div
            className="w-1/2 h-full bg-gradient-to-l from-black/80 to-black/20 flex flex-col justify-center px-10"
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl font-bold text-yellow-400">SPR JK Tyres</h1>
            <p className="text-gray-200 mt-3 text-lg">
              High-Performance Tyres | Nationwide Distribution | 24x7 Support
            </p>
            <button className="mt-6 px-5 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-md">
              Get Started
            </button>
          </motion.div>
        </div>

        {/* ------------------- DESCRIPTION & HIGHLIGHTS ------------------- */}
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

          {/* ------------------- JK Tyres Visual Section ------------------- */}
          <section className="max-w-6xl mx-auto py-20 px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

              {/* Left Visual */}
              <div className="relative flex justify-center">
                {/* Circular Tyre Frame */}
                <motion.div
                  className="relative w-[360px] h-[360px] rounded-full overflow-hidden border-[14px] border-[#1f2937] shadow-2xl"
                  initial={{ opacity: 0, scale: 0.85, rotate: -10 }}
                  whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9, ease: "easeOut" }}
                >
                  <img
                    src={t1}
                    alt="JK Tyre Quality"
                    className="w-full h-full object-cover"
                  />
                </motion.div>

                {/* Accent Dot */}
                <div className="absolute -bottom-6 -right-6 w-20 h-20 bg-[#9B5A2D] rounded-full opacity-90"></div>
              </div>

              {/* Right Visual */}
              <motion.div
                className="relative h-[420px] rounded-3xl overflow-hidden shadow-xl"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                <img
                  src={t2}
                  alt="JK Tyres Strength"
                  className="w-full h-full object-cover"
                />

                {/* Vertical Strength Strip */}
                <div className="absolute inset-y-0 left-0 w-2 bg-[#9B5A2D]"></div>
              </motion.div>

            </div>
          </section>

        </section>
      </div>
    </>
  );
}
