import React, { useState, useEffect } from "react";
import Link from "next/link";
import HomeHeader from "../../../components/Navbar/HomeHeader";
import CreateMenu from "./create/index";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Footer from "../../../components/Footer/Footer";

const Menu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6); // Default items per page
  const [paginatedItems, setPaginatedItems] = useState([]);

  // Fetch menu items
  const fetchMenuItems = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/menu/");
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setMenuItems(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching menu items:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMenuItems();
  }, []);

  // Handle pagination logic
  useEffect(() => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    setPaginatedItems(menuItems.slice(indexOfFirstItem, indexOfLastItem));
  }, [currentPage, itemsPerPage, menuItems]);

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

  return (
    <>
      <div
        className="mx-auto bg-cover bg-center bg-no-repeat min-h-screen"
        style={{ backgroundImage: 'url("/logo/background.jpg")' }}
      >
        <HomeHeader />
        <div className="container mt-6">
          <div className="flex items-center justify-between">
            {/* Pagination controls */}
            <div className="flex justify-center mt-4 mb-2">
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
                  currentPage === Math.ceil(menuItems.length / itemsPerPage)
                }
                className={`px-4 py-2 ${
                  currentPage === Math.ceil(menuItems.length / itemsPerPage)
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
                  menuItems.length
                )}{" "}
                -{Math.min(currentPage * itemsPerPage, menuItems.length)} of{" "}
                {menuItems.length} items
              </span>
            </div>
            {/* End of Pagination controls */}
            <h2 className="text-white text-2xl font-semibold">Menu List</h2>
            <div className="flex justify-end items-end">
              <CreateMenu />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedItems.map((item) => (
              <Link key={item.id} href={`/menu/kapampangan/${item.id}`}>
                <div className="cursor-pointer">
                  <div className="bg-[#212121] text-white text-center shadow-md rounded-lg p-4">
                    <div className="w-full">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover rounded-md mb-4"
                      />
                    </div>
                    <div className="flex items-center justify-between sm:px-0">
                      <h1 className="text-xl font-semibold flex items-center">
                        {item.name}
                      </h1>
                      <h3 className="text-lg font-semibold text-gray-400">
                        FoodHub
                      </h3>
                    </div>
                    <p className="font-sembold">
                      ₱
                      {typeof item.price === "number"
                        ? item.price.toFixed(2)
                        : parseFloat(item.price).toFixed(2)}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
        {/* Footer Section */}
        <hr />
        <Footer />
      </div>
    </>
  );
};

export default Menu;
