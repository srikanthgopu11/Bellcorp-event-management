import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    return (
        <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', background: '#333', color: '#fff' }}>
            <Link to="/" style={{ color: '#fff', textDecoration: 'none', fontWeight: 'bold' }}>Bellcorp Events</Link>
            <div>
                {user ? (
                    <>
                        <Link to="/dashboard" style={{ color: '#fff', marginRight: '1rem' }}>Dashboard</Link>
                        <button onClick={logout}>Logout ({user.name})</button>
                    </>
                ) : (
                    <>
                        <Link to="/login" style={{ color: '#fff', marginRight: '1rem' }}>Login</Link>
                        <Link to="/register" style={{ color: '#fff' }}>Register</Link>
                    </>
                )}
            </div>
        </nav>
    );
};
export default Navbar;