const Country = require("../model/Country");
const State = require("../model/State");
const City = require("../model/City");

const getAllCountries = async () => {
    console.log("getAllCountries");
  return await Country.find({});
};

const getStatesByCountryId = async (countryId) => {
  return await State.find({ country: countryId });
};

const getCitiesByStateId = async (stateId) => {
  return await City.find({ state: stateId });
};

module.exports = {
  getAllCountries,
  getStatesByCountryId,
  getCitiesByStateId,
};
