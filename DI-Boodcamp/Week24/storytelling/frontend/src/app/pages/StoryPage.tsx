import { useParams } from 'react-router-dom';

const StoryPage = () => {
  const { id } = useParams();
  return (
    <div className="p-4">
      <h2 className="text-3xl font-bold">Story {id}</h2>
      {/* Здесь можно добавить API запрос для получения конкретной истории */}
    </div>
  );
};

export default StoryPage;