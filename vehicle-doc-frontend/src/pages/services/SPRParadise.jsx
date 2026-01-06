import React from "react";
import { motion } from "framer-motion";
import heroImg from "../../assets/paradise.png";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function SPRParadise() {
  const highlights = [
    "Luxury resort and leisure facilities",
    "Customized recreational experiences",
    "Event management and corporate hospitality",
    "World-class amenities and services",
    "Well-trained hospitality staff",
    "24x7 concierge and guest services",
    "Safe and secure property management",
    "Nationwide booking and network availability",
  ];

  // Variants for highlights
  const highlightVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2, duration: 0.6, ease: "easeOut" },
    }),
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div
          className="relative h-[450px] md:h-[450px] flex items-center justify-center pt-[80px]"
          style={{
            backgroundImage: `url(${heroImg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <motion.div
            className="bg-black/50 p-6 rounded"
            initial={{ opacity: 0, scale: 0.8, rotate: -2 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <h1 className="text-4xl font-bold text-white text-center">SPR Paradise</h1>
          </motion.div>
        </div>

        {/* Description Section */}
        <section className="max-w-5xl mx-auto py-12 px-6">
          <motion.p
            className="text-gray-700 mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          >
            SPR Paradise is our premium hospitality and recreational service, offering exclusive
            resorts, leisure activities, and curated experiences for clients and employees. It blends
            luxury with comfort, ensuring memorable stays.
          </motion.p>

          <motion.h2
            className="text-2xl font-semibold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
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
      <Footer />
    </>
  );
}
