import React from "react";
import { motion } from "framer-motion";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import historyBg from "../../assets/bgImage.png"; // banner image

export default function History() {
  const milestones = [
    {
      title: "Foundation & Early Years",
      desc: "SPR Transport was founded with a strong vision to provide reliable, safe, and efficient logistics solutions. Starting with a small fleet and a committed workforce, the company focused on punctual delivery and customer satisfaction, building trust across regions."
    },
    {
      title: "Expansion & Growth",
      desc: "With consistent performance and customer confidence, SPR Transport expanded its fleet and service network. New routes, modern vehicles, and trained drivers enabled us to serve industries such as mining, construction, manufacturing, and retail logistics."
    },
    {
      title: "Technology & Operations",
      desc: "Embracing digital transformation, SPR Transport adopted GPS tracking, fleet monitoring, and optimized logistics planning. These innovations improved transparency, safety, and operational efficiency."
    },
    {
      title: "Today & Beyond",
      desc: "Today, SPR Transport stands as a trusted logistics partner under SPR Groups, operating with a modern fleet, experienced professionals, and a strong commitment to sustainability and future-ready transportation solutions."
    }
  ];

  // Variants
  const timelineVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.25, duration: 0.6, ease: "easeOut" },
    }),
  };

  const statsVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <div className="w-full min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <motion.section
        className="relative h-[60vh] flex items-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url(${historyBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <div className="max-w-7xl mx-auto px-6 text-white">
          <motion.h1
            className="text-4xl md:text-5xl font-extrabold mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Our History
          </motion.h1>
          <motion.p
            className="max-w-2xl text-lg opacity-90"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            A journey of trust, growth, and excellence in transportation under SPR Groups.
          </motion.p>
        </div>
      </motion.section>

      {/* Content Section */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-10">
          {/* Timeline */}
          <div className="md:col-span-2 space-y-10">
            {milestones.map((m, index) => (
              <motion.div
                key={index}
                custom={index}
                initial="hidden"
                animate="visible"
                variants={timelineVariants}
              >
                <h2 className="text-2xl font-bold text-blue-900 mb-2">{m.title}</h2>
                <p className="text-gray-700 leading-relaxed">{m.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Stats Card */}
          <motion.div
            className="bg-white shadow-lg rounded-2xl p-8 space-y-6"
            initial="hidden"
            animate="visible"
            variants={statsVariants}
          >
            <h3 className="text-xl font-bold text-gray-800">Our Milestones</h3>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Years of Experience</span>
                <span className="font-bold text-blue-700">15+</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Fleet Strength</span>
                <span className="font-bold text-blue-700">250+</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Operational Routes</span>
                <span className="font-bold text-blue-700">50+</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Satisfied Clients</span>
                <span className="font-bold text-blue-700">1000+</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Vision Strip */}
      <motion.section
        className="bg-gradient-to-r from-blue-900 to-indigo-700 py-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="max-w-7xl mx-auto px-6 text-center text-white">
          <h2 className="text-3xl font-bold mb-3">Driven by Purpose</h2>
          <p className="max-w-3xl mx-auto opacity-90">
            Our history reflects our dedication to integrity, innovation, and long-term
            partnerships. SPR Transport continues to move forward, delivering excellence
            across every mile.
          </p>
        </div>
      </motion.section>

      <Footer />
    </div>
  );
}
