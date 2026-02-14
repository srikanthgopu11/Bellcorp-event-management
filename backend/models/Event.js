const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    name: { type: String, required: true },
    organizer: String,
    location: String,
    date: Date,
    description: String,
    capacity: Number,
    registeredCount: { type: Number, default: 0 },
    category: String,
    imageUrl: String
});

module.exports = mongoose.model('Event', eventSchema);