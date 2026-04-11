require('dotenv').config({ path: require('path').join(__dirname, '../.env') });

const mongoose = require('mongoose');
const connect  = require('../db/connection');
const Recipe   = require('../db/Recipe');
const recipes  = require('./recipes.json');

const seed = async () => {
  await connect();

  await Recipe.deleteMany({});
  console.log('Cleared existing recipes.');

  const inserted = await Recipe.insertMany(recipes);
  console.log(`Seeded ${inserted.length} recipes into Atlas.`);

  await mongoose.disconnect();
};

seed().catch(err => {
  console.error('Seed failed:', err.message);
  process.exit(1);
});
