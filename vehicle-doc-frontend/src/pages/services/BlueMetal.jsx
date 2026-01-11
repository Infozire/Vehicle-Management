import React, { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

// Images
import heroBlueMetal from "../../assets/BlueMetal/blue5.jpg";
import blue1 from "../../assets/BlueMetal/blue1.jpg";
import blue2 from "../../assets/BlueMetal/blue2.jpg";
import blue3 from "../../assets/BlueMetal/blue3.jpg";
import blue4 from "../../assets/BlueMetal/blue4.jpg";
import blue5 from "../../assets/BlueMetal/blue5.jpg";
import blue6 from "../../assets/BlueMetal/blue6.jpg";
import blue7 from "../../assets/BlueMetal/blue7.jpg";
import blue8 from "../../assets/BlueMetal/blue8.jpg";
import blue9 from "../../assets/BlueMetal/blue9.jpg";
import blue10 from "../../assets/BlueMetal/blue10.jpg";
import blue11 from "../../assets/BlueMetal/blue11.jpg";

export default function BlueMetal() {
  const scrollRef = useRef(null);
  const [scrollX, setScrollX] = useState(0);

  const images = [blue6, blue7, blue8, blue9, blue10, blue11];

  // Auto-slide every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (scrollRef.current) {
        const maxScroll = scrollRef.current.scrollWidth - scrollRef.current.clientWidth;
        const nextScroll = scrollX + 300;
        scrollRef.current.scrollTo({
          left: nextScroll > maxScroll ? 0 : nextScroll,
          behavior: "smooth",
        });
        setScrollX(nextScroll > maxScroll ? 0 : nextScroll);
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [scrollX]);

  // Manual slide via arrows
  const slide = (direction) => {
    if (scrollRef.current) {
      const maxScroll = scrollRef.current.scrollWidth - scrollRef.current.clientWidth;
      let nextScroll = direction === "left" ? scrollX - 300 : scrollX + 300;
      if (nextScroll < 0) nextScroll = 0;
      if (nextScroll > maxScroll) nextScroll = maxScroll;
      scrollRef.current.scrollTo({ left: nextScroll, behavior: "smooth" });
      setScrollX(nextScroll);
    }
  };

  return (
    <>
      <Header />

      <div className="bg-gray-50">

        {/* ================= HERO SECTION WITH CAROUSEL ================= */}
        <section className="relative h-[420px] overflow-hidden">
          <CarouselHero images={[blue1, blue2, blue3]} />
        </section>

        {/* ================= ABOUT BLUE METAL ================= */}
<section className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-14 items-center relative">
  {/* Text Section */}
  <motion.div
    initial={{ opacity: 0, x: -40 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.8 }}
    viewport={{ once: true }}
  >
    <h2 className="text-4xl font-bold text-gray-800 mb-6">
      What is Blue Metal?
    </h2>
    <p className="text-lg text-gray-700 leading-relaxed mb-4">
      Blue metal is a high-quality crushed stone aggregate produced from
      hard basalt rock. It is widely used in construction and infrastructure
      projects due to its strength, durability, and load-bearing capacity.
    </p>
    <p className="text-gray-600 leading-relaxed">
      At Dhanush Mines, our blue metal is manufactured using advanced VSI
      crushers and meets all government and industry standards.
    </p>
  </motion.div>

  {/* Image Section with PiP on Right */}
  <div className="relative w-full h-[460px] md:h-[520px]">
    {/* Main Image */}
    <motion.img
      src={blue8}
      alt="Blue Metal Quarry"
      className="rounded-2xl shadow-2xl object-cover w-full h-full"
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    />

    {/* PiP Image - Bottom Right */}
    <motion.img
      src={blue10} // your PiP image
      alt="Additional Blue Metal"
      className="absolute bottom-0 right-0 w-44 h-44 md:w-52 md:h-52 rounded-xl shadow-2xl border-4 border-white object-cover"
      initial={{ opacity: 0, scale: 0.8, x: 20, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, x: 0, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      viewport={{ once: true }}
    />
  </div>
</section>



        {/* ================= APPLICATIONS ================= */}
        <section className="bg-white py-20">
          <div className="max-w-7xl mx-auto px-6">
            <motion.h2
              className="text-4xl font-bold text-center text-gray-800 mb-14"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >
              Applications of Blue Metal
            </motion.h2>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                "Road construction & macadam works",
                "Concrete and RCC structures",
                "Railway ballast",
                "Drainage and foundation works",
                "Industrial flooring & paving",
                "Infrastructure and highway projects",
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="bg-gray-50 rounded-xl p-6 shadow-md hover:shadow-xl transition"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <h3 className="text-lg font-semibold text-gray-800">
                    {item}
                  </h3>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= WHY CHOOSE US ================= */}
        <section className="bg-gray-900 py-20 text-white">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h2 className="text-4xl font-bold mb-6">
              Why Choose Our Blue Metal?
            </h2>
            <p className="max-w-3xl mx-auto text-gray-300 leading-relaxed">
              We ensure consistent quality, accurate sizing, timely delivery,
              and compliance with all safety and environmental standards. Our
              blue metal is trusted by builders, contractors, and infrastructure
              companies across the region.
            </p>
          </div>
        </section>

        {/* ================= FIRST IMAGE GALLERY ================= */}
        <section className="max-w-7xl mx-auto px-6 py-20">
          <motion.h2
            className="text-4xl font-bold text-center text-gray-800 mb-14"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            Blue Metal Gallery
          </motion.h2>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.15,
                },
              },
            }}
          >
            {[blue2, blue3, blue4, blue5, blue1, heroBlueMetal].map((img, i) => (
              <motion.div
                key={i}
                className="relative overflow-hidden rounded-xl shadow-xl cursor-pointer"
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0 },
                }}
                whileHover={{ scale: 1.08, rotate: 1, zIndex: 10 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
              >
                <motion.img
                  src={img}
                  alt={`Blue Metal ${i + 1}`}
                  className="w-full h-64 object-cover rounded-xl"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-10 transition" />
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* ================= SECOND CINEMATIC GALLERY WITH ARROWS ================= */}
        <section className="bg-gray-100 py-20 relative">
          <motion.h2
            className="text-4xl font-bold text-center text-gray-800 mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            Blue Metal Showcase
          </motion.h2>

          {/* Left Arrow */}
          <ChevronLeft
            className="absolute top-1/2 left-4 -translate-y-1/2 cursor-pointer text-gray-800 w-10 h-10 z-20"
            onClick={() => slide("left")}
          />
          {/* Right Arrow */}
          <ChevronRight
            className="absolute top-1/2 right-4 -translate-y-1/2 cursor-pointer text-gray-800 w-10 h-10 z-20"
            onClick={() => slide("right")}
          />

          <motion.div
            ref={scrollRef}
            className="flex space-x-6 overflow-x-scroll px-6 no-scrollbar"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            {images.map((img, i) => (
              <motion.div
                key={i}
                className="flex-shrink-0 relative rounded-3xl shadow-2xl cursor-pointer w-80 h-96"
                whileHover={{ scale: 1.05, y: -10 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
              >
                <motion.img
                  src={img}
                  alt={`Blue Metal Showcase ${i + 1}`}
                  className="w-full h-full object-cover rounded-3xl"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-10 rounded-3xl transition" />
              </motion.div>
            ))}
          </motion.div>
        </section>

        <Footer />
      </div>
    </>
  );
}

// ================== HERO CAROUSEL COMPONENT ==================
function CarouselHero({ images }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-slide every 4 seconds
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
    <div className="relative h-full">
      <AnimatePresence mode="wait">
        <motion.img
          key={currentIndex}
          src={images[currentIndex]}
          alt={`Blue Metal ${currentIndex + 1}`}
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 1 }}
        />
      </AnimatePresence>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Text Content */}
      <motion.div
        className="absolute inset-0 flex flex-col justify-center items-center text-center px-6 z-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Blue Metal
        </h1>
        <p className="text-lg md:text-xl text-gray-200 max-w-2xl">
          Premium Quality Blue Metal Aggregates for Strong & Durable Construction
        </p>
      </motion.div>

      {/* Navigation Arrows */}
      <div
        className="absolute top-1/2 left-4 -translate-y-1/2 cursor-pointer text-white text-3xl select-none z-20"
        onClick={prevSlide}
      >
        &#10094;
      </div>
      <div
        className="absolute top-1/2 right-4 -translate-y-1/2 cursor-pointer text-white text-3xl select-none z-20"
        onClick={nextSlide}
      >
        &#10095;
      </div>
    </div>
  );
}
