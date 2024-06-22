"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";

const Menu = () => {
  const [imageFile, setImageFile] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  async function onSubmit(data) {
    // console.log(data);
    const raw_image = data.image[0];
    console.log(raw_image);

    const formData = new FormData();
    formData.append("file", raw_image);
    formData.append("upload_preset", "menuPreset");

    //Upload image to cloudenary
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
      console.log(imageData);
    } catch (error) {
      console.log(error);
    }

    // create a upload preset name:
    // name: menuPreset
    // cloudname: dv7ojcako
  }

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setImageFile(file);
  };

  return (
    <>
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
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Menu;
