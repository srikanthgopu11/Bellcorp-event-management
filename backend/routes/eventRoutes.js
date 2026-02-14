const express = require('express');
const router = express.Router();
const Event = require('../models/Event');
const Registration = require('../models/Registration');
const { protect } = require('../middleware/authMiddleware');

// Get all events with Search/Filter
router.get('/', async (req, res) => {
    const { search, category, location } = req.query;
    let query = {};
    if (search) query.name = { $regex: search, $options: 'i' };
    if (category) query.category = category;
    if (location) query.location = location;

    const events = await Event.find(query);
    res.json(events);
});

// Get single event
router.get('/:id', async (req, res) => {
    const event = await Event.findById(req.params.id);
    res.json(event);
});

// Register for event
router.post('/:id/register', protect, async (req, res) => {
    const event = await Event.findById(req.params.id);
    const alreadyRegistered = await Registration.findOne({ userId: req.user._id, eventId: req.params.id });

    if (alreadyRegistered) return res.status(400).json({ message: "Already registered" });
    if (event.registeredCount >= event.capacity) return res.status(400).json({ message: "Event full" });

    await Registration.create({ userId: req.user._id, eventId: req.params.id });
    event.registeredCount += 1;
    await event.save();

    res.status(201).json({ message: "Registered successfully" });
});

// Get user registrations
router.get('/user/my-events', protect, async (req, res) => {
    try {
        const registrations = await Registration.find({ userId: req.user._id }).populate('eventId');
        
        // Filter out registrations where the event was deleted (eventId is null)
        const validRegistrations = registrations.filter(reg => reg.eventId !== null);
        
        // Return only the event details
        res.json(validRegistrations.map(r => r.eventId));
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
});

module.exports = router;