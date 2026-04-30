const mongoose = require('mongoose');
const MenuItem = require('./models/MenuItem');
require('dotenv').config();

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/pingaara');
    console.log('Connected to DB');

    // Create a new item with varieties
    const item = new MenuItem({
      name: 'Bondas',
      description: 'Delicious fish bondas',
      category: 'Starters',
      varieties: [
        { name: 'Ghee Roast', price: 150 },
        { name: 'Sukka', price: 160 }
      ]
    });

    await item.save();
    console.log('Bondas item seeded successfully!');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedDB();
