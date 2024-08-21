const express = require("express");
const router = express.Router();
const {
  getTours,
  getTourById,
  createTour,
  updateTour,
  deleteTour,
} = require("../../controllers/ToursAndActivities/TourController");
const TourBroadcastController = require("../../controllers/ToursAndActivities/TourBroadcastController");
const TourExtensionController = require("../../controllers/ToursAndActivities/TourExtensionController");

const {
  uploadImage,
  getImage,
  uploadMiddleware,
} = require("../../controllers/ToursAndActivities/TourGalleryController");

const {
  createTourDetail,
  getTourDetailById,
  updateTourDetail,
  deleteTourDetail,
  getTourDetailS,
} = require("../../controllers/ToursAndActivities/tourDetailController");

const TourGeneralInfoController = require("../../controllers/ToursAndActivities/TourGeneralInfoController");
const TourSettingsController = require("../../controllers/ToursAndActivities/TourSettingsController");

//----------------------------------------------------------------------------------
//TOURS
router.get("/getTours", getTours);
router.get("/getTourById/:id", getTourById);
router.post("/createTour", createTour);
router.put("/updateTour/:id", updateTour);
router.delete("/deleteTour/:id", deleteTour);

//TOURBROADCAST
router.post(
  "/createTourBroadcast",
  TourBroadcastController.createTourBroadcast
);
router.get("/getTourBroadcasts", TourBroadcastController.getTourBroadcasts);
router.get(
  "/getTourBroadcastById/:id",
  TourBroadcastController.getTourBroadcastById
);
router.put(
  "/updateTourBroadcast/:id",
  TourBroadcastController.updateTourBroadcast
);
router.delete(
  "/deleteTourBroadcast/:id",
  TourBroadcastController.deleteTourBroadcast
);

//TOURDETAILS
router.post("/tourDetails", createTourDetail);
router.get("/tourDetails/:id", getTourDetailById);
router.put("/tourDetails/:id", updateTourDetail);
router.delete("/tourDetails/:id", deleteTourDetail);
router.get("/getTourDetailS", getTourDetailS);

//TOUREXTENSİON
router.post(
  "/createTourExtension",
  TourExtensionController.createTourExtension
);
router.get("/getTourExtensions", TourExtensionController.getTourExtensions);
router.get("/getTourExtension/:id", TourExtensionController.getTourExtension);
router.put(
  "/updateTourExtension/:id",
  TourExtensionController.updateTourExtension
);
router.delete(
  "/deleteTourExtension/:id",
  TourExtensionController.deleteTourExtension
);

//TOURGALERIES
router.get("/images/:id", getImage);
router.post("/upload", uploadMiddleware, uploadImage);

//TOURGENERALINFO
router.get("/getAllTourGeneralInfo", TourGeneralInfoController.getAll);
router.get("/getByIdTourGeneralInfo/:id", TourGeneralInfoController.getById);
router.post("/createTourGeneralInfo", TourGeneralInfoController.create);
router.put("/updateTourGeneralInfo/:id", TourGeneralInfoController.update);
router.delete("/deleteTourGeneralInfo/:id", TourGeneralInfoController.delete);

//TOURSETTINGS
router.post("/createTourSettings", TourSettingsController.createTourSettings);
router.get("/getTourSettings", TourSettingsController.getTourSettings);
router.get(
  "/getTourSettingsById/:id",
  TourSettingsController.getTourSettingsById
);
router.put(
  "/updateTourSettings/:id",
  TourSettingsController.updateTourSettings
);
router.delete(
  "/deleteTourSettings/:id",
  TourSettingsController.deleteTourSettings
);

module.exports = router;
