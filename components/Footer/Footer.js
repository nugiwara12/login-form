"use client";
import Image from "next/image";
import React, { useState } from "react";
import { FaFacebook } from "react-icons/fa";
import { IoLogoLinkedin } from "react-icons/io5";
import { FaInstagramSquare, FaGlobe } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Footer = () => {
  const [formData, setFormData] = useState({
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubscribe = (e) => {
    e.preventDefault();

    // Trigger the success toast
    toast.success("🎉 Subscribed successfully!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

    // Reset the form fields
    setFormData({
      email: "",
    });
  };
  return (
    <>
      <ToastContainer />
      <footer className="w-full py-6 md:py-10 px-4 md:px-8 lg:px-20">
        <hr className="hr-white" />
        <div className="py-4">
          <div className="text-white text-lg py-4">
            <p>
              The FoodHub app provides convenient ordering, real-time tracking,
              and easy discovery of new eateries on Google Play and the App
              Store.
            </p>
          </div>
          <div className="flex justify-center items-center w-full mx-auto">
            <div className="flex flex-col items-center md:flex-row">
              <Image
                height={100}
                width={200}
                src="/footer/googleplay.png"
                alt="Google Play"
                className="mb-2 md:mb-0 mr-0 md:mr-2"
              />
              <Image
                height={100}
                width={200}
                src="/footer/appstore.png"
                alt="App Store"
              />
            </div>
          </div>

          <div className="flex justify-center md:justify-start text-white py-4">
            <a href="#" className="mr-4 hover:underline hover:text-yellow-600">
              <FaFacebook className="h-6 w-6" />
            </a>
            <a href="#" className="mr-4 hover:underline hover:text-yellow-600">
              <IoLogoLinkedin className="h-6 w-6" />
            </a>
            <a href="#" className="mr-4 hover:underline hover:text-yellow-600">
              <FaInstagramSquare className="h-6 w-6" />
            </a>
            <a
              href="#"
              className="flex items-center hover:underline hover:text-yellow-600"
            >
              <FaGlobe className="h-6 w-6" />
              <p className="ml-2">https://hubcom.netlify.app</p>
            </a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3">
            <div className="flex justify-center md:justify-start text-white py-4">
              <a href="#">
                <Image
                  height={50}
                  width={100}
                  src="/footer/grabfood.png"
                  alt="Logo"
                  className="mr-2 border border-yellow-600 h-20 bg-gray-200 hover:bg-gray-100 rounded-lg p-2"
                />
              </a>
              <a href="#">
                <Image
                  height={50}
                  width={100}
                  src="/footer/foodpanda.png"
                  alt="Logo"
                  className="mr-2 border border-yellow-600 h-20 bg-gray-200 hover:bg-gray-100 rounded-lg p-4"
                />
              </a>
              <a href="#">
                <Image
                  height={50}
                  width={100}
                  src="/footer/inasal.png"
                  alt="Logo"
                  className="mr-2 border border-yellow-600 h-20 bg-gray-200 hover:bg-gray-100 rounded-lg p-4"
                />
              </a>
            </div>
            <div className="w-full h-fullbg-pink-500">
              <Image
                height={50}
                width={300}
                src="/logo/foodhub.png"
                alt="Logo"
                className="mr-2 h-64 p-4"
              />
            </div>
            <div className="flex justify-center items-center text-sm font-normal">
              <form className="p-6 max-w-md mx-auto" onSubmit={handleSubscribe}>
                <div className="note mb-4 text-center">
                  <label className="text-start text-white block text-xl font-semibold mb-2">
                    Subscribe for updates
                  </label>
                  <span className="text-start block text-white">
                    I hope this message finds you well.
                  </span>
                </div>
                <div className="flex items-center">
                  <input
                    placeholder="Enter your e-mail"
                    title="Enter your e-mail"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="input_field appearance-none flex-1 px-3 py-2 border border-gray-300 rounded mr-2 focus:outline-none focus:ring-2 focus:ring-yellow-600"
                  />
                  <button
                    className="submit bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
