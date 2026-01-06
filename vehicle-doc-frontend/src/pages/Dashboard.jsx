import React from "react";
import { Truck, Factory, Car, ShieldCheck, Building2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion"; // <-- import Framer Motion
import Header from "../components/Header";
import Footer from "../components/Footer";
import VehicleSearch from "./VehicleSearch";

export default function Dashboard() {
  const navigate = useNavigate();

  const services = [
    {
      title: "SPR Transport",
      desc: "Reliable logistics and transportation services with a modern fleet across regions.",
      icon: <Truck size={36} />,
      route: "/services/spr-transport",
    },
    {
      title: "Dhanush Mines",
      desc: "Mining operations with safety, efficiency, and responsible resource management.",
      icon: <Factory size={36} />,
      route: "/services/dhanush-mines",
    },
    {
      title: "SPR Motors",
      desc: "Automobile sales, service, and support with trusted vehicle brands.",
      icon: <Car size={36} />,
      route: "/services/spr-motors",
    },
    {
      title: "SPR JK Tyres",
      desc: "Authorized JK Tyres dealership offering quality tyres and expert service.",
      icon: <ShieldCheck size={36} />,
      route: "/services/spr-jk-tyres",
    },
    {
      title: "SPR Paradise",
      desc: "Hospitality and real-estate ventures delivering comfort and premium experiences.",
      icon: <Building2 size={36} />,
      route: "/services/spr-paradise",
    },
  ];

  // Motion variants for fade + slide up animation
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2, duration: 0.6, ease: "easeOut" },
    }),
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

<section className="bg-gradient-to-r from-blue-900 to-indigo-700 py-24 text-white text-center">
  <motion.h1
    className="text-4xl md:text-5xl font-extrabold mb-4"
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, ease: "easeOut" }}
  >
    Welcome to SPR Groups
  </motion.h1>

  <motion.p
    className="max-w-3xl mx-auto text-lg opacity-90"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
  >
    Delivering excellence across transport, mining, automobile, tyre distribution, and hospitality services.
  </motion.p>
</section>
      {/* Services Cards */}
      <section className="max-w-7xl mx-auto px-6 py-20">
      <motion.h2
  className="text-4xl font-bold text-center mb-14 text-gray-800"
  initial={{ opacity: 0, y: 20, scale: 0.95 }}
  animate={{ opacity: 1, y: 0, scale: 1 }}
  transition={{ duration: 0.8, ease: "easeOut" }}
>
  Our Services
</motion.h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {services.map((service, index) => (
            <motion.div
              key={index}
              custom={index} // pass index for staggered animation
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={cardVariants}
              onClick={() => navigate(service.route)}
              className="bg-white rounded-2xl shadow-lg p-8 cursor-pointer
                         hover:-translate-y-2 hover:shadow-2xl transition-all duration-300"
            >
              <div className="text-blue-700 mb-4">{service.icon}</div>
              <h3 className="text-xl font-bold mb-2">{service.title}</h3>
              <p className="text-gray-600 mb-4">{service.desc}</p>
              <span className="text-blue-700 font-semibold">Explore More →</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Trust Strip */}
      <VehicleSearch />
      <section className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-10 text-center">
          <div>
            <h3 className="text-3xl font-extrabold text-blue-800">15+</h3>
            <p className="text-gray-600">Years of Experience</p>
          </div>
          <div>
            <h3 className="text-3xl font-extrabold text-blue-800">1000+</h3>
            <p className="text-gray-600">Satisfied Clients</p>
          </div>
          <div>
            <h3 className="text-3xl font-extrabold text-blue-800">250+</h3>
            <p className="text-gray-600">Fleet Strength</p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
