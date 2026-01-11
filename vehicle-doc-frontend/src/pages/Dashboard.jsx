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
import sprParadiseImg from "../assets/services/spr-paradise.jpg";
import JKTyresImg from "../assets/services/jktyres.png";
import sprMotorsImg from "../assets/services/sprmotors.png"
import dhanushminesImg from "../assets/services/dhanushmines.png"
import sprTransport from "../assets/services/sprtransport.png";
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
      image:dhanushminesImg,
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
    title: "Beautify Your Surroundings",
    description:
      "Create nature’s haven right at your home with SPR transport and earth-moving services.",
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
    className="h-[90vh]"
  >
    {slides.map((slide, index) => (
      <SwiperSlide key={index}>
       <div className="relative h-[90vh] w-full overflow-hidden">
  {/* HERO IMAGE – FACE SAFE */}
  <img
    src={slide.image}
    alt={slide.title}
    className="absolute inset-0 w-full h-full
               object-cover object-[50%_15%]"
  />

  {/* Dark overlay */}
  <div className="absolute inset-0 bg-black/50"></div>

  {/* Text content */}
  <div className="relative z-10 max-w-7xl mx-auto px-6 h-full flex items-start pt-60">
    <motion.div
      key={index}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: "easeOut" }}
      className="max-w-2xl text-white"
    >
      <h1 className="text-4xl md:text-4xl font-extrabold mb-2 uppercase">
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
</div>

      </SwiperSlide>
    ))}
  </Swiper>

  {/* ⬅ LEFT ARROW */}
  <button
    onClick={() => swiperRef.current?.slidePrev()}
    className="absolute left-6 top-1/2 -translate-y-1/2 z-20
               bg-black/40 hover:bg-black/60
               text-white p-3 rounded-full
               transition duration-300"
  >
    <ChevronLeft size={22} />
  </button>

  {/* ➡ RIGHT ARROW */}
  <button
    onClick={() => swiperRef.current?.slideNext()}
    className="absolute right-6 top-1/2 -translate-y-1/2 z-20
               bg-black/40 hover:bg-black/60
               text-white p-3 rounded-full
               transition duration-300"
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
    className="text-4xl font-bold text-center mb-14 text-[#0B1B3A]"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, ease: "easeOut" }}
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
        <div className="h-48 overflow-hidden">
          <img
            src={service.image}
            alt={service.title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
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
{user?.isApproved ? (
  <VehicleSearch />
) : (
  <div className="bg-yellow-100 p-6 rounded-xl text-center text-yellow-800">
    Your account is awaiting admin approval to access vehicle search.
  </div>
)}      <section className="bg-gray-100 py-16">
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
