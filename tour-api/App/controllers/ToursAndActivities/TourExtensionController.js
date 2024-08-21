const { getRepository } = require("typeorm");
const TourExtension = require("../../models/ToursAndActivities/TourExtensionModel");
const Tour = require("../../models/ToursAndActivities/TourModel");
const OtherService = require("../../models/OtherServices/OtherServiceModel");

class TourExtensionController {
  async createTourExtension(req, res) {
    // const {
    //   includedServices,
    //   extraServices,
    //   includedMeals,
    //   tourId,
    //   otherServiceIds,
    // } = req.body;

    const { tourId, otherServiceIds, ...data } = req.body;

    try {
      const tourExtensionRepository = getRepository(TourExtension); // Correct repository
      const otherServiceRepository = getRepository(OtherService);
      const tourRepository = getRepository(Tour);

      // Find the OtherServices based on the provided IDs
      const otherServices = await otherServiceRepository.findByIds(
        otherServiceIds
      );
      const tour = await tourRepository.findOneBy({ id: tourId });
      if (!tour) {
        return res.status(404).json({ message: "Tour not found" });
      }

      // const tourExtension = {
      //   includedServices,
      //   extraServices,
      //   includedMeals,
      //   tour: { id: tourId }, // Associate the tour
      //   otherServices, // Associate the other services as an array
      // };

      const tourExtension = tourExtensionRepository.create({
        ...data,
        tour, // Link the tour
        otherServices, // Link the other services
      });

      // Save the TourExtension entity
      const savedTourExtension = await tourExtensionRepository.save(
        tourExtension
      );
      tour.tourExtension = savedTourExtension;
      await tourRepository.save(tour);

      res.status(201).json({
        message: "TourExtension created successfully!",
        tourExtensionId: savedTourExtension.id,
      });
    } catch (error) {
      console.error("Error creating TourExtension:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async createTourExtensionss(req, res) {
    const { tourId, otherServiceIds, ...data } = req.body;
    const tourExtensionRepository = getRepository(TourExtension);
    const tourRepository = getRepository(Tour);
    const otherServiceRepository = getRepository(OtherService);

    try {
      // Find the related tour by ID
      const tour = await tourRepository.findOneBy({ id: tourId });
      if (!tour) {
        return res.status(404).json({ message: "Tour not found" });
      }

      // Find all related other services by IDs
      const otherServices = await otherServiceRepository.findOneBy({
        id: otherServiceIds,
      });
      if (!otherServices.length) {
        return res.status(404).json({ message: "No other services found" });
      }

      // Create the TourExtension entity
      const tourExtension = tourExtensionRepository.create({
        ...data,
        tour, // Link the tour
        otherServices, // Link the other services
      });

      // Save the TourExtension entity
      const savedTourExtension = await tourExtensionRepository.save(
        tourExtension
      );

      // Link the Tour entity to the new TourExtension
      tour.tourExtension = savedTourExtension;
      await tourRepository.save(tour);

      res.status(201).json(savedTourExtension);
    } catch (error) {
      console.error("Error:", error.message);
      res.status(500).json({ message: error.message });
    }
  }

  // async createTourExtension(req, res) {
  //   const tourExtensionRepository = getRepository(TourExtension);
  //   try {
  //     const newTourExtension = tourExtensionRepository.create(req.body);
  //     const savedTourExtension = await tourExtensionRepository.save(
  //       newTourExtension
  //     );
  //     res.status(201).json(savedTourExtension);
  //   } catch (error) {
  //     res.status(400).json({ message: error.message });
  //   }
  // }

  async getTourExtensions(req, res) {
    const tourExtensionRepository = getRepository(TourExtension);
    try {
      const tourExtensions = await tourExtensionRepository.find({
        relations: ["otherServices"],
      });
      res.status(200).json(tourExtensions);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async getTourExtension(req, res) {
    const tourExtensionRepository = getRepository(TourExtension);
    try {
      const tourExtension = await tourExtensionRepository.findOne(
        req.params.id
      );
      if (tourExtension) {
        res.status(200).json(tourExtension);
      } else {
        res.status(404).json({ message: "TourExtension not found" });
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async updateTourExtension(req, res) {
    const tourExtensionRepository = getRepository(TourExtension);
    try {
      const tourExtension = await tourExtensionRepository.findOne(
        req.params.id
      );
      if (tourExtension) {
        tourExtensionRepository.merge(tourExtension, req.body);
        const updatedTourExtension = await tourExtensionRepository.save(
          tourExtension
        );
        res.status(200).json(updatedTourExtension);
      } else {
        res.status(404).json({ message: "TourExtension not found" });
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async deleteTourExtension(req, res) {
    const tourExtensionRepository = getRepository(TourExtension);
    try {
      const result = await tourExtensionRepository.delete(req.params.id);
      if (result.affected) {
        res.status(200).json({ message: "TourExtension deleted successfully" });
      } else {
        res.status(404).json({ message: "TourExtension not found" });
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}

module.exports = new TourExtensionController();
