import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import {
  fetchProfilesFeed,
  selectProfilesFeed,
  setFilters,
  clearFilters,
} from '../slices/profilesFeedSlice';
import { likeUser } from '../slices/matchesSlice'; // импорт экшена лайка

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

  // Обработчик клика на кнопку "Мэтч"
  const handleLike = (profileId: number) => {
    dispatch(likeUser(profileId))
      .unwrap()
      .then((res) => {
        if (res.match) {
          alert(`Это мэтч с пользователем! 🎉`);
          // Можно здесь обновить список мэтчей или показать уведомление
        } else {
          alert('Лайк отправлен');
        }
      })
      .catch((err) => {
        alert('Ошибка при отправке лайка');
      });
  };

  if (loading) {
    return <div className="text-center mt-10">Загрузка профилей...</div>;
  }

  if (error) {
    return <div className="text-center mt-10 text-red-500">Ошибка: {error}</div>;
  }

  return (
    <div className="p-4 max-w-7xl mx-auto">
      {/* Фильтр */}
      <div className="mb-6 flex flex-wrap items-center gap-3 bg-white p-3 rounded-full shadow-md max-w-xl mx-auto">
        {/* Пол */}
        <div className="flex flex-col">
          <label className="text-xs font-semibold mb-1 select-none">Пол</label>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="select select-bordered select-sm rounded-full w-28 cursor-pointer transition duration-200 hover:shadow-lg focus:shadow-lg focus:outline-none"
          >
            <option value="">Все</option>
            <option value="male">Мужской</option>
            <option value="female">Женский</option>
            <option value="other">Другой</option>
          </select>
        </div>

        {/* Мин возраст */}
        <div className="flex flex-col">
          <label className="text-xs font-semibold mb-1 select-none">Мин. возраст</label>
          <input
            type="number"
            min={0}
            value={minAge}
            onChange={(e) => setMinAge(e.target.value)}
            className="input input-bordered input-sm rounded-full w-20 text-center transition duration-200 hover:shadow-lg focus:shadow-lg focus:outline-none"
            placeholder="От"
          />
        </div>

        {/* Макс возраст */}
        <div className="flex flex-col">
          <label className="text-xs font-semibold mb-1 select-none">Макс. возраст</label>
          <input
            type="number"
            min={0}
            value={maxAge}
            onChange={(e) => setMaxAge(e.target.value)}
            className="input input-bordered input-sm rounded-full w-20 text-center transition duration-200 hover:shadow-lg focus:shadow-lg focus:outline-none"
            placeholder="До"
          />
        </div>

        <button
          onClick={applyFilters}
          className="btn btn-sm btn-primary rounded-full ml-2 px-6 hover:scale-105 transition-transform duration-150"
        >
          Применить
        </button>

        <button
          onClick={resetFilters}
          className="btn btn-sm btn-outline rounded-full ml-2 px-5 hover:bg-gray-100 transition-colors duration-150"
        >
          Сбросить
        </button>
      </div>

      {/* Список профилей */}
      {filteredProfiles.length === 0 ? (
        <div className="text-center mt-10">Профили не найдены.</div>
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
                  Пол:{' '}
                  {profile.gender === 'male'
                    ? 'Мужской'
                    : profile.gender === 'female'
                    ? 'Женский'
                    : 'Другой'}
                </p>
                {profile.age !== undefined && <p>Возраст: {profile.age}</p>}
                {profile.bio && <p className="text-sm text-gray-600">{profile.bio}</p>}
                <div className="mt-auto pt-3">
                  <button
                    onClick={() => handleLike(profile.id)}
                    className="btn btn-primary btn-sm w-full"
                    type="button"
                  >
                    Мэтч ❤️
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