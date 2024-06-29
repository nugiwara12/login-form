import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import HomeHeader from "../../../components/Navbar/HomeHeader";
import { IoIosArrowRoundBack } from "react-icons/io";
import { FaStar } from "react-icons/fa";

const TagalogItemDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [tagalogItem, setTagalogItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTagalogItem = async () => {
      try {
        const response = await fetch(`/api/tagalog?id=${id}`);
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const data = await response.json();
        setTagalogItem(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching menu item:", error);
        setLoading(false);
      }
    };

    if (id) {
      fetchTagalogItem();
    }
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!tagalogItem) {
    return <div>Menu item not found</div>;
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
      <HomeHeader />
      <div
        className="mx-auto bg-cover bg-center bg-no-repeat min-h-screen"
        style={{ backgroundImage: 'url("/logo/background.jpg")' }}
      >
        <div className="container mx-auto">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex justify-center">
              <img
                src={tagalogItem.image}
                alt={tagalogItem.name}
                className="w-full h-60 sm:h-auto object-cover rounded-md mb-4"
              />
            </div>

            <div className="bg-gray-100 shadow-lg rounded-lg p-4 mt-4">
              <div className="flex items-center justify-between sm:px-0">
                <h1 className="text-2xl sm:text-3xl font-bold flex items-center">
                  <IoIosArrowRoundBack
                    className="h-10 w-10 mr-2 cursor-pointer"
                    onClick={() => router.back()}
                  />
                  <span className="sm:inline-block">{tagalogItem.name}</span>
                </h1>
                <div className="flex justify-start items-center">
                  {renderStars(tagalogItem.rating)}
                </div>
              </div>

              <div className="flex flex-col justify-center items-center sm:items-start mt-6">
                <p className="text-gray-700 text-lg mb-2">
                  <span className="text-black">₱</span>
                  {typeof tagalogItem.price === "number"
                    ? tagalogItem.price.toFixed(2)
                    : parseFloat(tagalogItem.price).toFixed(2)}
                </p>
                <div className="prose prose-sm text-black mb-4">
                  <p className="text-sm whitespace-pre-wrap">
                    {tagalogItem.description}
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

export default TagalogItemDetail;
