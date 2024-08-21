const express = require("express");
const router = express.Router();
const {
  getOffers,
  getOfferById,
  createOffer,
  updateOffer,
  deleteOffer,
} = require("../../controllers/Offers/offersController");

router.get("/getOffers", getOffers);
router.get("/getOfferById/:id", getOfferById);
router.post("/createOffer", createOffer);
router.put("/updateOffer/:id", updateOffer);
router.delete("/deleteOffer/:id", deleteOffer);

module.exports = router;
