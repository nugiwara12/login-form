// src/components/Dashboard.js

import React, { useState, useEffect } from "react";
import { auth } from "../../firebase/firebase";
import { signOut } from "firebase/auth";
import { useRouter } from "next/router";
import HomeHeader from "../../components/Navbar/HomeHeader";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        router.push("/auth/login");
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      // No need to redirect here because the onAuthStateChanged listener will handle it
    } catch (error) {
      console.error("Error signing out:", error.message);
    }
  };

  return (
    <>
      <HomeHeader />
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Dashboard
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Welcome, {user ? user.displayName : "Guest"}!
            </p>
          </div>
          <div className="text-center mt-8">
            <button
              onClick={handleLogout}
              className="mt-4 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
