import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

// Images
import transportImg from "../../assets/transport.jpg";
import sprTransportImg from "../../assets/services/sprtransport.png";
import heroImg from "../../assets/mines.png";

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

  /* ===== CAROUSEL STATE ===== */
  const carouselImages = [transportImg, sprTransportImg, heroImg];
  const [carouselIndex, setCarouselIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCarouselIndex((prev) => (prev + 1) % carouselImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [carouselImages.length]);

  // Gallery images - using available transport images
  const galleryImages = [transportImg, sprTransportImg, transportImg, sprTransportImg, transportImg, sprTransportImg];

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
        {/* ================= BANNER – 3 IMAGE CAROUSEL ================= */}
        <section className="relative h-[420px] overflow-hidden">
          <div className="absolute inset-0">
            <AnimatePresence mode="wait">
              <motion.img
                key={carouselIndex}
                src={carouselImages[carouselIndex]}
                alt="SPR Transport"
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
              SPR Transport
            </h1>
            <p className="mt-4 text-lg text-gray-200 max-w-2xl">
              Reliable Logistics & Transportation Solutions Across Regions
            </p>
            <p className="mt-2 text-sm text-yellow-400 tracking-wide">
              Your Trusted Transport Partner
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
              About SPR Transport
            </h2>

            <p className="text-lg text-gray-700 leading-relaxed max-w-xl">
              SPR Transport provides reliable and efficient logistics solutions for freight and passenger
              movement. We operate across key regional routes with well-maintained vehicles and trained
              drivers, ensuring timely delivery and safety.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed max-w-xl">
              With a modern fleet and comprehensive coverage across major cities and industrial hubs, 
              we deliver excellence in transportation services, meeting the diverse needs of our clients 
              with professionalism and dedication.
            </p>

            {/* Highlights Grid */}
            <div className="grid grid-cols-1 gap-3 pt-4">
              {highlights.map((item, index) => (
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
              src={transportImg}
              alt="Transport Vehicle 1"
              className="col-span-2 h-64 w-full rounded-2xl shadow-xl object-cover object-center"
              whileHover={{ scale: 1.04 }}
            />
            <motion.img
              src={sprTransportImg}
              alt="Transport Vehicle 2"
              className="h-56 w-full rounded-2xl shadow-lg object-cover object-center"
              whileHover={{ scale: 1.05 }}
            />
            <motion.img
              src={transportImg}
              alt="Transport Vehicle 3"
              className="h-56 w-full rounded-2xl shadow-lg object-cover object-center"
              whileHover={{ scale: 1.05 }}
            />
            <motion.img
              src={sprTransportImg}
              alt="Transport Vehicle 4"
              className="col-span-2 h-60 w-full rounded-2xl shadow-xl object-cover object-center"
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
                Our Transport Excellence
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                SPR Transport has built a reputation for reliability, safety, and efficiency 
                in the logistics industry. Our commitment to excellence drives us to continuously 
                improve our services and expand our reach.
              </p>
              <p className="text-gray-700 leading-relaxed">
                With years of experience and a customer-first approach, we ensure that every 
                shipment is handled with care and delivered on time, every time.
              </p>
            </motion.div>

            <motion.img
              src={transportImg}
              alt="Transport Excellence"
              className="rounded-xl shadow-xl w-full h-80 object-cover"
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
              {[...galleryImages, ...galleryImages].map((img, i) => (
                <div
                  key={i}
                  className="min-w-[260px] h-[180px] rounded-xl overflow-hidden shadow-lg bg-white"
                >
                  <img src={img} className="w-full h-full object-cover object-center" alt={`Transport ${i + 1}`} />
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
              Our Transport Fleet in Action
            </motion.h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {galleryImages.slice(0, 6).map((img, i) => (
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
                    alt={`Transport Fleet ${i + 1}`}
                    className={`w-full ${
                      i % 2 === 0 ? "h-64 md:h-72" : "h-56 md:h-64"
                    } object-cover object-center rounded-2xl`}
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-20 transition rounded-2xl" />
                </motion.div>
              ))}
            </div>

            {/* Staggered sliding carousel for additional images */}
            <div className="mt-12 overflow-hidden relative">
              <motion.div
                className="flex gap-6"
                animate={{ x: ["0%", "-50%"] }}
                transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
              >
                {[...galleryImages, ...galleryImages].map((img, i) => (
                  <div
                    key={i}
                    className="min-w-[240px] h-[160px] rounded-xl overflow-hidden shadow-lg"
                  >
                    <img src={img} className="w-full h-full object-cover object-center" alt={`Transport ${i + 1}`} />
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
