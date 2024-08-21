const express = require("express");
const router = express.Router();
const {
  getReservations,
  getReservationById,
  createReservation,
  updateReservation,
  deleteReservation,
} = require("../../controllers/Reservations/RezervationController");

router.get("/getReservations", getReservations);
router.get("/getReservationById/:id", getReservationById);
router.post("/createReservation", createReservation);
router.put("/updateReservation/:id", updateReservation);
router.delete("/deleteReservation/:id", deleteReservation);

module.exports = router;
