import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="p-4 bg-gray-800 text-white">
      <div className="container mx-auto">
        <Link to="/" className="text-2xl font-bold">Collaborative Storytelling</Link>
        <div className="float-right">
          <Link to="/login" className="mx-4">Login</Link>
          <Link to="/register" className="mx-4">Register</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;