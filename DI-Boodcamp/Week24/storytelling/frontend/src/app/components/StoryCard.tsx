import { Link } from 'react-router-dom';

// Типизация истории
interface Story {
  id: number;
  title: string;
  content: string;
}

const StoryCard = ({ story }: { story: Story }) => {
  return (
    <div className="card p-4 shadow-lg mb-4">
      <h3 className="text-xl font-bold">{story.title}</h3>
      <p>{story.content.substring(0, 100)}...</p>
      <Link to={`/stories/${story.id}`} className="text-blue-500">Read more</Link>
    </div>
  );
};

export default StoryCard;