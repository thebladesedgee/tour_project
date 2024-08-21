const { getRepository } = require("typeorm");
const TourGeneralInfo = require("../../models/ToursAndActivities/TourGeneralInfoModle");
const Tour = require("../../models/ToursAndActivities/TourModel");

class TourGeneralInfoController {
  async getAll(req, res) {
    const tourGeneralInfoRepository = getRepository(TourGeneralInfo);
    const tourGeneralInfos = await tourGeneralInfoRepository.find({
      relations: ["tour"],
    });
    res.json(tourGeneralInfos);
  }

  async getById(req, res) {
    const { id } = req.params;
    const tourGeneralInfoRepository = await getRepository(TourGeneralInfo);

    try {
      const tourGeneralInfo = await tourGeneralInfoRepository.findOne({
        where: { id: id }, // where id is your column name
        relations: ["tour"], // Specify the relations to load
      });

      if (!tourGeneralInfo) {
        return res.status(404).json({ message: "TourGeneralInfo not found" });
      }

      res.json(tourGeneralInfo);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // async create(req, res) {
  //   const { tourId, ...data } = req.body;
  //   const tourGeneralInfoRepository = getRepository(TourGeneralInfo);
  //   const tourRepository = getRepository(Tour);

  //   try {
  //     //const tour = await tourRepository.findOne(tourId);
  //     const tour = await tourRepository.findOneBy({
  //       id: tourId, // where id is your column name
  //     });
  //     if (!tour) {
  //       return res.status(404).json({ message: "Tour not found" });
  //     }

  //     const tourGeneralInfo = tourGeneralInfoRepository.create({
  //       ...data,
  //       tour,
  //     });
  //     await tourGeneralInfoRepository.save(tourGeneralInfo);

  //     res.status(201).json(tourGeneralInfo);
  //   } catch (error) {
  //     res.status(500).json({ message: error.message });
  //   }
  // }

  async create(req, res) {
    const { tourId, ...data } = req.body;
    const tourGeneralInfoRepository = getRepository(TourGeneralInfo);
    const tourRepository = getRepository(Tour);

    try {
      const tour = await tourRepository.findOneBy({ id: tourId });
      if (!tour) {
        return res.status(404).json({ message: "Tour not found" });
      }

      const existingTourGeneralInfo = await tourGeneralInfoRepository.findOne({
        where: { tour },
      });

      if (existingTourGeneralInfo) {
        return res
          .status(409)
          .json({ message: "TourGeneralInfo already exists for this Tour" });
      }

      const tourGeneralInfo = tourGeneralInfoRepository.create({
        ...data,
        tour, // Linking TourGeneralInfo to the Tour
      });

      const savedTourGeneralInfo = await tourGeneralInfoRepository.save(
        tourGeneralInfo
      );

      // Update the Tour instance with the created TourGeneralInfo
      tour.generalInfo = savedTourGeneralInfo; // Ensure you set the generalInfo correctly
      await tourRepository.save(tour); // Save the updated Tour

      res.status(201).json(savedTourGeneralInfo);
    } catch (error) {
      console.error("Error:", error.message);
      res.status(500).json({ message: error.message });
    }
  }

  // async create(req, res) {
  //   const { tourId, ...data } = req.body;
  //   const tourGeneralInfoRepository = getRepository(TourGeneralInfo);
  //   const tourRepository = getRepository(Tour);

  //   try {
  //     const tour = await tourRepository.findOneBy({ id: tourId });
  //     if (!tour) {
  //       return res.status(404).json({ message: "Tour not found" });
  //     }

  //     // Create and save the TourGeneralInfo
  //     const tourGeneralInfo = tourGeneralInfoRepository.create({
  //       ...data,
  //       tour,
  //     });
  //     const savedTourGeneralInfo = await tourGeneralInfoRepository.save(
  //       tourGeneralInfo
  //     );

  //     res.status(201).json(savedTourGeneralInfo);
  //   } catch (error) {
  //     console.error("Error:", error.message);
  //     res.status(500).json({ message: error.message });
  //   }
  // }

  async update(req, res) {
    const { id } = req.params;
    const { tourId, ...data } = req.body;
    const tourGeneralInfoRepository = getRepository(TourGeneralInfo);
    const tourRepository = getRepository(Tour);

    try {
      const tourGeneralInfo = await tourGeneralInfoRepository.findOne(id);
      if (!tourGeneralInfo) {
        return res.status(404).json({ message: "TourGeneralInfo not found" });
      }

      if (tourId) {
        const tour = await tourRepository.findOne(tourId);
        if (!tour) {
          return res.status(404).json({ message: "Tour not found" });
        }
        tourGeneralInfo.tour = tour;
      }

      Object.assign(tourGeneralInfo, data);
      await tourGeneralInfoRepository.save(tourGeneralInfo);

      res.json(tourGeneralInfo);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async delete(req, res) {
    const { id } = req.params;
    const tourGeneralInfoRepository = getRepository(TourGeneralInfo);

    try {
      const result = await tourGeneralInfoRepository.delete(id);
      if (result.affected === 0) {
        return res.status(404).json({ message: "TourGeneralInfo not found" });
      }
      res.json({ message: "TourGeneralInfo deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = new TourGeneralInfoController();
