const { getRepository } = require("typeorm");
const TourDetail = require("../../models/ToursAndActivities/TourDetailModel");
const Tour = require("../../models/ToursAndActivities/TourModel");

async function createTourDetail(req, res) {
  const { tourId, ...data } = req.body;
  const tourRepository = getRepository(Tour);
  const tourDetailRepository = getRepository(TourDetail);

  try {
    const tour = await tourRepository.findOne({ where: { id: tourId } });
    if (!tour) {
      return res.status(404).json({ message: "Tour not found" });
    }

    const tourDetail = tourDetailRepository.create({
      ...data,
      tour,
    });

    const savedTourDetail = await tourDetailRepository.save(tourDetail);

    tour.tourDetail = savedTourDetail;
    await tourRepository.save(tour);

    return res.status(201).json(savedTourDetail);
  } catch (error) {
    console.error("Error:", error.message);
    return res.status(500).json({ message: error.message });
  }
}

// const createTourDetail = async (req, res) => {
//   try {
//     const tourDetailRepository = getRepository(TourDetail);
//     const tourDetail = tourDetailRepository.create(req.body);
//     const result = await tourDetailRepository.save(tourDetail);
//     res.status(201).json(result);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

const getTourDetailS = async (req, res) => {
  try {
    const tourDetailRepository = getRepository(TourDetail);
    const tourDetailS = await tourRepository.find();
    res.json(tourDetailS);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getTourDetailById = async (req, res) => {
  try {
    const tourDetailRepository = getRepository(TourDetail);
    const tourDetail = await tourDetailRepository.findOne(req.params.id, {
      relations: ["tour"],
    });
    if (tourDetail) {
      res.status(200).json(tourDetail);
    } else {
      res.status(404).json({ message: "TourDetail not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateTourDetail = async (req, res) => {
  try {
    const tourDetailRepository = getRepository(TourDetail);
    let tourDetail = await tourDetailRepository.findOne(req.params.id);
    if (tourDetail) {
      tourDetailRepository.merge(tourDetail, req.body);
      const result = await tourDetailRepository.save(tourDetail);
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "TourDetail not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteTourDetail = async (req, res) => {
  try {
    const tourDetailRepository = getRepository(TourDetail);
    const result = await tourDetailRepository.delete(req.params.id);
    if (result.affected) {
      res.status(200).json({ message: "TourDetail deleted successfully" });
    } else {
      res.status(404).json({ message: "TourDetail not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createTourDetail,
  getTourDetailById,
  updateTourDetail,
  deleteTourDetail,
  getTourDetailS,
};
