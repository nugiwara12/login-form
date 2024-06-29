import React, { useState, useEffect } from "react";
import Link from "next/link";
import HomeHeader from "../../../components/Navbar/HomeHeader";
import IlocanoMenu from "./create";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Footer from "../../../components/Footer/Footer";
import { FaStar } from "react-icons/fa";

const Ilocano = () => {
  const [ilocanoItems, setIlocanoItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6); // Default items per page
  const [paginatedItems, setPaginatedItems] = useState([]);

  // Fetch menu items
  const fetchIlocanoItems = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/ilocano/");
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setIlocanoItems(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching menu items:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIlocanoItems();
  }, []);

  // Handle pagination logic
  useEffect(() => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    setPaginatedItems(ilocanoItems.slice(indexOfFirstItem, indexOfLastItem));
  }, [currentPage, itemsPerPage, ilocanoItems]);

  // Change page
  const goToPage = (page) => {
    setCurrentPage(page);
  };

  // Next page
  const nextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  // Previous page
  const prevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < rating; i++) {
      stars.push(<FaStar key={i} className="h-6 w-6 text-yellow-500" />);
    }
    return stars;
  };

  return (
    <>
      <div
        className="mx-auto bg-cover bg-center bg-no-repeat min-h-screen"
        style={{ backgroundImage: 'url("/logo/background.jpg")' }}
      >
        <HomeHeader />
        <div className="container mt-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <h2 className="text-white text-2xl font-semibold text-center md:text-left mt-4 md:mt-0">
              Ilocano Menu List
            </h2>
            <div className="flex justify-end items-end mt-4 md:mt-0">
              <IlocanoMenu />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {paginatedItems.map((ilocano) => (
              <Link key={ilocano.id} href={`/menu/ilocano/${ilocano.id}`}>
                <div className="cursor-pointer">
                  <div className="bg-[#212121] text-white text-center shadow-md rounded-lg p-4">
                    <div className="relative pb-[56.25%] h-0 overflow-hidden rounded-md mb-4">
                      <img
                        src={ilocano.image}
                        alt={ilocano.name}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <h1 className="text-xl font-semibold flex items-center">
                        {ilocano.name}
                      </h1>
                      <div className="flex justify-start items-center">
                        {renderStars(ilocano.rating)}
                      </div>
                    </div>
                    <p className="text-start font-sembold mt-2">
                      ₱
                      {typeof ilocano.price === "number"
                        ? ilocano.price.toFixed(2)
                        : parseFloat(ilocano.price).toFixed(2)}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
        {/* Pagination controls */}
        <div className="flex flex-col items-center md:flex-row md:justify-between">
          <div className="flex flex-col items-center md:items-end md:w-full mt-4 mb-2 mr-4 md:mb-0">
            <div className="bg-[#212121] flex justify-center md:justify-end mt-4 mb-2 md:mt-0 p-3 rounded-lg">
              <button
                onClick={prevPage}
                disabled={currentPage === 1}
                className={`px-4 py-2 ${
                  currentPage === 1
                    ? "text-white cursor-not-allowed"
                    : "text-white"
                } rounded mr-2`}
              >
                <FaChevronLeft />
              </button>
              <button
                onClick={nextPage}
                disabled={
                  currentPage === Math.ceil(ilocanoItems.length / itemsPerPage)
                }
                className={`px-4 py-2 ${
                  currentPage === Math.ceil(ilocanoItems.length / itemsPerPage)
                    ? "bg-yellow-700 text-white cursor-not-allowed"
                    : "text-white"
                } rounded`}
              >
                <FaChevronRight />
              </button>
              <span className="ml-4 text-white">
                Showing{" "}
                {Math.min(
                  (currentPage - 1) * itemsPerPage + 1,
                  ilocanoItems.length
                )}{" "}
                - {Math.min(currentPage * itemsPerPage, ilocanoItems.length)} of{" "}
                {ilocanoItems.length} items
              </span>
            </div>
          </div>
          {/* Other elements can be added here */}
        </div>

        {/* End of Pagination controls */}
        {/* Footer Section */}
        <hr />
        <Footer />
      </div>
    </>
  );
};

export default Ilocano;
