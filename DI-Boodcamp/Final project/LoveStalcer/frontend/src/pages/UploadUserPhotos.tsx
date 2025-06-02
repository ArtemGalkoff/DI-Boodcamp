import React, { useState, ChangeEvent } from 'react';


interface Props {
  userId: number;
}

const UploadUserPhotos: React.FC<Props> = ({ userId }) => {
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const files = e.target.files;
    const formData = new FormData();

    // Ограничение до 5 файлов (можно изменить)
    for (let i = 0; i < files.length && i < 5; i++) {
      formData.append('photos', files[i]);
    }

    setUploading(true);
    try {
      const response = await fetch(`/api/users/profile/${userId}/photos`, {
        method: 'POST',
        body: formData,
        credentials: 'include', // чтобы отправлять cookie если есть сессии
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || 'Ошибка загрузки фото');
        return;
      }

      alert('Photos uploaded successfully!');
      // Можно тут вызвать функцию обновления данных пользователя или обновить стейт

    } catch (error) {
      alert('Network error during photo upload');
    } finally {
      setUploading(false);
      e.target.value = ''; // сброс input
    }
  };

  return (
    <div>
      <input
        type="file"
        multiple
        accept="image/jpeg,image/png"
        onChange={handleFileChange}
        disabled={uploading}
      />
      {uploading && <p>Loading...</p>}
    </div>
  );
};

export default UploadUserPhotos;