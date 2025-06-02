import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../store";
import { Link } from "react-router-dom";
import GeoLocationIndicator from "../pages/GeoLocationIndicator";
import { useAppDispatch } from "../hooks";
import { sendLocation } from "../slices/locationSlice";

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
    <div className="min-h-screen flex flex-col items-center justify-center space-y-6">
      <GeoLocationIndicator />
      {isAuthenticated && user ? (
        <div className="p-20 border-2 rounded shadow-lg text-center max-w-sm">
          <h2 className="text-2xl mb-[21px]">Welcome, {user.username}!</h2>
          <Link
            to="/profile"
            className="bg-blue-600 hover:bg-blue-700 transition-colors text-white py-1.5 px-4 rounded"
          >
            Go to Profile
          </Link>
        </div>
      ) : (
        <div className="p-6 border rounded shadow-md text-center max-w-sm">
          <h2 className="text-2xl mb-4">Register please!</h2>
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
        </div>
      )}
    </div>
  );
};

export default Home;