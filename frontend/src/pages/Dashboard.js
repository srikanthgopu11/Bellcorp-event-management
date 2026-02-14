import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    const [myEvents, setMyEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        const fetchMyEvents = async () => {
            if (!user) return;
            try {
                const config = { headers: { Authorization: `Bearer ${user.token}` } };
                const { data } = await axios.get('http://localhost:5000/api/events/user/my-events', config);
                
                // FIX: Filter out any null entries that might come from deleted events
                const validEvents = data.filter(event => event !== null);
                setMyEvents(validEvents);
            } catch (err) {
                console.error("Error fetching registrations", err);
            }
            setLoading(false);
        };
        fetchMyEvents();
    }, [user]);

    // FIX: Added extra checks (e && e.date) to prevent the "Cannot read properties of null" error
    const upcoming = myEvents.filter(e => e && e.date && new Date(e.date) > new Date());
    const past = myEvents.filter(e => e && e.date && new Date(e.date) <= new Date());

    if (loading) return <div className="container"><h2>Loading your dashboard...</h2></div>;

    return (
        <div className="container">
            <header style={{ marginBottom: '30px' }}>
                <h1>Welcome, {user?.name}! 👋</h1>
                <p>Manage your registered events and schedules.</p>
            </header>

            <section style={{ marginBottom: '50px' }}>
                <h2 style={{ borderBottom: '2px solid #4f46e5', display: 'inline-block', marginBottom: '20px' }}>
                    📅 Upcoming Events
                </h2>
                {upcoming.length > 0 ? (
                    <div className="event-grid">
                        {upcoming.map(event => (
                            <DashboardCard key={event._id} event={event} status="Upcoming" />
                        ))}
                    </div>
                ) : (
                    <p style={{ color: '#888', fontStyle: 'italic' }}>You haven't registered for any upcoming events yet.</p>
                )}
            </section>

            <section>
                <h2 style={{ borderBottom: '2px solid #6b7280', display: 'inline-block', marginBottom: '20px', color: '#6b7280' }}>
                    ⌛ Past Events
                </h2>
                {past.length > 0 ? (
                    <div className="event-grid" style={{ opacity: 0.7 }}>
                        {past.map(event => (
                            <DashboardCard key={event._id} event={event} status="Completed" />
                        ))}
                    </div>
                ) : (
                    <p style={{ color: '#888', fontStyle: 'italic' }}>No past events found.</p>
                )}
            </section>
        </div>
    );
};

// Sub-component for the Dashboard Card
const DashboardCard = ({ event, status }) => (
    <div className="event-card">
        <img src={event.imageUrl || 'https://via.placeholder.com/300'} className="event-img" alt="event" />
        <div className="event-content">
            <span className="category-tag" style={{ background: status === 'Upcoming' ? '#d1fae5' : '#f3f4f6', color: status === 'Upcoming' ? '#065f46' : '#374151' }}>
                {status}
            </span >
            <h3 style={{ marginTop: '10px' }}>{event.name}</h3>
            <p style={{ fontSize: '0.9rem' }}>📍 {event.location}</p>
            <p style={{ fontSize: '0.9rem' }}>📅 {new Date(event.date).toDateString()}</p>
            <Link to={`/event/${event._id}`}>
                <button style={{ marginTop: '10px', background: status === 'Upcoming' ? '#4f46e5' : '#6b7280' }}>
                    View Event Details
                </button>
            </Link>
        </div>
    </div>
);

export default Dashboard;