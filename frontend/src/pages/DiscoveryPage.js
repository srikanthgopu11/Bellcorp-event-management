import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const DiscoveryPage = () => {
    const [events, setEvents] = useState([]);
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEvents = async () => {
            setLoading(true);
            try {
                // Fetching events from backend with query parameters for Search and Category
                const { data } = await axios.get(`http://localhost:5000/api/events?search=${search}&category=${category}`);
                setEvents(data);
            } catch (error) {
                console.error("Error fetching events:", error);
            }
            setLoading(false);
        };
        fetchEvents();
    }, [search, category]); // Re-run whenever search text or category changes

    return (
        <div className="container">
            <header style={{ marginBottom: '40px' }}>
                <h1 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>Explore Events</h1>
                <p style={{ color: '#666' }}>Find and register for the best events happening around the world.</p>
            </header>

            {/* Filter Section */}
            <div className="filter-bar">
                <input 
                    type="text" 
                    placeholder="🔍 Search events by name..." 
                    className="search-input"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)} 
                    style={{ flex: 3, padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }}
                />
                <select 
                    onChange={(e) => setCategory(e.target.value)} 
                    style={{ flex: 1, padding: '12px', borderRadius: '8px', border: '1px solid #ddd', cursor: 'pointer' }}
                >
                    <option value="">📂 All Categories</option>
                    <option value="Technology">Technology</option>
                    <option value="Entertainment">Entertainment</option>
                    <option value="Business">Business</option>
                    <option value="Art">Art</option>
                    <option value="Health">Health</option>
                    <option value="Food">Food</option>
                    <option value="Sports">Sports</option>
                </select>
            </div>

            {/* Loading State */}
            {loading ? (
                <div style={{ textAlign: 'center', marginTop: '50px' }}>
                    <h3>Loading awesome events...</h3>
                </div>
            ) : (
                <div className="event-grid">
                    {events.length > 0 ? (
                        events.map(event => (
                            <div key={event._id} className="event-card">
                                {/* Event Image */}
                                <img 
                                    src={event.imageUrl || 'https://via.placeholder.com/400x200?text=Event+Image'} 
                                    className="event-img" 
                                    alt={event.name} 
                                />
                                
                                <div className="event-content">
                                    {/* Category Tag */}
                                    <span className="category-tag">{event.category}</span>
                                    
                                    <h3 style={{ marginTop: '10px', fontSize: '1.25rem' }}>{event.name}</h3>
                                    
                                    <p style={{ margin: '8px 0', fontSize: '0.9rem', color: '#555' }}>
                                        📍 {event.location}
                                    </p>
                                    
                                    <p style={{ margin: '8px 0', fontSize: '0.9rem', color: '#555' }}>
                                        📅 {new Date(event.date).toLocaleDateString('en-US', {
                                            weekday: 'short',
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}
                                    </p>
                                    
                                    <p style={{ marginBottom: '15px', fontWeight: '600', color: event.capacity - event.registeredCount > 0 ? '#10b981' : '#ef4444' }}>
                                        {event.capacity - event.registeredCount > 0 
                                            ? `🎟️ ${event.capacity - event.registeredCount} Seats Left` 
                                            : '🚫 Sold Out'}
                                    </p>

                                    {/* Action Button */}
                                    <Link to={`/event/${event._id}`} style={{ textDecoration: 'none' }}>
                                        <button>
                                            View Details
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '50px' }}>
                            <p style={{ fontSize: '1.2rem', color: '#888' }}>No events found matching your search.</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default DiscoveryPage;