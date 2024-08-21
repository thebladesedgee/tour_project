const { getRepository } = require("typeorm");
const TourBroadcast = require("../../models/ToursAndActivities/TourBrodcatsModel");
const Tour = require("../../models/ToursAndActivities/TourModel");
const TourCategory = require("../../models/ToursAndActivities/TourCategoriesModel");

class TourBroadcastController {
  async createTourBroadcast(req, res) {
    const { tourId, tourCategoryId, ...data } = req.body;

    try {
      const tourRepository = getRepository(Tour);
      const tourCategoryRepository = getRepository(TourCategory);
      const tourBroadcastRepository = getRepository(TourBroadcast);

      const tour = await tourRepository.findOne({ where: { id: tourId } });
      if (!tour) {
        return res.status(404).json({ message: "Tour not found" });
      }

      let tourCategory = null;
      if (tourCategoryId) {
        tourCategory = await tourCategoryRepository.findOne({
          where: { id: tourCategoryId },
        });
        if (!tourCategory) {
          return res.status(404).json({ message: "Tour category not found" });
        }
      }

      const tourBroadcast = tourBroadcastRepository.create({
        ...data,
        tour,
        tourCategories: tourCategory || null,
      });

      const savedTourBroadcast = await tourBroadcastRepository.save(
        tourBroadcast
      );

      // Update the Tour entity to link to the TourBroadcast
      tour.tourBroadcast = savedTourBroadcast;
      await tourRepository.save(tour);

      return res.status(201).json(savedTourBroadcast);
    } catch (error) {
      console.error("Error:", error.message);
      return res.status(500).json({ message: error.message });
    }
  }
  // async createTourBroadcast(req, res) {
  //   const tourBroadcastRepository = getRepository(TourBroadcast);
  //   try {
  //     const newTourBroadcast = tourBroadcastRepository.create(req.body);
  //     const savedTourBroadcast = await tourBroadcastRepository.save(
  //       newTourBroadcast
  //     );
  //     res.status(201).json(savedTourBroadcast);
  //   } catch (error) {
  //     res.status(400).json({ message: error.message });
  //   }
  // }

  async getTourBroadcasts(req, res) {
    const tourBroadcastRepository = getRepository(TourBroadcast);
    try {
      const tourBroadcasts = await tourBroadcastRepository.find();
      res.status(200).json(tourBroadcasts);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async getTourBroadcastById(req, res) {
    const tourBroadcastRepository = getRepository(TourBroadcast);
    try {
      const tourBroadcast = await tourBroadcastRepository.findOne(
        req.params.id
      );
      if (tourBroadcast) {
        res.status(200).json(tourBroadcast);
      } else {
        res.status(404).json({ message: "TourBroadcast not found" });
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async updateTourBroadcast(req, res) {
    const tourBroadcastRepository = getRepository(TourBroadcast);
    try {
      const tourBroadcast = await tourBroadcastRepository.findOne(
        req.params.id
      );
      if (tourBroadcast) {
        tourBroadcastRepository.merge(tourBroadcast, req.body);
        const updatedTourBroadcast = await tourBroadcastRepository.save(
          tourBroadcast
        );
        res.status(200).json(updatedTourBroadcast);
      } else {
        res.status(404).json({ message: "TourBroadcast not found" });
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async deleteTourBroadcast(req, res) {
    const tourBroadcastRepository = getRepository(TourBroadcast);
    try {
      const result = await tourBroadcastRepository.delete(req.params.id);
      if (result.affected) {
        res.status(200).json({ message: "TourBroadcast deleted successfully" });
      } else {
        res.status(404).json({ message: "TourBroadcast not found" });
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}

module.exports = new TourBroadcastController();
