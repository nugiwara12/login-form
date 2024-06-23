import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { BiLoaderAlt } from "react-icons/bi";

const ModalMenu = ({
  isOpen,
  onClose,
  onSubmitForm,
  onImageUpload,
  onChange,
  formData,
  isLoading,
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmitForm();
  };

  const {
    register,
    reset,
    formState: { errors },
  } = useForm();

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-auto bg-gray-900 bg-opacity-50 flex items-center justify-center">
          <div className="relative bg-white w-full max-w-md mx-auto rounded-lg shadow-lg p-6">
            <button
              onClick={onClose}
              className="absolute top-0 right-0 m-4 text-gray-600 hover:text-gray-800 focus:outline-none"
            >
              Close
            </button>
            <h2 className="text-2xl font-semibold mb-4">Create Menu</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  {...register("name", { required: true })}
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={onChange}
                  required
                  className="mt-1 block w-full px-3 py-2 rounded-lg border border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-500 focus:ring-opacity-50"
                />
                {errors.name && (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                    Name is Required
                  </p>
                )}
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Price
                </label>
                <input
                  {...register("price", { required: true })}
                  type="text"
                  name="price"
                  value={formData.price}
                  onChange={onChange}
                  required
                  className="mt-1 block w-full px-3 py-2 rounded-lg border border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-500 focus:ring-opacity-50"
                />
                {errors.price && (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                    Price is Required
                  </p>
                )}
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Image
                </label>
                <input
                  {...register("image", { required: true })}
                  type="file"
                  name="image"
                  onChange={onImageUpload}
                  required
                  accept="image/*"
                  className="mt-1 block w-full px-3 py-2 rounded-lg border border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-500 focus:ring-opacity-50"
                />
                {errors.image && (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                    Image is Required
                  </p>
                )}
              </div>
              <div>
                {isLoading ? (
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
        </div>
      )}
    </>
  );
};

export default ModalMenu;
