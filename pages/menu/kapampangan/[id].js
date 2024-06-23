import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import HomeHeader from "../../../components/Navbar/HomeHeader";
import { IoIosArrowRoundBack } from "react-icons/io";

const MenuItemDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [menuItem, setMenuItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMenuItem = async () => {
      try {
        const response = await fetch(`/api/menu?id=${id}`);
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const data = await response.json();
        setMenuItem(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching menu item:", error);
        setLoading(false);
      }
    };

    if (id) {
      fetchMenuItem();
    }
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!menuItem) {
    return <div>Menu item not found</div>;
  }

  return (
    <>
      <HomeHeader />
      <div
        className="mx-auto bg-cover bg-center bg-no-repeat min-h-screen"
        style={{ backgroundImage: 'url("/logo/background.jpg")' }}
      >
        <div className="container mx-auto">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex justify-center">
              <img
                src={menuItem.image}
                alt={menuItem.name}
                className="w-full h-60 sm:h-auto object-cover rounded-md mb-4"
              />
            </div>

            <div className="bg-white shadow-md rounded-lg p-4 mt-4">
              <div className="flex items-center justify-between sm:px-0">
                <h1 className="text-2xl sm:text-3xl font-bold flex items-center">
                  <IoIosArrowRoundBack
                    className="h-10 w-10 mr-2 cursor-pointer"
                    onClick={() => router.back()}
                  />
                  <span className="sm:inline-block">{menuItem.name}</span>
                </h1>
                <h3 className="text-lg sm:text-2xl font-semibold text-gray-400">
                  FoodHub
                </h3>
              </div>
              <div className="flex flex-col justify-center items-center sm:items-start mt-6">
                <p className="text-gray-700 text-lg mb-2">
                  ₱
                  {typeof menuItem.price === "number"
                    ? menuItem.price.toFixed(2)
                    : parseFloat(menuItem.price).toFixed(2)}
                </p>
                <div className="prose prose-sm text-gray-700 mb-4">
                  <p className="text-sm whitespace-pre-wrap">
                    {menuItem.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MenuItemDetail;
