import React from "react";
import { motion } from "framer-motion";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

export default function Contact() {
  // Animation Variants
  const infoVariants = {
    hidden: { opacity: 0, x: -40 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.2, duration: 0.6, ease: "easeOut" },
    }),
  };

  const formVariants = {
    hidden: { opacity: 0, x: 40 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const mapVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 1, ease: "easeOut" },
    },
  };

  const contactInfo = [
    {
      icon: <Phone className="text-blue-700 mt-1" />,
      title: "Phone",
      desc: (
        <div className="space-y-1 text-gray-600">
          <a href="tel:+919345434217" className="block hover:text-blue-700">
            +91 93454 34217
          </a>
          <a href="tel:+919486836888" className="block hover:text-blue-700">
            +91 94868 36888
          </a>
          <a href="tel:+918925827059" className="block hover:text-blue-700">
            +91 89258 27059
          </a>
          <a href="tel:+919042066205" className="block hover:text-blue-700">
            +91 90420 66205
          </a>
        </div>
      ),
    },
    {
      icon: <Mail className="text-blue-700 mt-1" />,
      title: "Email",
      desc: "support@sprtransport.com",
    },
    {
      icon: <MapPin className="text-blue-700 mt-1" />,
      title: "Office Address",
      desc: "Sri Periyandavar And Company, Tindivanam Bypass, Near KBS Bus Stop, Pattanur, Tamil Nadu, Villupuram – 605111",
    },
    {
      icon: <Clock className="text-blue-700 mt-1" />,
      title: "Working Hours",
      desc: "24/7",
    },
  ];

  return (
    <div className="w-full min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <motion.section
        className="bg-gradient-to-r from-blue-900 to-indigo-700 py-20"
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
            Contact Us
          </motion.h1>
          <motion.p
            className="max-w-2xl text-lg opacity-90"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            We’re here to help. Reach out to SPR Groups ,
             business enquiries, or support.
          </motion.p>
        </div>
      </motion.section>

      {/* Contact Info & Form */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Details */}
          <div className="space-y-8">
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                className="flex gap-4 items-start"
                custom={index}
                initial="hidden"
                animate="visible"
                variants={infoVariants}
              >
                {info.icon}
                <div>
                  <p className="font-semibold text-gray-800">{info.title}</p>
                  <div className="mt-1">{info.desc}</div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Contact Form */}
          <motion.div
            className="bg-white shadow-xl rounded-2xl p-8"
            initial="hidden"
            animate="visible"
            variants={formVariants}
          >
            <motion.h2
              className="text-2xl font-bold mb-6 text-gray-800"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Send Us a Message
            </motion.h2>

            <form className="space-y-5">
              {["Your Name", "Your Email", "Subject"].map((placeholder, i) => (
                <motion.input
                  key={i}
                  type={placeholder === "Your Email" ? "email" : "text"}
                  placeholder={placeholder}
                  className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 * i + 0.3 }}
                />
              ))}

              <motion.textarea
                rows={4}
                placeholder="Your Message"
                className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9 }}
              />

              <motion.button
                type="submit"
                className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-3 rounded-lg transition"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.1, duration: 0.5 }}
              >
                Submit Message
              </motion.button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Map Section – EXACT LOCATION WITH CLICK TO DIRECTIONS */}
      <motion.section
        className="w-full h-[400px]"
        initial="hidden"
        animate="visible"
        variants={mapVariants}
      >
        <div
          className="relative w-full h-full cursor-pointer"
          onClick={() =>
            window.open(
              "https://www.google.com/maps/dir/?api=1&destination=Sri%20Periyandavar%20And%20Company%2C%20Tindivanam%20Bypass%2C%20Near%20KBS%20Bus%20Stop%2C%20Pattanur%2C%20Tamil%20Nadu%2C%20Villupuram%20%E2%80%93%20605111",
              "_blank"
            )
          }
        >
          <iframe
            title="Sri Periyandavar And Company Location"
            src="https://www.google.com/maps?q=Sri%20Periyandavar%20And%20Company%2C%20Tindivanam%20Bypass%2C%20Near%20KBS%20Bus%20Stop%2C%20Pattanur%2C%20Tamil%20Nadu%2C%20Villupuram%20%E2%80%93%20605111&z=16&output=embed"
            className="w-full h-full border-0 pointer-events-none"
            loading="lazy"
          />
          <div className="absolute bottom-3 right-3 bg-white/80 text-xs px-3 py-1 rounded shadow">
            Click map to open directions
          </div>
        </div>
      </motion.section>

      <Footer />
    </div>
  );
}
