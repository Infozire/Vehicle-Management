import React from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  Star,
  ShieldCheck,
  Clock,
  Users,
  MapPin,
  Coffee,
} from "lucide-react";
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

  const stats = [
    { number: "20+", label: "Luxury Villas", icon: <Sparkles size={26} /> },
    { number: "50+", label: "Events Hosted", icon: <Star size={26} /> },
    { number: "24/7", label: "Concierge", icon: <Clock size={26} /> },
    { number: "4.9", label: "Guest Rating", icon: <Users size={26} /> },
  ];

  const galleryTop = [p10, p2, p3, p4, p5, p6];
  const galleryBottom = [p8, p9, p1, p7];

  return (
    <>
      <Header />
      <div className="bg-gray-50">
        {/* Hero */}
        <section className="relative h-[520px] md:h-[560px] overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${heroImg})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/65 to-black/30" />

          <div className="relative z-10 max-w-6xl mx-auto h-full px-6 flex flex-col justify-center text-white">
            <motion.p
              className="text-sm uppercase tracking-[0.3em] text-white/70"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Hospitality | Leisure | Luxury
            </motion.p>
            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold mt-3"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              SPR Paradise
            </motion.h1>
            <motion.p
              className="mt-4 text-lg md:text-xl text-white/85 max-w-3xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.2 }}
            >
              Premium hospitality and curated experiences blending luxury with
              comfort—crafted for unforgettable stays.
            </motion.p>
            <motion.div
              className="mt-6 flex flex-wrap gap-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <span className="px-4 py-2 rounded-full bg-white/15 border border-white/20">
                Resort Stays
              </span>
              <span className="px-4 py-2 rounded-full bg-white/15 border border-white/20">
                Corporate Retreats
              </span>
              <span className="px-4 py-2 rounded-full bg-white/15 border border-white/20">
                Destination Events
              </span>
            </motion.div>
          </div>
        </section>

        {/* Stats */}
        <section className="bg-white py-14 shadow-[0_-16px_40px_rgba(0,0,0,0.08)]">
          <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, idx) => (
              <motion.div
                key={idx}
                className="bg-gray-50 rounded-2xl p-6 text-center border border-gray-100"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
              >
                <div className="flex justify-center mb-3 text-[#9B5A2D]">
                  {stat.icon}
                </div>
                <h3 className="text-3xl font-bold text-[#0B1B3A]">
                  {stat.number}
                </h3>
                <p className="text-gray-600 mt-1 text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* About + Highlights */}
        <section className="max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-14 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-sm uppercase tracking-[0.3em] text-[#9B5A2D] mb-3">
              About Us
            </p>
            <h2 className="text-4xl font-bold text-[#0B1B3A] mb-4">
              Crafted for Memorable Stays
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              SPR Paradise offers premium hospitality with curated experiences
              across resorts, leisure activities, and events—designed to delight
              every guest.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              From personalized itineraries to full-service event management, we
              bring luxury, safety, and warmth together under one roof.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-6">
              {highlights.map((item, index) => (
                <motion.div
                  key={index}
                  className="flex items-start gap-3 p-3 rounded-xl bg-white shadow-sm border border-gray-100"
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05, duration: 0.4 }}
                >
                  <ShieldCheck className="text-[#9B5A2D] mt-1" size={18} />
                  <p className="text-gray-700 text-sm">{item}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="rounded-3xl overflow-hidden shadow-2xl">
              <img
                src={p10}
                alt="Paradise Hero"
                className="w-full h-[420px] object-cover"
              />
            </div>
            <div className="absolute -bottom-10 -left-10 bg-white shadow-2xl rounded-2xl p-5 w-64 border border-gray-100">
              <div className="flex items-center gap-3">
                <MapPin className="text-[#9B5A2D]" size={20} />
                <div>
                  <p className="text-sm text-gray-500">Locations</p>
                  <p className="font-semibold text-[#0B1B3A]">Across India</p>
                </div>
              </div>
              <div className="mt-3 flex items-center gap-3">
                <Coffee className="text-[#9B5A2D]" size={20} />
                <div>
                  <p className="text-sm text-gray-500">Amenities</p>
                  <p className="font-semibold text-[#0B1B3A]">Resort & Spa</p>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Mosaic Gallery */}
        <section className="max-w-7xl mx-auto px-6 pb-20">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-center mb-12 text-[#0B1B3A]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            Discover SPR Paradise
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              className="relative overflow-hidden rounded-3xl shadow-xl"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <img
                src={p10}
                alt="SPR Paradise Featured"
                className="w-full h-[520px] object-cover hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-black/35 flex items-end p-6">
                <div className="text-white">
                  <h3 className="text-2xl font-semibold">Luxury Living</h3>
                  <p className="opacity-90">Where comfort meets elegance</p>
                </div>
              </div>
            </motion.div>

            <div className="grid grid-cols-2 gap-4">
              {galleryTop.slice(1).map((img, i) => (
                <motion.div
                  key={i}
                  className="relative overflow-hidden rounded-2xl group"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                >
                  <img
                    src={img}
                    alt={`Paradise ${i + 2}`}
                    className="w-full h-[230px] object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition" />
                </motion.div>
              ))}
            </div>
          </div>

          <div className="mt-10 flex gap-6 overflow-x-auto pb-3 scrollbar-hide">
            {[...galleryBottom, ...galleryBottom].map((img, i) => (
              <motion.div
                key={i}
                className="min-w-[260px] h-[180px] overflow-hidden rounded-xl shadow-lg"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  delay: (i % galleryBottom.length) * 0.1,
                  duration: 0.5,
                }}
              >
                <img
                  src={img}
                  alt={`Paradise extra ${i + 1}`}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                />
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-gradient-to-r from-[#0B1B3A] via-[#1a2f5a] to-[#0B1B3A] py-16 text-white">
          <div className="max-w-5xl mx-auto px-6 text-center">
            <motion.h2
              className="text-3xl md:text-4xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              Plan Your Next Luxury Escape
            </motion.h2>
            <motion.p
              className="text-lg text-white/85 mb-8"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              Talk to our concierge team for curated experiences, corporate
              retreats, and destination events.
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <button className="px-8 py-3 bg-white text-[#0B1B3A] font-bold rounded-lg hover:bg-gray-100 transition shadow-lg">
                Contact Us
              </button>
              <button className="px-8 py-3 border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition">
                Explore Experiences
              </button>
            </motion.div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
