const express = require("express");
const router = express.Router();
const {
  getSocialMedias,
  getSocialMediaById,
  createSocialMedia,
  updateSocialMedia,
  deleteSocialMedia,
} = require("../../controllers/GeneralSettings/socialmediaController");

router.get("/getSocialMedias", getSocialMedias);
router.get("/getSocialMediaById/:id", getSocialMediaById);
router.post("/createSocialMedia", createSocialMedia);
router.put("/updateSocialMedia/:id", updateSocialMedia);
router.delete("/deleteSocialMedia/:id", deleteSocialMedia);

module.exports = router;
