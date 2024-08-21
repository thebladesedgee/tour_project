const express = require("express");
const router = express.Router();
const {
  getParticipants,
  getParticipantById,
  createParticipant,
  updateParticipant,
  deleteParticipant,
} = require("../../controllers/Reservations/ParticipantControler");

router.get("/getParticipants", getParticipants);
router.get("/getParticipantsById/:id", getParticipantById);
router.post("/createParticipants", createParticipant);
router.put("/updateParticipants/:id", updateParticipant);
router.delete("/deleteParticipants/:id", deleteParticipant);

module.exports = router;
