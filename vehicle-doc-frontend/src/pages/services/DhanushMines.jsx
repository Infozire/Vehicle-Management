import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

// Images
import mdBanner from "../../assets/DhanushMines/md-banner.jpg";
import md2 from "../../assets/DhanushMines/md.jpg";
import mine4 from "../../assets/DhanushMines/mine4.jpg";

import mine1 from "../../assets/DhanushMines/mine1.jpg";
import mine2 from "../../assets/DhanushMines/mine2.jpg";
import mine3 from "../../assets/DhanushMines/mine3.jpg";
import mine5 from "../../assets/DhanushMines/mine5.jpg";

import achievementImg from "../../assets/DhanushMines/achievements-event.jpg";

// Slider images (6)
import slide1 from "../../assets/DhanushMines/slide1.jpg";
import slide2 from "../../assets/DhanushMines/slide2.jpg";
import slide3 from "../../assets/DhanushMines/slide3.jpg";
import slide4 from "../../assets/DhanushMines/slide4.jpg";
import slide5 from "../../assets/DhanushMines/slide5.jpg";
import slide6 from "../../assets/DhanushMines/slide6.jpg";
import mine7 from "../../assets/DhanushMines/mine7.jpg";
import mine8 from "../../assets/DhanushMines/mine8.jpg";
import mine9 from "../../assets/DhanushMines/mine9.jpg";
import mine10 from "../../assets/DhanushMines/mine10.jpg";
import mine11 from "../../assets/DhanushMines/mine11.jpg";
import mine12 from "../../assets/DhanushMines/mine12.jpg";
import mine13 from "../../assets/DhanushMines/mine13.jpg";
import owner1 from "../../assets/DhanushMines/owner1.jpg"
import owner2 from "../../assets/DhanushMines/owner2.jpg"
import owner3 from "../../assets/DhanushMines/owner3.jpg"

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

  /* ===== MD CAROUSEL STATE ===== */
  const carouselImages = [mdBanner, md2, mine4];
  const [carouselIndex, setCarouselIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCarouselIndex((prev) => (prev + 1) % carouselImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [carouselImages.length]);

  const sliderImages = [slide1, slide2, slide3, slide4, slide5, slide6];

  const listVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.15, duration: 0.5 },
    }),
  };

  return (
    <>
      <Header />

      <div className="bg-gray-50">
        {/* ================= MD BANNER – 3 IMAGE CAROUSEL ================= */}
        <section className="relative h-[420px] overflow-hidden">
          <div className="absolute inset-0">
            <AnimatePresence mode="wait">
              <motion.img
                key={carouselIndex}
                src={carouselImages[carouselIndex]}
                alt="Management"
                className="absolute inset-0 w-full h-full object-cover"
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
              />
            </AnimatePresence>
          </div>

          <div className="absolute inset-0 bg-black/55 z-10" />

          <motion.div
            className="relative z-20 h-full flex flex-col justify-center items-center text-center px-6"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              Dhanush Mines
            </h1>
            <p className="mt-4 text-lg text-gray-200 max-w-2xl">
              Strengthening Infrastructure with Quality Blue Metal & Mining Excellence
            </p>
            <p className="mt-2 text-sm text-yellow-400 tracking-wide">
              Managing Directors
            </p>
          </motion.div>
        </section>

        {/* ================= CONTENT + GALLERY ================= */}
<section className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-14 items-center">
  <motion.div
    initial={{ opacity: 0, x: -40 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.8 }}
    viewport={{ once: true }}
    className="space-y-6"
  >
    <h2 className="text-4xl font-bold text-gray-800">
      About Dhanush Mines
    </h2>

    <p className="text-lg text-gray-700 leading-relaxed max-w-xl">
      Dhanush Mines is a trusted name in blue metal and mineral extraction,
      delivering premium-quality materials for large-scale infrastructure
      and construction projects.
    </p>

  

    {/* ------------------- OWNER IMAGE ------------------- */}
    <div className="mt-8">
      <h3 className="text-2xl font-semibold text-gray-800 mb-4">
        Our Owner in Action
      </h3>
      <motion.div
        className="rounded-xl overflow-hidden shadow-lg cursor-pointer max-w-sm mx-auto"
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        whileHover={{ scale: 1.05, y: -5 }}
      >
        <img
          src={owner3} // Only one owner image
          alt="Owner"
          className="w-full h-80 object-cover rounded-xl"
        />
        <div className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-20 rounded-xl transition" />
        
      </motion.div>
    </div>
      <div className="grid grid-cols-2 gap-x-6 gap-y-3 pt-4">
      {highlights.slice(0, 6).map((item, index) => (
        <motion.p
          key={index}
          className="text-sm text-yellow-700 font-medium"
          custom={index}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={listVariants}
        >
          • {item}
        </motion.p>
      ))}
    </div>
  </motion.div>

  <motion.div
    className="grid grid-cols-2 gap-5"
    initial={{ opacity: 0, x: 40 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.8 }}
    viewport={{ once: true }}
  >
    <motion.img
      src={mine1}
      className="col-span-2 h-64 w-full rounded-2xl shadow-xl object-cover"
      whileHover={{ scale: 1.04 }}
    />
    <motion.img
      src={mine2}
      className="h-56 w-full rounded-2xl shadow-lg object-cover"
      whileHover={{ scale: 1.05 }}
    />
    <motion.img
      src={mine3}
      className="h-56 w-full rounded-2xl shadow-lg object-cover"
      whileHover={{ scale: 1.05 }}
    />
    <motion.img
      src={mine4}
      className="col-span-2 h-60 w-full rounded-2xl shadow-xl object-cover"
      whileHover={{ scale: 1.04 }}
    />
  </motion.div>
</section>


        {/* ================= ACHIEVEMENTS ================= */}
        <section className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                Our Achievements & Legacy
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Our journey reflects trust, consistency, and excellence in mining
                and mineral supply across generations.
              </p>
            </motion.div>

            <motion.img
              src={achievementImg}
              className="rounded-xl shadow-xl"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            />
          </div>

          {/* ================= IMAGE SLIDER ================= */}
          <div className="mt-14 overflow-hidden">
            <motion.div
              className="flex gap-6 px-6"
              animate={{ x: ["0%", "-100%"] }}
              transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
            >
              {[...sliderImages, ...sliderImages].map((img, i) => (
                <div
                  key={i}
                  className="min-w-[260px] h-[180px] rounded-xl overflow-hidden shadow-lg bg-white"
                >
                  <img src={img} className="w-full h-full object-cover" />
                </div>
              ))}
            </motion.div>
          </div>
        </section>
{/* ================= MODERN IMAGE SHOWCASE ================= */}
<section className="bg-gray-50 py-20">
  <div className="max-w-7xl mx-auto px-6">
    <motion.h2
      className="text-3xl md:text-4xl font-bold mb-12 text-center text-gray-800"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      Our Mining Operations in Action
    </motion.h2>

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {[mine1, mine2, mine3, mine4, mine5, mine1].map((img, i) => (
        <motion.div
          key={i}
          className={`relative rounded-2xl overflow-hidden shadow-lg cursor-pointer`}
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.15, duration: 0.8, ease: "easeOut" }}
          whileHover={{ scale: 1.05, y: -5 }}
        >
          <img
            src={img}
            alt={`Mining ${i + 1}`}
            className={`w-full ${
              i % 2 === 0 ? "h-64 md:h-72" : "h-56 md:h-64"
            } object-cover rounded-2xl`}
          />
          <div className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-20 transition rounded-2xl" />
        </motion.div>
      ))}
    </div>

    {/* OPTIONAL: Staggered sliding carousel for medium images */}
    <div className="mt-12 overflow-hidden relative">
      <motion.div
        className="flex gap-6"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
      >
        {[mine7, mine8, md2, mine9, mine10, mine11, mine12, mine13].map(
          (img, i) => (
            <div
              key={i}
              className="min-w-[240px] h-[160px] rounded-xl overflow-hidden shadow-lg"
            >
              <img src={img} className="w-full h-full object-cover" />
            </div>
          )
        )}
      </motion.div>
    </div>
  </div>
</section>

        <Footer />
      </div>
    </>
  );
}
