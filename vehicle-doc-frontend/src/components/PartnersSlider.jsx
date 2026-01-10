import React, { useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import vgn from "../assets/partners/partner1.jpg";
import urbanTree from "../assets/partners/partner1.jpg";
import prestige from "../assets/partners/partner1.jpg";
import pacifica from "../assets/partners/partner1.jpg";
import olympia from "../assets/partners/partner1.jpg";

const partners = [vgn, urbanTree, prestige, pacifica, olympia];

export default function PartnersSlider() {
  const sliderRef = useRef(null);
  const intervalRef = useRef(null);

  // ✅ Responsive scroll distance
  const scroll = (direction) => {
    const scrollAmount =
      window.innerWidth < 640 ? 260 : window.innerWidth < 1024 ? 500 : 900;

    sliderRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  // 🔁 AUTO PLAY
  const startAutoPlay = () => {
    stopAutoPlay();
    intervalRef.current = setInterval(() => {
      if (!sliderRef.current) return;

      const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;

      if (scrollLeft + clientWidth >= scrollWidth - 10) {
        sliderRef.current.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        scroll("right");
      }
    }, 2500);
  };

  const stopAutoPlay = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  useEffect(() => {
    startAutoPlay();
    return () => stopAutoPlay();
  }, []);

  return (
    <section className="bg-[#E5E7EB] py-10 relative">

      {/* LEFT ARROW */}
      <button
        onClick={() => scroll("left")}
        className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 z-10
                   bg-white/25 hover:bg-white/40 p-2 md:p-3 rounded-full"
      >
        <ChevronLeft className="text-white" size={24} />
      </button>

      {/* SLIDER */}
      <div
        ref={sliderRef}
        onMouseEnter={stopAutoPlay}
        onMouseLeave={startAutoPlay}
        onTouchStart={stopAutoPlay}
        onTouchEnd={startAutoPlay}
        className="
          flex gap-6 md:gap-8
          px-6 md:px-16
          overflow-x-auto
          no-scrollbar
          scroll-smooth
          touch-pan-x
          select-none
        "
      >
        {partners.map((logo, index) => (
          <div
            key={index}
            className="
              min-w-[180px] sm:min-w-[200px] md:min-w-[220px]
              h-[90px] sm:h-[100px] md:h-[110px]
              bg-white rounded-xl shadow-md
              flex items-center justify-center
              transition-transform duration-300
              hover:scale-105
            "
          >
            <img
              src={logo}
              alt="Partner"
              className="max-h-[55px] sm:max-h-[65px] md:max-h-[70px]
                         object-contain pointer-events-none"
            />
          </div>
        ))}
      </div>

      {/* RIGHT ARROW */}
      <button
        onClick={() => scroll("right")}
        className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 z-10
                   bg-white/25 hover:bg-white/40 p-2 md:p-3 rounded-full"
      >
        <ChevronRight className="text-white" size={24} />
      </button>
    </section>
  );
}
