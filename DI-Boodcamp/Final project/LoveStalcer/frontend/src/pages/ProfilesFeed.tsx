import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import {
  fetchProfilesFeed,
  selectProfilesFeed,
  setFilters,
  clearFilters,
} from '../slices/profilesFeedSlice';
import { likeUser } from '../slices/matchesSlice'; 

const ProfilesFeed: React.FC = () => {
  const dispatch = useAppDispatch();
  const { filteredProfiles, loading, error, filters } = useAppSelector(selectProfilesFeed);

  const [gender, setGender] = useState(filters.gender);
  const [minAge, setMinAge] = useState(filters.minAge ?? '');
  const [maxAge, setMaxAge] = useState(filters.maxAge ?? '');

  useEffect(() => {
    dispatch(fetchProfilesFeed());
  }, [dispatch]);

  const applyFilters = () => {
    dispatch(
      setFilters({
        gender,
        minAge: minAge === '' ? null : Number(minAge),
        maxAge: maxAge === '' ? null : Number(maxAge),
      }),
    );
  };

  const resetFilters = () => {
    setGender('');
    setMinAge('');
    setMaxAge('');
    dispatch(clearFilters());
  };

  const handleLike = (profileId: number) => {
    dispatch(likeUser(profileId))
      .unwrap()
      .then((res) => {
        if (res.match) {
          alert(`It's match`);
        } else {
          alert('like was sent');
        }
      })
      .catch((err) => {
        alert('Sending like error');
      });
  };

  if (loading) {
    return <div className="text-center mt-10">Loading profiles...</div>;
  }

  if (error) {
    return <div className="text-center mt-10 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <div className="mb-6 flex flex-wrap items-center gap-3 bg-white p-3 rounded-full shadow-md max-w-xl mx-auto">
        <div className="flex flex-col">
          <label className="text-xs font-semibold mb-1 select-none">Gender</label>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="select select-bordered select-sm rounded-full w-28 cursor-pointer transition duration-200 hover:shadow-lg focus:shadow-lg focus:outline-none"
          >
            <option value="">All</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label className="text-xs font-semibold mb-1 select-none">Min age</label>
          <input
            type="number"
            min={0}
            value={minAge}
            onChange={(e) => setMinAge(e.target.value)}
            className="input input-bordered input-sm rounded-full w-20 text-center transition duration-200 hover:shadow-lg focus:shadow-lg focus:outline-none"
            placeholder="From"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-xs font-semibold mb-1 select-none">Max age</label>
          <input
            type="number"
            min={0}
            value={maxAge}
            onChange={(e) => setMaxAge(e.target.value)}
            className="input input-bordered input-sm rounded-full w-20 text-center transition duration-200 hover:shadow-lg focus:shadow-lg focus:outline-none"
            placeholder="To"
          />
        </div>

        <button
          onClick={applyFilters}
          className="btn btn-sm btn-primary rounded-full ml-2 px-6 hover:scale-105 transition-transform duration-150"
        >
          Apply
        </button>

        <button
          onClick={resetFilters}
          className="btn btn-sm btn-outline rounded-full ml-2 px-5 hover:bg-gray-100 transition-colors duration-150"
        >
          Reset
        </button>
      </div>

      {filteredProfiles.length === 0 ? (
        <div className="text-center mt-10">No profiles found.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredProfiles.map((profile) => (
            <div
              key={profile.id}
              className="card bg-base-100 shadow-md rounded-lg overflow-hidden flex flex-col"
            >
              <figure>
                <img
                  src={profile.photo1 || '/default-avatar.png'}
                  alt={profile.username}
                  className="w-full h-60 object-cover"
                  loading="lazy"
                />
              </figure>
              <div className="card-body flex flex-col flex-grow">
                <h2 className="card-title">{profile.username}</h2>
                <p>
                  Gender:{' '}
                  {profile.gender === 'male'
                    ? 'Male'
                    : profile.gender === 'female'
                    ? 'Female'
                    : 'Other'}
                </p>
                {profile.age !== undefined && <p>Age: {profile.age}</p>}
                {profile.bio && <p className="text-sm text-gray-600">{profile.bio}</p>}
                <div className="mt-auto pt-3">
                  <button
                    onClick={() => handleLike(profile.id)}
                    className="btn btn-primary btn-sm w-full"
                    type="button"
                  >
                    Match ❤️
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProfilesFeed;