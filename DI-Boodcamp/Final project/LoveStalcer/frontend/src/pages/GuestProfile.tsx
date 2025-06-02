import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchGuestProfile } from "../slices/guestProfileSlice";
import type { RootState, AppDispatch } from "../store";

const GuestProfile = () => {
  const { userId } = useParams<{ userId: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const { profile, loading, error } = useSelector(
    (state: RootState) => state.guestProfile
  );

  useEffect(() => {
    if (userId) dispatch(fetchGuestProfile(Number(userId)));
  }, [dispatch, userId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;
  if (!profile) return <p>Profile not found</p>;

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-4">
        {profile.username}
      </h2>
      <p className="text-center text-gray-600 mb-6">{profile.age} years old</p>

      <div className="carousel w-full h-[550px] mb-6 relative rounded-lg overflow-hidden shadow-lg">
        {profile.photos.map((photoUrl, index) => (
          <div
            key={index}
            id={`slide${index}`}
            className="carousel-item relative w-full h-full"
          >
            <img
              src={photoUrl}
              alt={`Фото ${index + 1}`}
              className="w-full h-full object-contain"
            />
            {/* Навигация */}
            <div className="absolute flex justify-between items-center top-1/2 transform -translate-y-1/2 left-2 right-2">
              <a
                href={`#slide${index === 0 ? profile.photos.length - 1 : index - 1}`}
                className="btn btn-circle bg-black bg-opacity-40 hover:bg-opacity-70 text-white border-none w-12 h-12 flex items-center justify-center"
                style={{ backdropFilter: "blur(6px)" }}
              >
                ❮
              </a>
              <a
                href={`#slide${(index + 1) % profile.photos.length}`}
                className="btn btn-circle bg-black bg-opacity-40 hover:bg-opacity-70 text-white border-none w-12 h-12 flex items-center justify-center"
                style={{ backdropFilter: "blur(6px)" }}
              >
                ❯
              </a>
            </div>
          </div>
        ))}
      </div>

      <div
        className="mx-auto rounded-lg p-6 shadow-lg backdrop-blur-md bg-white/30 border border-white/40"
        style={{ maxWidth: "100%" }}
      >
        <h3 className="text-xl font-semibold mb-3">About</h3>
        <p className="text-gray-700 whitespace-pre-wrap">{profile.bio}</p>
      </div>
    </div>
  );
};

export default GuestProfile;