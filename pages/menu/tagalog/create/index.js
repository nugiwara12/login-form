import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ModalMenu from "../../../../components/Modal/ModalMenu";

const TagalogMenu = () => {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    rating: "",
    image: null,
  });

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setFormData({
      ...formData,
      image: file,
    });
  };

  const onSubmit = async () => {
    const { name, price, description, rating, image } = formData;

    setLoading(true);

    try {
      // Upload image to Cloudinary
      const formDataToSend = new FormData();
      formDataToSend.append("file", image);
      formDataToSend.append("upload_preset", "tagalogPreset");

      const uploadResponse = await fetch(
        "https://api.cloudinary.com/v1_1/dv7ojcako/image/upload",
        {
          method: "POST",
          body: formDataToSend,
        }
      );

      if (!uploadResponse.ok) {
        throw new Error("Image Upload Failed");
      }

      const imageData = await uploadResponse.json();
      const imageUrl = imageData.secure_url;

      // Send menu data to your API
      const tagalogData = {
        name,
        price: String(price), // Ensure price is sent as a string
        description,
        rating: String(rating), // Ensure rating is sent as a string,
        image: imageUrl,
      };

      const response = await fetch("http://localhost:3000/api/tagalog", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(tagalogData), // Use tagalogData
      });

      if (response.ok) {
        setLoading(false);
        toast.success("Data saved successfully!", {
          autoClose: 2000,
        });
        toggleModal(); // Close modal on successful submission
      } else {
        throw new Error("Failed to save data.");
      }
    } catch (error) {
      console.error("Error:", error);
      setLoading(false);
      toast.error("Failed to save data.");
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="max-w-md mx-auto">
        <button
          onClick={toggleModal}
          className="text-white bg-yellow-700 hover:bg-yellow-600 focus:ring-4 focus:outline-none focus:ring-yellow-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:focus:ring-yellow-800 inline-flex items-center"
        >
          Create Menu
        </button>
        <ModalMenu
          isOpen={showModal}
          onClose={toggleModal} // Pass toggleModal as onClose
          onSubmitForm={onSubmit}
          onImageUpload={handleImageUpload}
          onChange={handleInputChange}
          formData={formData}
          isLoading={loading}
        />
      </div>
    </>
  );
};

export default TagalogMenu;
