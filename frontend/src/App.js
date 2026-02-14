import './App.css'; // Add this at the top
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import DiscoveryPage from './pages/DiscoveryPage';
import EventDetails from './pages/EventDetails';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login'; // Create a simple login form using the logic from Phase 2
import Register from './pages/Register'; // Create a simple register form
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<DiscoveryPage />} />
          <Route path="/event/:id" element={<EventDetails />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
export default App;