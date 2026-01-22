import React, { useState, useEffect, useRef } from "react";
import { Truck, Factory, Car, ShieldCheck, Building2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import * as jwt_decode from "jwt-decode";
import { motion } from "framer-motion"; // <-- import Framer Motion
import Header from "../components/Header";
import Footer from "../components/Footer";
import VehicleSearch from "./VehicleSearch";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";
import hero1 from "../assets/hero/owner1.png";
import hero2 from "../assets/hero/hero2.png";
import hero3 from "../assets/hero/hero3.png";
import hero4 from "../assets/hero/hero4.jpg";
import hero3Jpg from "../assets/hero/hero3.jpg";
import sprParadiseImg from "../assets/services/spr-paradise.jpg";
import JKTyresImg from "../assets/services/jktyres.png";
import sprMotorsImg from "../assets/services/sprmotors.png"
import dhanushminesImg from "../assets/services/dhanushmines.png"
import BlueMetal from "../assets/BlueMetal/Bluemetal.png";
import sprTransport from "../assets/services/SPR.png";
import PartnersSlider from "../components/PartnersSlider";
export default function Dashboard() {
  const navigate = useNavigate();
    const [user, setUser] = useState(null);

const swiperRef = useRef(null);
  const services = [
    {
      title: "SPR Transport",
      desc: "Reliable logistics and transportation services with a modern fleet across regions.",
      icon: <Truck size={36} />,
       image: sprTransport,
      route: "/services/spr-transport",
      imagePosition: "object-top",
    },
    {
      title: "Dhanush Mines",
      desc: "Mining operations with safety, efficiency, and responsible resource management.",
      icon: <Factory size={36} />,
      image:dhanushminesImg,
      route: "/services/dhanush-mines",
    },
       {
      title: "Blue Metal",
      desc: "Mining operations with safety, efficiency, and responsible resource management.",
      icon: <Factory size={36} />,
      image:BlueMetal,
      route: "/services/spr-bluemetal",
    },
    {
      title: "SPR Motors",
      desc: "Automobile sales, service, and support with trusted vehicle brands.",
      icon: <Car size={36} />,
      image:sprMotorsImg,
      route: "/services/spr-motors",
    },
    {
      title: "SPR JK Tyres",
      desc: "Authorized JK Tyres dealership offering quality tyres and expert service.",
      icon: <ShieldCheck size={36} />,
      image:JKTyresImg,
      route: "/services/spr-jk-tyres",
    },
    {
      title: "SPR Paradise",
      desc: "Hospitality and real-estate ventures delivering comfort and premium experiences.",
      icon: <Building2 size={36} />,
       image: sprParadiseImg,
      route: "/services/spr-paradise",
    },
  ];
useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwt_decode(token); // decode JWT
        // fetch full user info including isApproved
        fetch(`/api/users/${decoded.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          .then((res) => res.json())
          .then((data) => setUser(data))
          .catch((err) => console.error(err));
      } catch (err) {
        console.error("Invalid token", err);
      }
    }
  }, []);
  // Motion variants for fade + slide up animation
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.1, ease: "easeOut" },
    }),
  };
const slides = [
{
  image: hero1,
  title: "“I take decisions and then make them right.” – Ratan Tata",
  description:
    "Turning bold decisions into lasting success.",
  buttonText: "Contact Us",
  route: "/contact",
},

  {
    image: hero2,
    title: "Reliable Transport & Logistics",
    description:
      "Safe, timely, and professional logistics solutions with a modern fleet across regions.",
    buttonText: "Our Transport Services",
    route: "/services/spr-transport",
  },
  {
    image: hero3,
    title: "Complete Automobile & Tyre Care",
    description:
      "Trusted vehicle service, maintenance, and tyre solutions for all vehicle categories.",
    buttonText: "Explore Services",
    route: "/services",
  },
  {
    image: hero4,
    title: "Excellence in Mining Operations",
    description:
      "Quality blue metal and mineral extraction with state-of-the-art machinery and safety standards.",
    buttonText: "Our Mining Services",
    route: "/services/dhanush-mines",
  },
  {
    image: hero3Jpg,
    title: "Premium Hospitality Services",
    description:
      "Experience comfort and luxury with SPR Paradise - your trusted partner in hospitality and real estate.",
    buttonText: "Discover Paradise",
    route: "/services/spr-paradise",
  },
  {
    image: hero2,
    title: "Comprehensive Business Solutions",
    description:
      "From transport to mining, motors to tyres - SPR Groups delivers excellence across all sectors.",
    buttonText: "Learn More",
    route: "/about/vision",
  },
];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
<section className="relative">
  <Swiper
    modules={[Autoplay, EffectFade]}
    effect="fade"
    autoplay={{ delay: 2000, disableOnInteraction: false }}
    loop
    onSwiper={(swiper) => (swiperRef.current = swiper)}
    className="h-[90vh] w-full"
  >
    {slides.map((slide, index) => (
      <SwiperSlide key={index}>
        <div className="relative h-[90vh] w-full overflow-hidden">

          {/* HERO IMAGE */}
          <img
            src={slide.image}
            alt={slide.title}
            className={`absolute inset-0 w-full h-full object-cover ${
              index === 0 ? "object-top" : "object-center"
            }`}
          />

          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/50"></div>

          {/* TEXT CONTENT */}
       {index === 0 ? (
<div
  className={`relative z-10 max-w-7xl mx-auto px-6 h-full flex items-center
    ${index === 0 ? "justify-end" : "justify-start"}
  `}
>
  <motion.div
    key={index}
    initial={{ opacity: 0, y: 40 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.9, ease: "easeOut" }}
    className={`max-w-2xl text-white ${
      index === 0 ? "text-right" : "text-left"
    }`}
  >
    <h1
      className={`font-extrabold mb-2 uppercase ${
        index === 0
          ? "text-3xl md:text-4xl lg:text-5xl"
          : "text-4xl md:text-5xl lg:text-6xl"
      }`}
    >
      {slide.title}
    </h1>

    <p className="text-lg md:text-xl mb-8 opacity-90">
      {slide.description}
    </p>

    <button
      onClick={() => navigate(slide.route)}
      className="bg-red-600 hover:bg-red-700 transition px-6 py-3 rounded-md font-semibold"
    >
      {slide.buttonText}
    </button>
  </motion.div>
</div>

) : (
  /* OTHER SLIDES – Center */
  <div className="relative z-10 max-w-7xl mx-auto px-6 h-full flex items-center">
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: "easeOut" }}
      className="max-w-2xl text-white"
    >
      <h1 className="font-extrabold mb-2 uppercase text-4xl md:text-5xl lg:text-6xl">
        {slide.title}
      </h1>

      <p className="text-lg md:text-xl mb-8 opacity-90">
        {slide.description}
      </p>

      <button
        onClick={() => navigate(slide.route)}
        className="bg-red-600 hover:bg-red-700 transition px-6 py-3 rounded-md font-semibold"
      >
        {slide.buttonText}
      </button>
    </motion.div>
  </div>
)}

        </div>
      </SwiperSlide>
    ))}
  </Swiper>

  {/* LEFT ARROW */}
  <button
    onClick={() => swiperRef.current?.slidePrev()}
    className="absolute left-6 top-1/2 -translate-y-1/2 z-20
               bg-black/40 hover:bg-black/60
               text-white p-3 rounded-full transition"
  >
    <ChevronLeft size={22} />
  </button>

  {/* RIGHT ARROW */}
  <button
    onClick={() => swiperRef.current?.slideNext()}
    className="absolute right-6 top-1/2 -translate-y-1/2 z-20
               bg-black/40 hover:bg-black/60
               text-white p-3 rounded-full transition"
  >
    <ChevronRight size={22} />
  </button>
</section>


<section className="py-24 text-center bg-white overflow-hidden">
  
  {/* Heading */}
  <motion.h1
    className="text-4xl md:text-5xl font-extrabold mb-4 text-[#0B1B3A]"
    initial={{ opacity: 0, y: -40, scale: 0.95 }}
    whileInView={{ opacity: 1, y: 0, scale: 1 }}
    viewport={{ once: true }}
    transition={{
      duration: 0.9,
      ease: [0.16, 1, 0.3, 1], // premium easing
    }}
  >
    WELCOME TO SPR GROUPS
  </motion.h1>

  {/* Description */}
  <motion.p
    className="max-w-3xl mx-auto text-lg text-[#020617] opacity-90"
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{
      delay: 0.25,
      duration: 0.8,
      ease: "easeOut",
    }}
  >
    Delivering excellence across transport, mining, automobile, tyre distribution,
    and hospitality services.
  </motion.p>

</section>

      {/* Services Cards */}
  {/* Services Section */}
<section className="max-w-7xl mx-auto px-6 py-20">
  <motion.h2
            className="text-4xl md:text-5xl font-bold text-center mb-12 text-[#0B1B3A]"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            OUR SERVICES
          </motion.h2>
  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
    {services.map((service, index) => (
      <motion.div
        key={index}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.15, duration: 0.6 }}
        viewport={{ once: true }}
        className="bg-white border border-gray-200 rounded-xl overflow-hidden
                   hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
      >
        {/* Image */}
        <div className="h-48 overflow-hidden bg-gray-100">
          <img
            src={service.image}
            alt={service.title}
            className={`w-full h-full object-cover hover:scale-105 transition-transform duration-500 ${
              service.imagePosition || "object-center"
            }`}
          />
        </div>

        {/* Content */}
        <div className="p-6 text-center">
          <h3 className="text-xl font-bold text-gray-800 mb-3">
            {service.title}
          </h3>

          <p className="text-gray-600 text-sm mb-6 line-clamp-3">
            {service.desc}
          </p>

          <button
            onClick={() => navigate(service.route)}
            className="px-6 py-2 rounded-full bg-[#0B1B3A] text-white
                       text-sm font-semibold hover:bg-[#020617]
                       transition-colors duration-300"
          >
            View Service
          </button>
        </div>
      </motion.div>
    ))}
  </div>
</section>

      {/* Trust Strip */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        {user?.isApproved ? (
          <VehicleSearch />
        ) : (
          <div className="bg-yellow-100 p-6 rounded-xl text-center text-yellow-800">
            Your account is awaiting admin approval to access vehicle search.
          </div>
        )}
      </section>

      {/* ================= UNIQUE DESIGN SECTIONS ================= */}
      
      {/* Why Choose Us Section */}
      <section className="bg-gradient-to-br from-[#0B1B3A] via-[#1a2f5a] to-[#0B1B3A] py-20 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-center mb-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            Why Choose SPR Groups?
          </motion.h2>
          <motion.p
            className="text-center text-gray-300 mb-12 text-lg max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Excellence, trust, and innovation across all our business verticals
          </motion.p>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "15+ Years Experience",
                desc: "Proven track record of excellence and customer satisfaction",
                icon: "🏆",
              },
              {
                title: "Multi-Industry Leader",
                desc: "Diverse portfolio covering transport, mining, motors, and more",
                icon: "🚀",
              },
              {
                title: "Customer-Centric",
                desc: "Dedicated support and personalized service for every client",
                icon: "❤️",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
              >
                <div className="text-5xl mb-4">{item.icon}</div>
                <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                <p className="text-gray-300">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials/Features Section */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-center mb-12 text-[#0B1B3A]"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            Our Core Values
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Quality", desc: "Uncompromising standards in every service", color: "bg-blue-500" },
              { title: "Integrity", desc: "Honest and transparent business practices", color: "bg-green-500" },
              { title: "Innovation", desc: "Embracing modern technology and methods", color: "bg-yellow-500" },
              { title: "Commitment", desc: "Dedicated to exceeding customer expectations", color: "bg-red-500" },
            ].map((value, index) => (
              <motion.div
                key={index}
                className="text-center p-6 rounded-xl bg-gray-50 hover:shadow-xl transition"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <div className={`${value.color} w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold`}>
                  {value.title[0]}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{value.title}</h3>
                <p className="text-gray-600 text-sm">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-gradient-to-r from-yellow-500 via-yellow-600 to-yellow-500 py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            Ready to Work With Us?
          </motion.h2>
          <motion.p
            className="text-xl text-white/90 mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Get in touch today and experience the SPR Groups difference
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <button
              onClick={() => navigate("/contact")}
              className="px-8 py-4 bg-white text-yellow-600 rounded-lg font-bold text-lg hover:bg-gray-100 transition shadow-xl"
            >
              Contact Us
            </button>
            <button
              onClick={() => navigate("/services")}
              className="px-8 py-4 bg-[#0B1B3A] text-white rounded-lg font-bold text-lg hover:bg-[#020617] transition shadow-xl"
            >
              Explore Services
            </button>
          </motion.div>
        </div>
      </section>
      
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
            <h3 className="text-3xl font-extrabold text-blue-800">350+</h3>
            <p className="text-gray-600">Fleet Strength</p>
          </div>
        </div>
      </section>
<PartnersSlider/>
      <Footer />
    </div>
  );
}
