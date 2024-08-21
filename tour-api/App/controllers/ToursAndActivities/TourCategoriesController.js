const { getRepository } = require("typeorm");
const TourCategory = require("../../models/ToursAndActivities/TourCategoriesModel");

class TourCategoryController {
  async createTourCategory(req, res) {
    const tourCategoryRepository = getRepository(TourCategory);
    try {
      const newTourCategory = tourCategoryRepository.create(req.body);
      const savedTourCategory = await tourCategoryRepository.save(
        newTourCategory
      );
      res.status(201).json(savedTourCategory);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async getTourCategories(req, res) {
    const tourCategoryRepository = getRepository(TourCategory);
    try {
      const tourCategories = await tourCategoryRepository.find();
      res.status(200).json(tourCategories);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async getTourCategoryById(req, res) {
    const tourCategoryRepository = getRepository(TourCategory);
    try {
      const tourCategory = await tourCategoryRepository.findOne(req.params.id);
      if (tourCategory) {
        res.status(200).json(tourCategory);
      } else {
        res.status(404).json({ message: "TourCategory not found" });
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async updateTourCategory(req, res) {
    const tourCategoryRepository = getRepository(TourCategory);
    try {
      const tourCategory = await tourCategoryRepository.findOne(req.params.id);
      if (tourCategory) {
        tourCategoryRepository.merge(tourCategory, req.body);
        const updatedTourCategory = await tourCategoryRepository.save(
          tourCategory
        );
        res.status(200).json(updatedTourCategory);
      } else {
        res.status(404).json({ message: "TourCategory not found" });
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async deleteTourCategory(req, res) {
    const tourCategoryRepository = getRepository(TourCategory);
    try {
      const result = await tourCategoryRepository.delete(req.params.id);
      if (result.affected) {
        res.status(200).json({ message: "TourCategory deleted successfully" });
      } else {
        res.status(404).json({ message: "TourCategory not found" });
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}

module.exports = new TourCategoryController();
