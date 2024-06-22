"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { BiLoaderAlt } from "react-icons/bi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Menu = () => {
  const [imageFile, setImageFile] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);

  async function onSubmit(data) {
    const raw_image = data.image[0];
    const formData = new FormData();
    setLoading(true);
    formData.append("file", raw_image);
    formData.append("upload_preset", "menuPreset");

    try {
      const uploadResponse = await fetch(
        "https://api.cloudinary.com/v1_1/dv7ojcako/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );
      if (!uploadResponse.ok) {
        throw new Error("Image Upload Failed");
      }
      const imageData = await uploadResponse.json();
      const imageUrl = imageData.secure_url;

      const contactData = { ...data, image: imageUrl };
      reset();
      setLoading(false);
      toast.success("Data saved successfully!");

      console.log(contactData);
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error("Image upload failed.");
    }
  }

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setImageFile(file);
  };

  return (
    <>
      <ToastContainer />
      <div className="max-w-md mx-auto">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Name
            </label>
            <input
              {...register("name", { required: true })}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              placeholder="Enter your name"
            />
            {errors.name && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                Name is Required
              </p>
            )}
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              {...register("email", { required: true })}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                Email is Required
              </p>
            )}
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="price"
            >
              Price
            </label>
            <input
              {...register("price", { required: true })}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="price"
              type="number"
              placeholder="Enter the price"
            />
            {errors.price && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                Price is Required
              </p>
            )}
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="image"
            >
              Upload Image
            </label>
            <input
              {...register("image", { required: true })}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="image"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
            />
            {errors.image && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                Image is Required
              </p>
            )}
          </div>
          <div className="flex items-center justify-between">
            {loading ? (
              <button
                disabled
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center"
              >
                <BiLoaderAlt className="animate-spin w-4 h-4 mr-2" />
                Create data please wait...
              </button>
            ) : (
              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center"
              >
                <span className="mr-2">Submit</span>
              </button>
            )}
          </div>
        </form>
      </div>
    </>
  );
};

export default Menu;
