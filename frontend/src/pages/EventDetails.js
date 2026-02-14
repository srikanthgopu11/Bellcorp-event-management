import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const EventDetails = () => {
    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const [event, setEvent] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`https://bellcorp-backend-xzxj.onrender.com/api/events/${id}`).then(res => setEvent(res.data));
    }, [id]);

    const handleRegister = async () => {
        if (!user) return navigate('/login');
        try {
            const config = { headers: { Authorization: `Bearer ${user.token}` } };
            await axios.post(`http://localhost:5000/api/events/${id}/register`, {}, config);
            alert("Registered Successfully!");
            window.location.reload();
        } catch (err) {
            alert(err.response.data.message);
        }
    };

    if (!event) return <p>Loading...</p>;

    return (
        <div style={{ padding: '2rem' }}>
            <h1>{event.name}</h1>
            <p>{event.description}</p>
            <p><strong>Category:</strong> {event.category}</p>
            <p><strong>Date:</strong> {new Date(event.date).toDateString()}</p>
            {event.registeredCount >= event.capacity ? (
                <button disabled>Sold Out</button>
            ) : (
                <button onClick={handleRegister}>Register Now</button>
            )}
        </div>
    );
};
export default EventDetails;