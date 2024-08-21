const express = require("express");
const router = express.Router();
const {
  getOtherServices,
  getOtherServiceById,
  createOtherService,
  updateOtherService,
  deleteOtherService,
} = require("../../controllers/OtherServices/OtherServiceController");

router.get("/getOtherServices", getOtherServices);
router.get("/getOtherServiceById/:id", getOtherServiceById);
router.post("/createOtherService", createOtherService);
router.put("/updateOtherService/:id", updateOtherService);
router.delete("/deleteOtherService/:id", deleteOtherService);

module.exports = router;
