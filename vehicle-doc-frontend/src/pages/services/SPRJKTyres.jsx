import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, CheckCircle, Clock, Users, Award, Truck } from "lucide-react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { ChevronLeft, ChevronRight } from "lucide-react";

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

  const services = [
    {
      icon: <Shield size={40} />,
      title: "Quality Assurance",
      description: "Premium tyres with rigorous quality testing",
      color: "bg-yellow-500",
    },
    {
      icon: <Truck size={40} />,
      title: "Bulk Supply",
      description: "Commercial fleet solutions at competitive rates",
      color: "bg-blue-500",
    },
    {
      icon: <Clock size={40} />,
      title: "24x7 Support",
      description: "Round-the-clock roadside assistance",
      color: "bg-green-500",
    },
    {
      icon: <Award size={40} />,
      title: "Expert Service",
      description: "Professional fitting and maintenance",
      color: "bg-red-500",
    },
  ];

  const stats = [
    { number: "1000+", label: "Tyres Supplied", icon: <Truck size={32} /> },
    { number: "500+", label: "Happy Customers", icon: <Users size={32} /> },
    { number: "15+", label: "Years Experience", icon: <Award size={32} /> },
    { number: "98%", label: "Satisfaction Rate", icon: <CheckCircle size={32} /> },
  ];

  /* ===== CAROUSEL STATE ===== */
  const carouselImages = [heroImg, t1, t2];
  const [carouselIndex, setCarouselIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCarouselIndex((prev) => (prev + 1) % carouselImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [carouselImages.length]);

  const galleryImages = [t1, t2, t1, t2, t1, t2, t1, t2];

  return (
    <>
      <Header />

      <div className="bg-gray-50">
        {/* ================= DYNAMIC HERO CAROUSEL ================= */}
        <section className="relative h-[500px] md:h-[600px] overflow-hidden">
          <div className="absolute inset-0">
            <AnimatePresence mode="wait">
              <motion.img
                key={carouselIndex}
                src={carouselImages[carouselIndex]}
                alt="SPR JK Tyres"
                className="absolute inset-0 w-full h-full object-cover"
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
              />
            </AnimatePresence>
          </div>

          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30 z-10" />

          <motion.div
            className="relative z-20 h-full flex flex-col justify-center items-center text-center px-6"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <motion.h1
              className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-yellow-400 mb-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              SPR JK Tyres
            </motion.h1>
            <motion.p
              className="text-xl md:text-2xl text-gray-200 mb-2 max-w-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              High-Performance Tyres | Nationwide Distribution | 24x7 Support
            </motion.p>
            <motion.p
              className="text-lg text-yellow-400 mb-8 max-w-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
            >
              Your trusted partner for quality tyres and expert service
            </motion.p>
          </motion.div>

          {/* Carousel Indicators */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 flex gap-2">
            {carouselImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCarouselIndex(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === carouselIndex ? "bg-yellow-500 w-8" : "bg-white/50"
                }`}
              />
            ))}
          </div>
        </section>

        {/* ================= STATISTICS SECTION ================= */}
        <section className="bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-600 py-16">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-center"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                >
                  <div className="flex justify-center mb-3 text-white">
                    {stat.icon}
                  </div>
                  <h3 className="text-4xl md:text-5xl font-bold text-white mb-2">
                    {stat.number}
                  </h3>
                  <p className="text-white/90 text-sm md:text-base">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= ABOUT & CONTENT SECTION ================= */}
        <section className="max-w-7xl mx-auto px-6 py-20">
          <div className="grid md:grid-cols-2 gap-14 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-[#0B1B3A]">
                About SPR JK Tyres
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                SPR Tyres focuses on supplying high-quality tyres for commercial, 
                industrial, and personal vehicles. Our network ensures availability, 
                fitting, and maintenance support at competitive rates.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                As an authorized JK Tyres dealership, we offer premium products 
                backed by expert service and comprehensive warranty support.
              </p>

              {/* Highlights Grid */}
              <div className="grid grid-cols-1 gap-3 pt-4">
                {highlights.map((item, index) => (
                  <motion.div
                    key={index}
                    custom={index}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={{
                      hidden: { opacity: 0, x: -20 },
                      visible: (i) => ({
                        opacity: 1,
                        x: 0,
                        transition: { delay: i * 0.1, duration: 0.5 },
                      }),
                    }}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle className="text-yellow-600 mt-1 flex-shrink-0" size={20} />
                    <p className="text-gray-700">{item}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Image Gallery Grid */}
            <motion.div
              className="grid grid-cols-2 gap-4"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <motion.img
                src={t1}
                alt="SPR JK Tyres 1"
                className="col-span-2 h-64 w-full rounded-2xl shadow-xl object-cover"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              />
              <motion.img
                src={t2}
                alt="SPR JK Tyres 2"
                className="h-48 w-full rounded-2xl shadow-lg object-cover"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              />
              <motion.img
                src={t1}
                alt="SPR JK Tyres 3"
                className="h-48 w-full rounded-2xl shadow-lg object-cover"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          </div>
        </section>

        {/* ================= SERVICES CARDS ================= */}
        <section className="bg-white py-20">
          <div className="max-w-7xl mx-auto px-6">
            <motion.h2
              className="text-4xl md:text-5xl font-bold text-center mb-4 text-[#0B1B3A]"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              Our Services
            </motion.h2>
            <motion.p
              className="text-center text-gray-600 mb-12 text-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Comprehensive tyre solutions for all your needs
            </motion.p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  whileHover={{ y: -10, scale: 1.02 }}
                >
                  <div className={`${service.color} w-16 h-16 rounded-xl flex items-center justify-center text-white mb-4`}>
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {service.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= EXTRA INFO CARDS ================= */}
        <section className="bg-gray-50 py-20">
          <div className="max-w-7xl mx-auto px-6">
            <motion.h2
              className="text-3xl md:text-4xl font-bold mb-12 text-center text-gray-800"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              Why Choose Our Tyres?
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {extraInfo.map((info, idx) => (
                <motion.div
                  key={idx}
                  className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition transform hover:scale-105 cursor-pointer border-l-4 border-yellow-500"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <div className="flex items-start gap-3">
                    <div className="bg-yellow-100 p-2 rounded-lg">
                      <CheckCircle className="text-yellow-600" size={20} />
                    </div>
                    <p className="text-gray-700 font-medium">{info}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= IMAGE SHOWCASE SLIDER ================= */}
        <section className="bg-white py-16 overflow-hidden">
          <motion.div
            className="flex gap-6"
            animate={{ x: ["0%", "-100%"] }}
            transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
          >
            {[...galleryImages, ...galleryImages].map((img, i) => (
              <div
                key={i}
                className="min-w-[300px] h-[200px] rounded-xl overflow-hidden shadow-lg bg-white flex-shrink-0"
              >
                <img
                  src={img}
                  alt={`SPR JK Tyres Gallery ${i + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </motion.div>
        </section>

        {/* ================= GALLERY GRID ================= */}
        <section className="bg-gray-50 py-20">
          <div className="max-w-7xl mx-auto px-6">
            <motion.h2
              className="text-3xl md:text-4xl font-bold mb-12 text-center text-gray-800"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              Explore Our Tyres
            </motion.h2>

            <div className="relative max-w-7xl mx-auto overflow-x-hidden">
              <TyreCarousel images={galleryImages} />
            </div>
          </div>
        </section>

        {/* ================= CTA SECTION ================= */}
        <section className="bg-gradient-to-r from-[#0B1B3A] to-[#1a2f5a] py-20">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <motion.h2
              className="text-4xl md:text-5xl font-bold text-white mb-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              Ready for Premium Tyres?
            </motion.h2>
            <motion.p
              className="text-xl text-gray-200 mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Contact us today for expert advice and competitive pricing
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-yellow-600 hover:bg-yellow-700 text-white px-8 py-4 rounded-lg font-bold text-lg shadow-2xl"
              >
                Contact Us
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-transparent border-2 border-yellow-600 text-yellow-600 hover:bg-yellow-600 hover:text-white px-8 py-4 rounded-lg font-bold text-lg transition"
              >
                View Catalog
              </motion.button>
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>
    </>
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
        className="absolute left-0 z-20 bg-yellow-500 text-white w-12 h-12 rounded-full shadow-md hover:bg-yellow-600 transition flex items-center justify-center"
      >
        <ChevronLeft size={24} />
      </button>
      <div className="flex overflow-x-scroll scroll-smooth no-scrollbar space-x-6 py-4 px-16">
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
        className="absolute right-0 z-20 bg-yellow-500 text-white w-12 h-12 rounded-full shadow-md hover:bg-yellow-600 transition flex items-center justify-center"
      >
        <ChevronRight size={24} />
      </button>
    </div>
  );
}
