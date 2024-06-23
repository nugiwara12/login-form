import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ModalMenu from "../../../../components/Modal/ModalMenu";
import Navbar from "../../../../components/Navbar/Navbar";

const CreateMenu = () => {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
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
    const { name, price, image } = formData;
    const formDataToSend = new FormData();
    formDataToSend.append("file", image);
    formDataToSend.append("upload_preset", "menuPreset");

    setLoading(true);

    try {
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

      const menuData = {
        name,
        price,
        image: imageUrl,
      };

      const response = await fetch("http://localhost:3000/api/menu", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(menuData),
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
          className="text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-4 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 inline-flex items-center"
        >
          Create Menu
        </button>
        <ModalMenu
          isOpen={showModal}
          onClose={toggleModal}
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

export default CreateMenu;
