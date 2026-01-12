import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Car, Wrench, ShoppingCart, Shield, Clock, Users, CheckCircle } from "lucide-react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import heroImg from "../../assets/motors/mbanner.png";
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

  const services = [
    {
      icon: <Car size={40} />,
      title: "Vehicle Sales",
      description: "Wide selection of commercial and private vehicles",
      color: "bg-blue-500",
    },
    {
      icon: <Wrench size={40} />,
      title: "Maintenance",
      description: "Expert servicing and repair by certified technicians",
      color: "bg-yellow-500",
    },
    {
      icon: <ShoppingCart size={40} />,
      title: "Spare Parts",
      description: "Genuine parts and accessories available",
      color: "bg-green-500",
    },
    {
      icon: <Shield size={40} />,
      title: "Warranty",
      description: "Comprehensive warranty and support services",
      color: "bg-red-500",
    },
  ];

  const stats = [
    { number: "500+", label: "Vehicles Sold", icon: <Car size={32} /> },
    { number: "1000+", label: "Happy Customers", icon: <Users size={32} /> },
    { number: "15+", label: "Years Experience", icon: <Clock size={32} /> },
    { number: "98%", label: "Satisfaction Rate", icon: <CheckCircle size={32} /> },
  ];

  /* ===== CAROUSEL STATE ===== */
  const carouselImages = [heroImg, m1, m2];
  const [carouselIndex, setCarouselIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCarouselIndex((prev) => (prev + 1) % carouselImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [carouselImages.length]);

  // Gallery images
  const galleryImages = [m1, m2, heroImg, m1, m2, heroImg];

  const listVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.5 },
    }),
  };

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
                alt="SPR Motors"
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
            className="relative z-20 h-full flex flex-col justify-center items-start px-6 md:px-12 lg:px-20"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white mb-4">
                SPR Motors
              </h1>
              <p className="text-xl md:text-2xl text-gray-200 mb-2 max-w-2xl">
                Precision. Performance. Trust.
              </p>
              <p className="text-lg text-yellow-400 mb-8 max-w-xl">
                Your complete automotive solution partner
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-yellow-600 hover:bg-yellow-700 text-white px-8 py-4 rounded-lg font-bold text-lg shadow-2xl transition"
              >
                Explore Our Services
              </motion.button>
            </motion.div>
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
        <section className="bg-gradient-to-r from-[#0B1B3A] to-[#1a2f5a] py-16">
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
                  <div className="flex justify-center mb-3 text-yellow-500">
                    {stat.icon}
                  </div>
                  <h3 className="text-4xl md:text-5xl font-bold text-white mb-2">
                    {stat.number}
                  </h3>
                  <p className="text-gray-300 text-sm md:text-base">
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
                About SPR Motors
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                SPR Motors specializes in vehicle sales, maintenance, and after-sales services. 
                We provide a complete ecosystem for automotive needs, from vehicle acquisition 
                to servicing and spare parts availability.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                With certified technicians, genuine parts, and a customer-first approach, we 
                ensure your vehicle receives the best care and service it deserves.
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
                    variants={listVariants}
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
                src={m1}
                alt="SPR Motors Service"
                className="col-span-2 h-64 w-full rounded-2xl shadow-xl object-cover"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              />
              <motion.img
                src={m2}
                alt="SPR Motors Vehicle"
                className="h-48 w-full rounded-2xl shadow-lg object-cover"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              />
              <motion.img
                src={heroImg}
                alt="SPR Motors Showroom"
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
              Comprehensive automotive solutions tailored to your needs
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

        {/* ================= IMAGE SHOWCASE SLIDER ================= */}
        <section className="bg-gray-100 py-16 overflow-hidden">
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
                  alt={`SPR Motors Gallery ${i + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </motion.div>
        </section>

        {/* ================= GALLERY GRID ================= */}
        <section className="bg-white py-20">
          <div className="max-w-7xl mx-auto px-6">
            <motion.h2
              className="text-3xl md:text-4xl font-bold mb-12 text-center text-gray-800"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              Our Showroom & Services
            </motion.h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {galleryImages.map((img, i) => (
                <motion.div
                  key={i}
                  className="relative rounded-2xl overflow-hidden shadow-lg cursor-pointer group"
                  initial={{ opacity: 0, y: 40, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.6, ease: "easeOut" }}
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <img
                    src={img}
                    alt={`SPR Motors ${i + 1}`}
                    className={`w-full ${
                      i % 3 === 0 ? "h-72" : i % 3 === 1 ? "h-64" : "h-80"
                    } object-cover transition-transform duration-500 group-hover:scale-110`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-4 left-4 right-4">
                      <p className="text-white font-semibold text-lg">
                        SPR Motors Excellence
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
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
              Ready to Experience Excellence?
            </motion.h2>
            <motion.p
              className="text-xl text-gray-200 mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Visit our showroom or contact us today for all your automotive needs
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
                View Vehicles
              </motion.button>
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
