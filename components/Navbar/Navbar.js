"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServiceMenuOpen, setIsServiceMenuOpen] = useState(false);
  const serviceMenuRef = useRef(null);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleServiceMenu = () => {
    setIsServiceMenuOpen(!isServiceMenuOpen);
  };

  const handleClickOutside = (event) => {
    if (
      serviceMenuRef.current &&
      !serviceMenuRef.current.contains(event.target)
    ) {
      setIsServiceMenuOpen(false);
    }
  };

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsMobileMenuOpen(false);
        setIsServiceMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsMobileMenuOpen(false);
        setIsServiceMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <nav className="flex justify-center item-center bg-black w-full h-28">
      <div className="container mx-auto flex justify-between items-center px-4 lg:px-4">
        <div className="text-white text-3xl font-bold">
          <a href="/">
            <Image
              width={100}
              height={100}
              src="/logo/foodhub.png"
              alt="logo"
              className="h-auto max-w-xs md:max-w-sm lg:max-w-md"
            />
          </a>
        </div>
        <div
          className={`lg:flex flex-grow items-center justify-center ${
            isMobileMenuOpen ? "" : "hidden"
          }`}
        >
          <div className="flex items-center font-normal">
            <a
              href="/"
              className="text-base font-semibold px-4 cursor-pointer hover:font-bold hover:text-yellow-700 text-white transition-colors duration-300"
            >
              Home
            </a>
            <div className="relative" ref={serviceMenuRef}>
              <a
                onClick={toggleServiceMenu}
                className="text-base font-semibold px-4 cursor-pointer hover:font-bold hover:text-yellow-700 text-white transition-colors duration-300 flex items-center"
              >
                Menu
                <svg
                  className={`ml-1 h-5 w-5 transition-transform duration-300 ${
                    isServiceMenuOpen ? "transform rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </a>
              {isServiceMenuOpen && (
                <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-md shadow-lg py-1 z-20">
                  <a
                    href="/Home/Menu/Kapampangan"
                    className="block px-4 py-2 text-sm text-gray-800 font-semibold hover:bg-yellow-600 hover:text-white"
                  >
                    Kapampangan
                  </a>
                  <a
                    href="/Home/Menu/Tagalog"
                    className="block px-4 py-2 text-sm text-gray-800 font-semibold hover:bg-yellow-600 hover:text-white"
                  >
                    Tagalog
                  </a>
                  <a
                    href="/Home/Menu/Ilocano"
                    className="block px-4 py-2 text-sm text-gray-800 font-semibold hover:bg-yellow-600 hover:text-white"
                  >
                    Ilocano
                  </a>
                  <a
                    href="/Home/Menu/Bicolano"
                    className="block px-4 py-2 text-sm text-gray-800 font-semibold hover:bg-yellow-600 hover:text-white"
                  >
                    Bicolano
                  </a>
                </div>
              )}
            </div>
            <a
              href="/Home/About"
              className="text-base font-semibold px-4 cursor-pointer hover:font-bold hover:text-yellow-700 text-white transition-colors duration-300"
            >
              About
            </a>
          </div>
        </div>
        <div className="lg:flex justify-end text-end hidden">
          <a
            href="/Home/Contact"
            className="text-sm text-white font-normal px-6 py-2 rounded bg-yellow-600 hover:bg-yellow-700 cursor-pointer transition-colors duration-300"
          >
            Contact Us
          </a>
        </div>
        <div
          className={`flex lg:hidden items-center ${
            isMobileMenuOpen ? "hidden" : ""
          }`}
        >
          <button
            className="text-yellow-600 px-4 py-2"
            onClick={toggleMobileMenu}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-0 left-0 z-50 w-full h-screen bg-yellow-700 flex flex-col justify-center items-center">
            <button
              className="absolute top-0 right-0 m-4 text-white hover:text-gray-200"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <div className="flex flex-col gap-5 items-center">
              <a
                href="/"
                className="px-4 text-white hover:bg-yellow-700 hover:text-white p-4 w-full font-normal text-center transition-colors duration-300"
              >
                Home
              </a>
              <div className="relative w-full text-center" ref={serviceMenuRef}>
                <a
                  onClick={toggleServiceMenu}
                  className="px-4 text-white hover:bg-yellow-700 hover:text-white p-4 w-full font-normal text-center transition-colors duration-300 cursor-pointer flex justify-center items-center"
                >
                  Menu
                  <svg
                    className={`ml-1 h-5 w-5 transition-transform duration-300 ${
                      isServiceMenuOpen ? "transform rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    ></path>
                  </svg>
                </a>
                {isServiceMenuOpen && (
                  <div className="absolute mt-2 w-32 bg-white border border-gray-200 rounded-md shadow-lg py-1 z-20 font-tight">
                    <a
                      href="/Home/Menu/Kapampangan"
                      className="block px-4 py-2 text-sm text-black font-semibold hover:bg-yellow-600 hover:text-gray-200"
                    >
                      Kapampangan
                    </a>
                    <a
                      href="/Home/Menu/Tagalog"
                      className="block px-4 py-2 text-sm text-black font-semibold hover:bg-yellow-600 hover:text-gray-200"
                    >
                      Tagalog
                    </a>
                    <a
                      href="/Home/Menu/Ilocano"
                      className="block px-4 py-2 text-sm text-black font-semibold hover:bg-yellow-600 hover:text-gray-200"
                    >
                      Ilocano
                    </a>
                    <a
                      href="/Home/Menu/Bicolano"
                      className="block px-4 py-2 text-sm text-black font-semibold hover:bg-yellow-600 hover:text-gray-200"
                    >
                      Bicolano
                    </a>
                  </div>
                )}
              </div>
              <a
                href="/Home/About"
                className="px-4 text-white hover:bg-yellow-700 hover:text-white p-4 w-full font-normal text-center transition-colors duration-200"
              >
                About
              </a>
            </div>
            <a
              href="/Home/Contact"
              className="px-6 py-2 text-white bg-yellow-600 hover:bg-yellow-700 rounded cursor-pointer transition-colors duration-300"
            >
              Contact Us
            </a>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
