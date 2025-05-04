const express = require("express");
const router = express.Router();
const {
    getAllCountries,
    getStatesByCountry,
    getCitiesByState,
  } = require("../controller/locationController");

router.get("/countries", getAllCountries);
router.get("/states/:countryId", getStatesByCountry);
router.get("/cities/:stateId", getCitiesByState);

module.exports = router;
