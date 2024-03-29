import { Routes, Route, Link } from 'react-router-dom';
import PostList from './components/PostList';
import PostForm from './components/PostForm';
import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import About from './components/About';
import NotFound from './components/NotFound';

export default function App() {
  return (
    <div className="body">
      <Header />
      <nav className="nav">
        <Link className="link" to="/">
          Home
        </Link>
        <Link className="link" to="/about">
          About
        </Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/posts" component={PostList} />
        <Route path="/create-post" component={PostForm} />
      </Routes>
    </div>
  );
}
