import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

// Images
import transportImg from "../../assets/services/sprtransport.png";
import sprt1 from "../../assets/BlueMetal/blue1.jpg"
import sprTransportImg from "../../assets/services/SPR.png";
import heroImg from "../../assets/BlueMetal/blue1.jpg";

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
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCarouselIndex((prev) => (prev + 1) % carouselImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [carouselImages.length]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  // Disable body scroll when modal open
  useEffect(() => {
    if (showLoginModal) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
  }, [showLoginModal]);

  const handleVehicleSearch = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setShowLoginModal(true);
    } else {
      navigate("/vehicleSearch");
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    navigate("/login");
  };

  // Gallery images - using available transport images
  const galleryImages = [transportImg, sprTransportImg, sprt1, sprTransportImg, sprt1, sprTransportImg];

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
      <Header showLogout />

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

        {/* Login / SignUp Modal (only for this page) */}
        {showLoginModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full relative">
              {/* Close button */}
              <button
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                onClick={() => setShowLoginModal(false)}
                aria-label="Close"
              >
                X
              </button>

              <h2 className="text-2xl font-bold mb-4 text-center">
                Login or Sign Up
              </h2>

              <div className="flex flex-col gap-4">
                <button
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                  onClick={() => {
                    navigate("/login");
                    setShowLoginModal(false);
                  }}
                >
                  Login
                </button>

                <button
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
                  onClick={() => {
                    navigate("/register");
                    setShowLoginModal(false);
                  }}
                >
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        )}

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
              src={sprt1}
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
              className="text-3xl md:text-4xl font-bold mb-6 text-center text-gray-800"
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
                    className="w-full h-64 md:h-72 object-cover object-center rounded-2xl"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-20 transition rounded-2xl" />
                </motion.div>
              ))}
            </div>

            {/* Vehicle Search CTA (new style with spacing) */}
            <div className="mt-12 mb-14 flex justify-center">
              <button
                onClick={handleVehicleSearch}
                className="group relative inline-flex items-center gap-3 rounded-full px-12 py-4 font-bold text-white shadow-2xl transition-all duration-300 bg-gradient-to-r from-indigo-500 via-blue-500 to-cyan-400 hover:from-indigo-400 hover:via-blue-400 hover:to-cyan-300 focus:outline-none focus:ring-4 focus:ring-blue-300/60"
              >
                <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/15" />
                <span className="relative inline-flex items-center justify-center w-11 h-11 rounded-full bg-white/15 group-hover:bg-white/25 transition">
                  <Search size={20} />
                </span>
                <span className="relative tracking-wide">Vehicle Search</span>
                <span className="relative ml-2 h-2 w-2 rounded-full bg-white/70 group-hover:bg-white transition" />
              </button>
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
