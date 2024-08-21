const express = require("express");
const router = express.Router();
const {
  getAgencies,
  getAgencyById,
  createAgency,
  updateAgency,
  deleteAgency,
} = require("../../controllers/GeneralSettings/agencyController");

router.get("/getAgencies", getAgencies);
router.get("/getAgencyById/:id", getAgencyById);
router.post("/createAgency", createAgency);
router.put("/updateAgency/:id", updateAgency);
router.delete("/deleteAgency/:id", deleteAgency);

module.exports = router;
