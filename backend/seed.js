const mongoose = require('mongoose');
const Event = require('./models/Event');
const dotenv = require('dotenv');
dotenv.config();

mongoose.connect(process.env.MONGO_URI);

const events = [
    { name: "Global Tech Summit", organizer: "Bellcorp", location: "San Francisco", date: new Date("2026-05-15"), description: "Explore the future of AI and Robotics.", capacity: 500, category: "Technology", imageUrl: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678" },
    { name: "Digital Art Expo", organizer: "Artistic Hub", location: "New York", date: new Date("2026-08-10"), description: "Showcasing NFT and digital masterpieces.", capacity: 200, category: "Art", imageUrl: "https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8" },
    { name: "Health & Wellness Retreat", organizer: "PureLife", location: "Bali", date: new Date("2026-09-05"), description: "A 3-day yoga and meditation workshop.", capacity: 50, category: "Health", imageUrl: "https://images.unsplash.com/photo-1506126613408-eca07ce68773" },
    { name: "Startup Pitch Night", organizer: "Ventures Inc", location: "London", date: new Date("2026-06-12"), description: "Watch 10 startups fight for $1M funding.", capacity: 150, category: "Business", imageUrl: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2" },
    { name: "Cyber Security Forum", organizer: "SecureNet", location: "Washington DC", date: new Date("2026-10-22"), description: "Deep dive into the latest hacking trends.", capacity: 300, category: "Technology", imageUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b" },
    { name: "Gourmet Food Festival", organizer: "Taste buds", location: "Paris", date: new Date("2026-11-02"), description: "Sample dishes from Michelin star chefs.", capacity: 400, category: "Food", imageUrl: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1" },
    { name: "Marathon 2026", organizer: "City Sports", location: "Boston", date: new Date("2026-04-18"), description: "Join the annual 42km city run.", capacity: 2000, category: "Sports", imageUrl: "https://images.unsplash.com/photo-1452626038306-9aae5e071dd3" },
    { name: "Photography Workshop", organizer: "LensMasters", location: "Seattle", date: new Date("2026-12-05"), description: "Learn street photography from experts.", capacity: 30, category: "Art", imageUrl: "https://images.unsplash.com/photo-1452784444945-3f422708fe5e" },
    { name: "Auto Show 2026", organizer: "RevHeads", location: "Detroit", date: new Date("2026-05-30"), description: "The unveiling of new electric supercars.", capacity: 600, category: "Entertainment", imageUrl: "https://images.unsplash.com/photo-1503376780353-7e6692767b70" },
    { name: "E-Commerce Expo", organizer: "Shopify Partners", location: "Berlin", date: new Date("2026-06-25"), description: "How to scale your online business.", capacity: 250, category: "Business", imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f" },
    { name: "Jazz Under the Stars", organizer: "Smooth Vibes", location: "New Orleans", date: new Date("2026-09-15"), description: "An evening of soulful jazz music.", capacity: 120, category: "Entertainment", imageUrl: "https://images.unsplash.com/photo-1511192336575-5a79af67a629" },
    { name: "Code Hackathon", organizer: "DevCommunity", location: "Bangalore", date: new Date("2026-07-10"), description: "48 hours of non-stop coding.", capacity: 100, category: "Technology", imageUrl: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d" }
];

const seedDB = async () => {
    try {
        await Event.deleteMany({});
        await Event.insertMany(events);
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};
seedDB();