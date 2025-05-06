import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import StoryPage from './pages/StoryPage';
import AddStoryPage from './pages/AddStoryPage';
import { Provider } from 'react-redux';
import store from './store';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <div className="container mx-auto p-4">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/stories/:id" element={<StoryPage />} />
            <Route path="/add-story" element={<AddStoryPage />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
};

export default App;