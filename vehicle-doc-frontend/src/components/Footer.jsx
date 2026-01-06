import React from "react";
import { FaFacebookF, FaYoutube, FaLinkedin } from "react-icons/fa";
import { FaX } from "react-icons/fa6"; // For X (Twitter/X)

export default function Footer() {
  return (
    <footer         style={{ background: "linear-gradient(90deg,#1E40AF,#2563EB,#6D28D9)" }}
 className="text-white">
      <div className="max-w-7xl mx-auto px-10 py-12 grid grid-cols-1 md:grid-cols-4 gap-8" >
        {/* Company Info */}
        <div>
          <h2 className="text-xl font-semibold mb-3">SPR Groups</h2>
          <p>123, Main Street, City, State 560001</p>
          <p>India</p>
          <p className="mt-3"><strong>Phone:</strong> 1800 123 4567</p>
          <p><strong>Email:</strong> customercare@sprgroups.com</p>
        </div>

        {/* Navigation Column 1 */}
        <div className="flex flex-col gap-2">
          <p className="cursor-pointer hover:underline">Home</p>
          <p className="cursor-pointer hover:underline">About Us</p>
          <p className="cursor-pointer hover:underline">Investor Desk</p>
          <p className="cursor-pointer hover:underline">Careers</p>
          <p className="cursor-pointer hover:underline">Web Mail</p>
          <p className="cursor-pointer hover:underline">Client Login</p>
          <p className="cursor-pointer hover:underline">My Booking Console</p>
        </div>

        {/* Navigation Column 2 */}
        <div className="flex flex-col gap-2">
          <p className="cursor-pointer hover:underline">Track Consignments</p>
          <p className="cursor-pointer hover:underline">Pickup Request</p>
          <p className="cursor-pointer hover:underline">Courier Tracking</p>
          <p className="cursor-pointer hover:underline">GST Details</p>
          <p className="cursor-pointer hover:underline">Branch List</p>
          <p className="cursor-pointer hover:underline">General Parcel T & C</p>
        </div>

        {/* Social + App Download */}
        <div className="flex flex-col gap-4">
          <p className="cursor-pointer hover:underline">Contact Us</p>
          <p className="cursor-pointer hover:underline">VAT Details</p>
          <p className="cursor-pointer hover:underline">Vigil Mechanism</p>

          <div className="flex gap-3 mt-2">
            <div className="bg-yellow-500 p-2 rounded-full cursor-pointer hover:bg-yellow-600"><FaX size={18} /></div>
            <div className="bg-yellow-500 p-2 rounded-full cursor-pointer hover:bg-yellow-600"><FaFacebookF size={18} /></div>
            <div className="bg-yellow-500 p-2 rounded-full cursor-pointer hover:bg-yellow-600"><FaYoutube size={18} /></div>
            <div className="bg-yellow-500 p-2 rounded-full cursor-pointer hover:bg-yellow-600"><FaLinkedin size={18} /></div>
          </div>

          <p className="font-bold mt-2">Download Digital SPR+</p>
          <img
            src="https://play.google.com/intl/en_in/badges/images/generic/en_badge_web_generic.png"
            alt="Google Play"
            className="w-32 mt-1 cursor-pointer"
          />
        </div>
      </div>

      {/* Copyright */}
      <div style={{ background: "linear-gradient(90deg,#1E40AF,#2563EB,#6D28D9)" }} className=" text-white text-sm py-3 text-center">
        © Copyright. All Rights Reserved <br />
        SPR Groups, REGD. & ADMIN. OFFICE : 123, Main Street, City, State, India - 560001
      </div>
    </footer>
  );
}
