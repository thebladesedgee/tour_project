const express = require("express");
const router = express.Router();
const {
  getTahsilats,
  getTahsilatById,
  createTahsilat,
  updateTahsilat,
  deleteTahsilat,
} = require("../../controllers/Accounting/tahsilatController");

router.get("/getTahsilats", getTahsilats);
router.get("/getTahsilatById/:id", getTahsilatById);
router.post("/createTahsilat", createTahsilat);
router.put("/updateTahsilat/:id", updateTahsilat);
router.delete("/deleteTahsilat/:id", deleteTahsilat);

module.exports = router;
