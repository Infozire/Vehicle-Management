import React from "react";
import { motion } from "framer-motion";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import visionBg from "../../assets/bgImage.png"; // banner image
import { Eye, Target, Award } from "lucide-react";

export default function VisionMission() {
  // Variants
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2, duration: 0.6, ease: "easeOut" },
    }),
  };

  const coreValueVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: (i) => ({
      opacity: 1,
      scale: 1,
      transition: { delay: i * 0.15, duration: 0.6, ease: "easeOut" },
    }),
  };

  return (
    <div className="w-full min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <motion.section
        className="relative h-[60vh] flex items-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${visionBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <div className="max-w-7xl mx-auto px-6 text-white">
          <motion.h1
            className="text-4xl md:text-5xl font-extrabold mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Vision & Mission
          </motion.h1>
          <motion.p
            className="max-w-2xl text-lg opacity-90"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Guiding principles that drive SPR Transport towards excellence, reliability,
            and sustainable growth.
          </motion.p>
        </div>
      </motion.section>

      {/* Vision & Mission Cards */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-10">
          {/* Vision */}
          <motion.div
            className="bg-white shadow-xl rounded-2xl p-10 hover:shadow-2xl transition"
            custom={0}
            initial="hidden"
            animate="visible"
            variants={cardVariants}
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <Eye className="text-blue-700" />
              </div>
              <h2 className="text-2xl font-bold text-blue-900">Our Vision</h2>
            </div>
            <p className="text-gray-700 leading-relaxed">
              To become a leading and trusted transportation and logistics provider by
              delivering safe, efficient, and innovative transport solutions that support
              industries, communities, and economic growth across regions.
            </p>
          </motion.div>

          {/* Mission */}
          <motion.div
            className="bg-white shadow-xl rounded-2xl p-10 hover:shadow-2xl transition"
            custom={1}
            initial="hidden"
            animate="visible"
            variants={cardVariants}
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-indigo-100 p-3 rounded-full">
                <Target className="text-indigo-700" />
              </div>
              <h2 className="text-2xl font-bold text-indigo-900">Our Mission</h2>
            </div>
            <ul className="list-disc list-inside text-gray-700 space-y-2 leading-relaxed">
              <li>Provide reliable and timely transportation services.</li>
              <li>Maintain the highest standards of safety and compliance.</li>
              <li>Adopt modern technology for efficient logistics operations.</li>
              <li>Build long-term partnerships with customers and stakeholders.</li>
              <li>Empower employees through training and growth opportunities.</li>
            </ul>
          </motion.div>
        </div>
      </section>

      {/* Core Values */}
      <section className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Our Core Values
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {["Integrity", "Commitment", "Innovation"].map((value, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-xl shadow-lg p-8 text-center"
                custom={index}
                initial="hidden"
                animate="visible"
                variants={coreValueVariants}
              >
                <Award
                  className={`mx-auto mb-4 ${
                    index === 0 ? "text-blue-700" : index === 1 ? "text-indigo-700" : "text-purple-700"
                  }`}
                  size={40}
                />
                <h3 className="font-bold text-lg mb-2">{value}</h3>
                <p className="text-gray-600">
                  {value === "Integrity"
                    ? "We operate with honesty, transparency, and ethical business practices."
                    : value === "Commitment"
                    ? "Dedicated to delivering quality services and meeting customer expectations."
                    : "Continuously improving through technology and modern logistics solutions."}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <motion.section
        className="bg-gradient-to-r from-blue-900 to-indigo-700 py-14"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="max-w-7xl mx-auto px-6 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Moving Forward with Purpose</h2>
          <p className="max-w-3xl mx-auto opacity-90">
            At SPR Transport, our vision and mission inspire us to deliver excellence in
            every journey, ensuring trust, safety, and sustainability for the future.
          </p>
        </div>
      </motion.section>

      <Footer />
    </div>
  );
}
