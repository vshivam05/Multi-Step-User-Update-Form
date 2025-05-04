// seedLocationData.js (CJS version)

const axios = require("axios");
const mongoose = require("mongoose");
const { Country } = require("../model/Country"); // assuming Country.js exports { Country }
const { State } = require("../model/State");
const { City } = require("../model/City");

const baseURL = "https://crio-location-selector.onrender.com";

async function seedLocationData() {
  try {
    await mongoose.connect("mongodb+srv://shivamverma:pa55word@cluster0.livpab1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");

    await Country.deleteMany();
    await State.deleteMany();
    await City.deleteMany();

    const { data: countries } = await axios.get(`${baseURL}/countries`);

    for (const country of countries) {
      const savedCountry = await new Country({ name: country }).save();
      console.log(`🌍 Inserted country: ${country}`);

      try {
        const { data: states } = await axios.get(`${baseURL}/country=${country}/states`);

        for (const state of states) {
          const savedState = await new State({
            name: state,
            country: savedCountry._id,
          }).save();
          console.log(`  📍 Inserted state: ${state}`);

          try {
            const { data: cities } = await axios.get(`${baseURL}/country=${country}/state=${state}/cities`);

            for (const city of cities) {
              await new City({ name: city, state: savedState._id }).save();
              console.log(`    🏙️ Inserted city: ${city}`);
            }
          } catch (err) {
            console.warn(`    ⚠️ Failed to fetch cities for ${state}, ${country}`);
          }
        }
      } catch (err) {
        console.warn(`  ⚠️ Failed to fetch states for ${country}`);
      }
    }

    console.log("\n✅ All location data seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  }
}

seedLocationData();
