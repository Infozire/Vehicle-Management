import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "../../components/Header";

// Hero + Tyre Images
import heroImg from "../../assets/hero/hero4.jpg";
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

  const extraInfo = [
    "Advanced tread technology for safety and grip",
    "Eco-friendly and fuel-efficient tyre options",
    "Custom tyres for heavy vehicles and trucks",
    "Expert advice on tyre maintenance and rotation",
    "Competitive pricing for bulk purchases",
    "Fast delivery and installation across locations",
  ];

  const galleryImages = [t1, t2, t1, t2, t1, t2, t1, t2];

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">

        {/* ================= HERO CAROUSEL ================= */}
        <section className="relative h-[500px] md:h-[600px] overflow-hidden">
          <HeroCarousel images={[heroImg, t1, t2]} />
        </section>

        {/* ================= DESCRIPTION & HIGHLIGHTS ================= */}
        <section className="max-w-6xl mx-auto py-16 px-6">
          <motion.p
            className="text-gray-700 text-lg mb-12 text-center md:text-left"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            SPR Tyres focuses on supplying high-quality tyres for commercial, industrial, and personal vehicles. Our network ensures availability, fitting, and maintenance support at competitive rates.
          </motion.p>

          {/* Key Highlights */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {highlights.map((item, i) => (
              <motion.div
                key={i}
                className="bg-yellow-50 p-5 rounded-xl shadow-lg hover:shadow-2xl cursor-pointer transition-transform transform hover:scale-105"
                custom={i}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: (i) => ({
                    opacity: 1,
                    y: 0,
                    transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" },
                  }),
                }}
              >
                <span className="text-yellow-700 font-semibold">★ </span>
                {item}
              </motion.div>
            ))}
          </motion.div>

          {/* Extra Info Cards */}
          <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            {extraInfo.map((info, idx) => (
              <motion.div
                key={idx}
                className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition transform hover:scale-105 cursor-pointer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                {info}
              </motion.div>
            ))}
          </motion.div>

          {/* ================= MODERN GALLERY CAROUSEL ================= */}
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-10 text-center text-yellow-600"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Explore Our Tyres
          </motion.h2>

          <div className="relative max-w-7xl mx-auto overflow-x-hidden">
            <TyreCarousel images={galleryImages} />
          </div>
        </section>
      </div>
    </>
  );
}

// ================= HERO CAROUSEL COMPONENT =================
function HeroCarousel({ images }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [images.length]);

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % images.length);
  const prevSlide = () =>
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));

  return (
    <div className="relative h-full w-full">
      <AnimatePresence mode="wait">
        <motion.img
          key={currentIndex}
          src={images[currentIndex]}
          alt={`Slide ${currentIndex + 1}`}
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 1 }}
        />
      </AnimatePresence>

      <div className="absolute inset-0 bg-black/40" />
      <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-6 z-10">
        <h1 className="text-4xl md:text-5xl font-bold text-yellow-400 mb-4">
          SPR Tyres
        </h1>
        <p className="text-gray-200 md:text-lg max-w-2xl">
          High-Performance Tyres | Nationwide Distribution | 24x7 Support
        </p>
      </div>

      {/* Arrows */}
      <div
        className="absolute top-1/2 left-4 -translate-y-1/2 text-white text-3xl cursor-pointer z-20 select-none"
        onClick={prevSlide}
      >
        &#10094;
      </div>
      <div
        className="absolute top-1/2 right-4 -translate-y-1/2 text-white text-3xl cursor-pointer z-20 select-none"
        onClick={nextSlide}
      >
        &#10095;
      </div>
    </div>
  );
}

// ================= TYRE GALLERY CAROUSEL =================
function TyreCarousel({ images }) {
  const [scrollX, setScrollX] = useState(0);

  const next = () => setScrollX((prev) => prev + 300);
  const prev = () => setScrollX((prev) => Math.max(prev - 300, 0));

  return (
    <div className="relative flex items-center">
      <button
        onClick={prev}
        className="absolute left-0 z-20 bg-yellow-500 text-white w-10 h-10 rounded-full shadow-md hover:bg-yellow-600 transition"
      >
        <ChevronLeft className="w-6 h-6 mx-auto" />
      </button>
      <div className="flex overflow-x-scroll scroll-smooth no-scrollbar space-x-6 py-4 px-12">
        {images.map((img, i) => (
          <motion.div
            key={i}
            className="flex-shrink-0 w-64 md:w-72 h-72 md:h-80 rounded-3xl shadow-lg cursor-pointer overflow-hidden hover:scale-105 transition-transform"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          >
            <img
              src={img}
              alt={`Tyre ${i + 1}`}
              className="w-full h-full object-cover rounded-3xl"
            />
          </motion.div>
        ))}
      </div>
      <button
        onClick={next}
        className="absolute right-0 z-20 bg-yellow-500 text-white w-10 h-10 rounded-full shadow-md hover:bg-yellow-600 transition"
      >
        <ChevronRight className="w-6 h-6 mx-auto" />
      </button>
    </div>
  );
}

// ================== ICONS ==================
import { ChevronLeft, ChevronRight } from "lucide-react";
