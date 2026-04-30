const mongoose = require('mongoose');
const MenuItem = require('./models/MenuItem');
require('dotenv').config();

const migrateDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/pingaara');
    console.log('Connected to DB');

    const items = await MenuItem.find({});
    
    for (let item of items) {
      // Delete the dummy Bondas we added earlier
      if (item.name === 'Bondas' && item.description === 'Delicious fish bondas') {
        await MenuItem.deleteOne({ _id: item._id });
        continue;
      }

      // If it doesn't have varieties but has a description that looks like varieties
      if ((!item.varieties || item.varieties.length === 0) && item.description) {
        const parts = item.description.split(',');
        if (parts.length > 1 || ['Ghee Roast', 'Sukka', 'Fry'].some(v => item.description.includes(v))) {
          // It's a list of varieties
          const basePrice = item.price || 150;
          
          item.varieties = parts.map((part, index) => {
            // Give each variety a slightly different price to show the dynamic pricing
            return {
              name: part.trim(),
              price: basePrice + (index * 20)
            };
          });
          
          // Optionally, clear the description or keep it
          // item.description = 'Select your variety'; 
          
          await item.save();
          console.log(`Migrated ${item.name}`);
        }
      }
    }

    console.log('Migration complete!');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

migrateDB();
