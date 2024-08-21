const { getRepository } = require("typeorm");
const TourSettings = require("../../models/ToursAndActivities/TourSettingsModel");
const Tour = require("../../models/ToursAndActivities/TourModel");

class TourSettingsController {
  // async createTourSettings(req, res) {
  //   const tourSettingsRepository = getRepository(TourSettings);
  //   try {
  //     const newTourSettings = tourSettingsRepository.create(req.body);
  //     const savedTourSettings = await tourSettingsRepository.save(
  //       newTourSettings
  //     );
  //     res.status(201).json(savedTourSettings);
  //   } catch (error) {
  //     res.status(400).json({ message: error.message });
  //   }
  // }

  // async function createTourSettings(req, res) {
  //   const { tourId, ...data } = req.body;

  //   try {
  //     const tourRepository = getRepository(Tour);
  //      const tourSettingsRepository = getRepository(TourSettings);

  //     const tour = await tourRepository.findOne({ where: { id: tourId } });
  //     if (!tour) {
  //         return res.status(404).json({ message: "Tour not found" });
  //     }

  //     const tourSettings = tourSettingsRepository.create({
  //          ...data,
  //         tour,
  //     });

  //     const savedTourSettings = await tourSettingsRepository.save(tourSettings);

  //       // Update the Tour entity to link to the TourSettings
  //     tour.tourSettings = savedTourSettings;
  //     await tourRepository.save(tour);

  //     return res.status(201).json(savedTourSettings);
  //   } catch (error) {
  //       console.error("Error:", error.message);
  //       return res.status(500).json({ message: error.message });
  //   }
  // }

  async createTourSettings(req, res) {
    const { tourId, ...data } = req.body;

    try {
      const tourRepository = getRepository(Tour);
      const tourSettingsRepository = getRepository(TourSettings);

      const tour = await tourRepository.findOne({ where: { id: tourId } });
      if (!tour) {
        return res.status(404).json({ message: "Tour not found" });
      }

      const tourSettings = tourSettingsRepository.create({
        ...data,
        tour,
      });

      const savedTourSettings = await tourSettingsRepository.save(tourSettings);

      // Update the Tour entity to link to the TourSettings
      tour.tourSettings = savedTourSettings;
      await tourRepository.save(tour);

      return res.status(201).json(savedTourSettings);
    } catch (error) {
      console.error("Error:", error.message);
      return res.status(500).json({ message: error.message });
    }
  }

  async getTourSettings(req, res) {
    const tourSettingsRepository = getRepository(TourSettings);
    try {
      const tourSettings = await tourSettingsRepository.find();
      res.status(200).json(tourSettings);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async getTourSettingsById(req, res) {
    const tourSettingsRepository = getRepository(TourSettings);
    try {
      const tourSettings = await tourSettingsRepository.findOne(req.params.id);
      if (tourSettings) {
        res.status(200).json(tourSettings);
      } else {
        res.status(404).json({ message: "TourSettings not found" });
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async updateTourSettings(req, res) {
    const tourSettingsRepository = getRepository(TourSettings);
    try {
      const tourSettings = await tourSettingsRepository.findOne(req.params.id);
      if (tourSettings) {
        tourSettingsRepository.merge(tourSettings, req.body);
        const updatedTourSettings = await tourSettingsRepository.save(
          tourSettings
        );
        res.status(200).json(updatedTourSettings);
      } else {
        res.status(404).json({ message: "TourSettings not found" });
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async deleteTourSettings(req, res) {
    const tourSettingsRepository = getRepository(TourSettings);
    try {
      const result = await tourSettingsRepository.delete(req.params.id);
      if (result.affected) {
        res.status(200).json({ message: "TourSettings deleted successfully" });
      } else {
        res.status(404).json({ message: "TourSettings not found" });
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}

module.exports = new TourSettingsController();
