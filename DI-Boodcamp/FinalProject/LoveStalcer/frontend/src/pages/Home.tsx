import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../store";
import { Link } from "react-router-dom";
import GeoLocationIndicator from "../pages/GeoLocationIndicator";
import { useAppDispatch } from "../hooks";
import { sendLocation } from "../slices/locationSlice";
import { motion } from "framer-motion";

const Home = () => {
  const dispatch = useAppDispatch();

  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    if (navigator.geolocation && isAuthenticated) {
      dispatch(sendLocation());
    }
  }, [dispatch, isAuthenticated]);

  return (
    <div className="relative min-h-[93vh] flex flex-col items-center justify-center space-y-6 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 animate-pulse opacity-20 z-[-1]" />

      <GeoLocationIndicator />

      {isAuthenticated && user ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="p-20 border-2 rounded shadow-lg text-center max-w-sm bg-white/80 backdrop-blur-sm"
        >
          <h2 className="text-2xl font-semibold mb-[21px] text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500">Welcome, {user.username}!</h2>
          <Link
            to="/profile"
            className="bg-blue-600 hover:bg-blue-700 transition-colors text-white py-1.5 px-4 rounded"
          >
            Go to Profile
          </Link>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="p-6 border rounded shadow-md text-center max-w-sm bg-white/80 backdrop-blur-sm"
        >
          <h2 className="text-2xl font-semibold mb-4">📝 Register please!</h2>
          <p className="mb-4">
            Please{" "}
            <Link to="/login" className="text-blue-600 hover:underline">
              Login
            </Link>{" "}
            or{" "}
            <Link to="/register" className="text-blue-600 hover:underline">
              Register
            </Link>
            .
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default Home;