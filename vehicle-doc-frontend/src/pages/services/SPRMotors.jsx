import React from "react";
import { motion } from "framer-motion";
import heroImg from "../../assets/sprmotors.png";
import Header from "../../components/Header";

export default function SPRMotors() {
  const highlights = [
    "Wide range of vehicle sales: commercial & private",
    "Routine maintenance and repair services",
    "Genuine spare parts and accessories",
    "Certified and trained service technicians",
    "Flexible financing and purchase options",
    "Quick service turn-around time",
    "Customer-first approach with service tracking",
    "Pan-regional service coverage",
  ];

  // Variants for highlights: slide from left + fade
  const highlightVariants = {
    hidden: { opacity: 0, x: -50 },
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
        <motion.div
          className="relative h-[450px] md:h-[450px] flex items-center justify-center pt-[80px]"
          style={{
            backgroundImage: `url(${heroImg})`,
            backgroundSize: "cover",
            backgroundPosition: "center top",
            backgroundRepeat: "no-repeat",
          }}
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          {/* <motion.div
            className="bg-black/50 p-6 rounded"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <h1 className="text-4xl font-bold text-white text-center">SPR Motors</h1>
          </motion.div> */}
        </motion.div>

        {/* Description Section */}
        <section className="max-w-5xl mx-auto py-12 px-6">
          <motion.p
            className="text-gray-700 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          >
            SPR Motors specializes in vehicle sales, maintenance, and after-sales services. We provide
            a complete ecosystem for automotive needs, from vehicle acquisition to servicing and spare
            parts availability.
          </motion.p>

          <motion.h2
            className="text-2xl font-semibold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
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
