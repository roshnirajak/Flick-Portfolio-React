import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';
import './App.css';
import HomePage from './components/HomePage';
import AboutPage from './components/AboutPage';
import PortfolioPage from './components/PortfolioPage';
import ContactPage from './components/ContactPage';


function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <Router>
      <div>
        <nav className="navbar">
          <div className="menu-icon" onClick={toggleMenu}>
            &#9776;
          </div>
          <div className={`navbar-links ${menuOpen ? 'active' : ''}`}>
            <NavLink to='/home' activeClassName="active">Home</NavLink>
            <NavLink to='/about' activeClassName="active">About</NavLink>
            <NavLink to='/portfolio' activeClassName="active">Portfolio</NavLink>
            <NavLink to='/contact' activeClassName="active">Contact</NavLink>
          </div>
        </nav>
        <Routes>
          <Route path='/home' element={<HomePage />} />
          <Route path='/about' element={<AboutPage />} />
          <Route path='/portfolio' element={<PortfolioPage />} />
          <Route path='/contact' element={<ContactPage />} />
          <Route path='/' element={<HomePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
