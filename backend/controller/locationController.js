const {Country} = require("../model/Country");
const {State} = require("../model/State");
const {City} = require("../model/City");

 const getAllCountries = async (req, res) => {
  try {
    const countries = await Country.find({});
    res.status(200).json(countries);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch countries" });
  }
};

 const getStatesByCountry = async (req, res) => {
  try {
    const { countryId } = req.params;
    const states = await State.find({ country: countryId });
    res.status(200).json(states);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch states" });
  }
};

const getCitiesByState = async (req, res) => {
  try {
    const { stateId } = req.params;
    const cities = await City.find({ state: stateId });
    res.status(200).json(cities);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch cities" });
  }
};


module.exports = {
 
  getAllCountries,
  getStatesByCountry,
  getCitiesByState,
}