import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppDispatch } from '../store';
import { createStory } from '../../features/storySlice';  // Убедитесь, что путь правильный

const AddStoryPage = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Делаем dispatch и ждём его выполнения
      await dispatch(createStory({ title, content })).unwrap();
      navigate('/'); // Навигация после успешного добавления
    } catch (error) {
      console.error('Error creating story:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Add New Story</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="input input-bordered w-full mb-4"
          required
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="textarea textarea-bordered w-full mb-4"
          required
        />
        <button type="submit" className="btn btn-primary w-full">Add Story</button>
      </form>
    </div>
  );
};

export default AddStoryPage;