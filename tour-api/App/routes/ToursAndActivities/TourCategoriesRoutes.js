const express = require("express");
const TourCategoryController = require("../../controllers/ToursAndActivities/TourCategoriesController");

const router = express.Router();

// Create a new TourCategory
router.post("/createTourCategory", TourCategoryController.createTourCategory);

// Get all TourCategories
router.get("/getTourCategories", TourCategoryController.getTourCategories);

// Get a single TourCategory by ID
router.get(
  "/getTourCategoryById/:id",
  TourCategoryController.getTourCategoryById
);

// Update a TourCategory by ID
router.put(
  "/updateTourCategory/:id",
  TourCategoryController.updateTourCategory
);

// Delete a TourCategory by ID
router.delete(
  "/deleteTourCategory/:id",
  TourCategoryController.deleteTourCategory
);

module.exports = router;
