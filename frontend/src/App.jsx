import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Projects from './pages/Project';
import Contact from './pages/Contact';
import Navbar from './components/Navbar';
import AdminProject from './pages/AdminProjects';
import Footer from './components/Footer'; 
import Certifications from './pages/certifications';


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/admin" element={<AdminProject />} />
        <Route path="/certifications" element={<Certifications />} />
      </Routes>
      <Footer /> {/* ✅ Moved outside Routes */}
    </Router>
  );
}

export default App;
