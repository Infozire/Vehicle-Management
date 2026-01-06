import React from "react";
import { motion } from "framer-motion";
import heroImg from "../../assets/sprtransport.png";
import Header from "../../components/Header";

export default function SPRTransport() {
  const highlights = [
    "Fleet of modern, roadworthy transport vehicles",
    "Door-to-door freight delivery",
    "Real-time vehicle tracking & monitoring",
    "Timely and cost-efficient service",
    "Dedicated customer support",
    "Safe handling of goods during transit",
    "Coverage across major cities and industrial hubs",
    "Flexible transport solutions for bulk and LTL shipments",
  ];

  // Variants for highlights: slide from right + fade
  const highlightVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
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
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-4xl font-bold text-white text-center">SPR Transport</h1>
          </motion.div>
        </div>

        {/* Description Section */}
        <section className="max-w-5xl mx-auto py-12 px-6">
          <motion.p
            className="text-gray-700 mb-8"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            SPR Transport provides reliable and efficient logistics solutions for freight and passenger
            movement. We operate across key regional routes with well-maintained vehicles and trained
            drivers, ensuring timely delivery and safety.
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
