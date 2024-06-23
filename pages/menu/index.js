import React, { useState, useEffect } from "react";
import CreateMenu from "./kapampangan/create/index"; // Ensure this path is correct
import HomeHeader from "../../components/Navbar/HomeHeader";

const Menu = () => {
  const [menuItems, setMenuItems] = useState([]);

  const fetchMenuItems = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/menu");
      const data = await response.json();
      setMenuItems(data);
    } catch (error) {
      console.error("Error fetching menu items:", error);
    }
  };

  useEffect(() => {
    fetchMenuItems();
  }, []);

  return (
    <>
      <HomeHeader />
      <div className="container mx-auto p-4">
        <CreateMenu />
        <div className="mt-6">
          <h2 className="text-2xl font-semibold mb-4">Menu List</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {menuItems.map((item) => (
              <div key={item.id} className="bg-white shadow-md rounded-lg p-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
                <h1 className="text-xl font-semibold">{item.name}</h1>
                <h3 className="text-xl font-semibold">FoodHub</h3>
                <p className="text-gray-700">
                  $
                  {typeof item.price === "number"
                    ? item.price.toFixed(2)
                    : parseFloat(item.price).toFixed(2)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Menu;
