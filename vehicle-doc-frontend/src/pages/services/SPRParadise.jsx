import React from "react";
import { motion } from "framer-motion";
import heroImg from "../../assets/paradise.png";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import p1 from "../../assets/paradise/p1.jpg";
import p2 from "../../assets/paradise/p2.jpg";
import p3 from "../../assets/paradise/p3.jpg";
import p4 from "../../assets/paradise/p4.jpg";
import p5 from "../../assets/paradise/p5.jpg";
import p6 from "../../assets/paradise/p6.jpg";
import p7 from "../../assets/paradise/p7.jpg";
import p8 from "../../assets/paradise/p8.jpg";
import p9 from "../../assets/paradise/p9.jpg";
import p10 from "../../assets/paradise/p10.jpg";
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
        {/* Paradise Image Collection */}
{/* Paradise Mosaic Gallery */}
<section className="max-w-7xl mx-auto py-20 px-6">
  <motion.h2
    className="text-3xl font-bold text-center mb-14 text-[#0B1B3A]"
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8 }}
  >
    Discover <span className="text-[#9B5A2D]">SPR Paradise</span>
  </motion.h2>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    
    {/* Left Featured Image */}
    <motion.div
      className="relative overflow-hidden rounded-3xl shadow-xl"
      initial={{ opacity: 0, x: -40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <img
        src={p10}
        alt="SPR Paradise Featured"
        className="w-full h-[520px] object-cover hover:scale-105 transition-transform duration-700"
      />
      <div className="absolute inset-0 bg-black/30 flex items-end p-6">
        <div className="text-white">
          <h3 className="text-2xl font-semibold">Luxury Living</h3>
          <p className="opacity-90">Where comfort meets elegance</p>
        </div>
      </div>
    </motion.div>

    {/* Right Mosaic */}
    <div className="grid grid-cols-2 gap-4">
      {[p2, p3, p4, p5, p6, p7].map((img, i) => (
        <motion.div
          key={i}
          className="relative overflow-hidden rounded-2xl group"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1, duration: 0.6 }}
        >
          <img
            src={img}
            alt={`Paradise ${i + 2}`}
            className="w-full h-[250px] object-cover group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition"></div>
        </motion.div>
      ))}
    </div>
  </div>

  {/* Bottom Horizontal Scroll */}
  <div className="mt-10 flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
    {[p8, p9, p1].map((img, i) => (
      <motion.div
        key={i}
        className="min-w-[280px] h-[180px] overflow-hidden rounded-xl shadow-lg"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: i * 0.15, duration: 0.6 }}
      >
        <img
          src={img}
          alt={`Extra Paradise ${i + 8}`}
          className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
        />
      </motion.div>
    ))}
  </div>
</section>


      </div>
      <Footer />
    </>
  );
}
