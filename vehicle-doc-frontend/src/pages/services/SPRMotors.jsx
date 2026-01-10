import React from "react";
import { motion } from "framer-motion";
import heroImg from "../../assets/sprmotors.png";
import Header from "../../components/Header";
import m1 from "../../assets/motors/m1.jpg";
import m2 from "../../assets/motors/m2.jpg";

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

        {/* ------------------- HERO SECTION: Split Hero ------------------- */}
        <div className="relative h-[450px] md:h-[500px] flex flex-col md:flex-row items-center">
          {/* Left Text Panel */}
          <motion.div
            className="md:w-1/2 p-6 md:p-12 flex flex-col justify-center"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-[#0B1B3A] mb-4">
              SPR Motors
            </h1>
            <p className="text-gray-600 text-lg">
              Reliable vehicles, expert servicing, and genuine spare parts—designed to keep you moving forward.
            </p>
            <button className="mt-6 px-5 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-md font-semibold">
              View Services
            </button>
          </motion.div>

          {/* Right Image Panel */}
          <motion.div
            className="md:w-1/2 h-full relative"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <img
              src={heroImg}
              alt="SPR Motors"
              className="w-full h-full object-cover rounded-3xl shadow-xl"
            />
          </motion.div>
        </div>

        {/* ------------------- DESCRIPTION & HIGHLIGHTS ------------------- */}
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

          {/* ------------------- MOTORS IMAGE SHOWCASE ------------------- */}
          <section className="max-w-6xl mx-auto py-20 px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

              {/* Text Side */}
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <h3 className="text-3xl font-bold text-[#0B1B3A] mb-4">
                  Precision. Performance. Trust.
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  SPR Motors delivers reliable automotive solutions with a focus on
                  quality vehicles, expert servicing, and genuine spare parts—designed
                  to keep you moving forward.
                </p>
              </motion.div>

              {/* Image Side */}
              <div className="relative">
                {/* Base Image */}
                <motion.div
                  className="rounded-3xl overflow-hidden shadow-2xl"
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                >
                  <img
                    src={m1}
                    alt="SPR Motors Service"
                    className="w-full h-[420px] object-cover"
                  />
                </motion.div>

                {/* Floating Image */}
                <motion.div
                  className="absolute -bottom-16 -left-16 w-72 rounded-2xl overflow-hidden shadow-xl border-4 border-white"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, duration: 0.7 }}
                >
                  <img
                    src={m2}
                    alt="SPR Motors Vehicle"
                    className="w-full h-48 object-cover"
                  />
                </motion.div>
              </div>

            </div>
          </section>

        </section>
      </div>
    </>
  );
}
