require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const MenuItem = require('./models/MenuItem');

const seedData = [
  { name: 'BONDAS', description: 'Ghee Roast, Sukka', price: 15, category: 'Seafood' },
  { name: 'YETTI', description: 'Sukka, Fry, Ghee Roast', price: 20, category: 'Seafood' },
  { name: 'BANGUDE', description: 'Masala Fry, Rava Fry, Tava Fry', price: 18, category: 'Fish' },
  { name: 'BHOOTAI', description: 'Masala Fry, Rava Fry, Tava Fry', price: 16, category: 'Fish' },
  { name: 'DISCO FISH', description: 'Masala Fry, Rava Fry, Tava Fry', price: 18, category: 'Fish' },
  { name: 'NANG FISH', description: 'Masala Fry, Rava Fry, Tava Fry', price: 22, category: 'Fish' },
  { name: 'KODDAI FISH', description: 'Masala Fry, Rava Fry, Tava Fry', price: 20, category: 'Fish' },
  { name: 'VISON FISH', description: 'Masala Fry, Rava Fry, Tava Fry', price: 25, category: 'Fish' },
  { name: 'POMFRET', description: 'Masala Fry, Rava Fry, Tava Fry', price: 30, category: 'Fish' },
  { name: 'CHICKEN BIRYANI', description: 'Classic coastal style', price: 12, category: 'Chicken' },
  { name: 'CHICKEN', description: 'Sukka, Fry, 65, Ghee Roast', price: 14, category: 'Chicken' },
];

const seedDatabase = async () => {
  try {
    await connectDB();
    
    // Wipe existing
    await MenuItem.deleteMany();
    
    // Inject seedData
    await MenuItem.insertMany(seedData);
    
    console.log('Database seeded successfully! Your menu items are ready.');
    process.exit();
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedDatabase();
