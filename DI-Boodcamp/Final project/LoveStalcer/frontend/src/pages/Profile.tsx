import React, { useEffect, useState, ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfile, updateProfile } from "../slices/profileSlice";
import type { RootState, AppDispatch } from "../store";
import { Link } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

const Profile = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { profile, loading, error } = useSelector(
    (state: RootState) => state.profile
  );

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState<number | "">("");
  const [bio, setBio] = useState("");
  const [photos, setPhotos] = useState<string[]>([]);
  const [uploadingPhotos, setUploadingPhotos] = useState(false);
  const [isFormMinimized, setIsFormMinimized] = useState(false);

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  useEffect(() => {
    if (profile) {
      setUsername(profile.username ?? "");
      setEmail(profile.email ?? "");
      setGender(profile.gender ?? "");
      setAge(profile.age ?? "");
      setBio(profile.bio ?? "");
      setPhotos(profile.photos ?? []);
    }
  }, [profile]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!profile?.id) {
      alert("Profile not loaded");
      return;
    }

    dispatch(
      updateProfile({
        id: profile.id,
        fields: { username, email, gender, age: Number(age), bio },
      })
    );
  };

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !profile?.id) return;

    const files = e.target.files;
    const formData = new FormData();

    for (let i = 0; i < Math.min(files.length, 5); i++) {
      formData.append("photos", files[i]);
    }

    setUploadingPhotos(true);
    try {
      const response = await fetch(
        `${API_URL}/users/profile/${profile.id}/photos`,
        {
          method: "POST",
          body: formData,
          credentials: "include",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Error loading photo");
        return;
      }

      alert("Photos uploaded successfully!");
      await dispatch(fetchProfile());
    } catch {
      alert("Error loading photo");
    } finally {
      setUploadingPhotos(false);
      e.target.value = "";
    }
  };

  const handleDeletePhoto = async (photoUrl: string) => {
    if (!profile?.id) return;
    if (!confirm("Delete photo?")) return;

    const publicId = photoUrl.split("/").slice(-1)[0].split(".")[0];

    try {
      const response = await fetch(
        `${API_URL}/users/profile/${profile.id}/photos/${publicId}`,
        {
          method: "DELETE",
          credentials: "include",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Delete error");
        return;
      }

      alert("Photo deleted");
      await dispatch(fetchProfile());
    } catch {
      alert("Error delete photo");
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 border rounded shadow-md">
      <h2 className="text-2xl mb-4 flex justify-between items-center">
         Profile
        <button
          onClick={() => setIsFormMinimized(!isFormMinimized)}
          className="text-sm bg-gray-200 px-2 py-1 rounded hover:bg-gray-300 transition"
        >
          {isFormMinimized ? "Maximize" : "Minimize"}
        </button>
      </h2>

      {loading && <p>Loading profile...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {profile && (
        <>
          <div
            className={`transition-all duration-1000 ease-in overflow-hidden ${
              isFormMinimized ? "max-h-0 opacity-0" : "max-h-[2000px] opacity-100"
            }`}
          >
            <form onSubmit={handleSubmit}>
              <div className="mb-2">
                <label className="block mb-1">Username</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-3 py-2 border rounded"
                  required
                />
              </div>

              <div className="mb-2">
                <label className="block mb-1">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border rounded"
                  required
                />
              </div>

              <div className="mb-2">
                <label className="block mb-1">Gender</label>
                <input
                  type="text"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="w-full px-3 py-2 border rounded"
                />
              </div>

              <div className="mb-2">
                <label className="block mb-1">Age</label>
                <input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(Number(e.target.value))}
                  className="w-full px-3 py-2 border rounded"
                />
              </div>

              <div className="mb-4">
                <label className="block mb-1">About</label>
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="w-full px-3 py-2 border rounded"
                  rows={3}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-green-600 text-white py-2 rounded disabled:opacity-50"
              >
                {loading ? "Saving..." : "Save changes"}
              </button>
            </form>

            <hr className="my-6" />

            <div>
              <h3 className="text-xl mb-2">Your photos</h3>
              <div className="flex flex-wrap gap-2 mb-4">
                {photos.length > 0 ? (
                  photos.map((url, i) => (
                    <div key={i} className="relative w-24 h-24">
                      <img
                        src={url}
                        alt={`User photo ${i + 1}`}
                        className="w-full h-full object-cover rounded"
                      />
                      <button
                        onClick={() => handleDeletePhoto(url)}
                        className="absolute top-0 right-0 bg-red-600 text-white text-xs px-1 rounded-bl"
                      >
                        ✕
                      </button>
                    </div>
                  ))
                ) : (
                  <p>"Photos not uploaded.</p>
                )}
              </div>

              <label className="block mb-2 font-medium">
                Upload photo (max. 5)
              </label>

              <label
                htmlFor="file-upload"
                className="inline-block px-4 py-2 mb-4 bg-blue-500 text-white rounded shadow cursor-pointer
                 hover:bg-blue-600 transition duration-300 ease-in-out select-none text-sm"
              >
                Select photo
              </label>

              <input
                id="file-upload"
                type="file"
                multiple
                accept="image/jpeg,image/png"
                onChange={handleFileChange}
                disabled={uploadingPhotos}
                className="hidden"
              />
              {uploadingPhotos && <p>Loading photo...</p>}
            </div>
          </div>

          <div className="mt-6 flex flex-row justify-center gap-4">
            <Link
              to="/feed"
              className="px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700 transition duration-300 ease-in-out"
            >
              Swipe Party
            </Link>

            <Link
              to="/matches"
              className="px-4 py-2 bg-pink-600 text-white rounded shadow hover:bg-pink-700 transition duration-300 ease-in-out"
            >
              My Matches
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;