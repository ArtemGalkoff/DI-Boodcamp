import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { fetchStories } from '../../features/storySlice';
import StoryCard from '../components/StoryCard';

const HomePage = () => {
  const dispatch = useAppDispatch();
  const { stories, loading, error } = useAppSelector((state) => state.story);

  useEffect(() => {
    dispatch(fetchStories());
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold">All Stories</h1>
      <div className="grid grid-cols-1 gap-4">
        {stories.map((story) => (
          <StoryCard key={story.id} story={story} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;