const { getRepository } = require("typeorm");
const Tour = require("../../models/ToursAndActivities/TourModel");

// const createTour = async (req, res) => {
//   try {
//     const { product, duration, amount, region, lastUpdate, display, order, status, tourType, categories } = req.body;

//     // Yeni tur oluşturma
//     const tour = getRepository(Tour).create({
//       product,
//       duration,
//       amount,
//       region,
//       lastUpdate,
//       display,
//       order,
//       status,
//       tourType,
//       categories: categories ? categories.map(categoryId => ({ id: categoryId })) : [], // Kategoriler ile ilişkilendirme
//     });

//     const result = await getRepository(Tour).save(tour);
//     res.status(201).json(result);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

const createTour = async (req, res) => {
  try {
    const tourRepository = getRepository(Tour);
    const tour = tourRepository.create(req.body);
    const savedTour = await tourRepository.save(tour);
    res.status(201).json(savedTour);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getTours = async (req, res) => {
  try {
    const tourRepository = getRepository(Tour);
    //const tours = await tourRepository.find();
    const tours = await tourRepository.find({
      relations: ["generalInfo"],
    });
    res.json(tours);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// const getTours = async (req, res) => {
//   try {
//     const tours = await getRepository(Tour).find({
//       relations: ["tourCategories"], // Kategorilerle ilişkiyi yükleme
//       select: [
//         "id",
//         "product",
//         "duration",
//         "amount",
//         "region",
//         "lastUpdate",
//         "display",
//         "order",
//         "status",
//         "tourType",
//       ],
//     });
//     res.status(200).json(tours);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

const getTourById = async (req, res) => {
  try {
    const { id } = req.params;
    const tourRepository = await getRepository(Tour);
    const tour = await tourRepository.findOneBy({
      id: id, // where id is your column name
    });
    if (tour) {
      res.json(tour);
    } else {
      res.status(404).json({ message: "user not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// const getTourById = async (req, res) => {
//   try {
//     const id = req.params.id;
//     console.log("Fetching tour with ID:", id);

//     const tourRepo = await getRepository(Tour);
//     const tour = await tourRepo.findOne({
//       where: { id: id },
//       relations: ["categories"], // Kategorilerle ilişkiyi yükleme
//     });

//     if (tour) {
//       res.json(tour);
//     } else {
//       res.status(404).json({ message: "Tour not found" });
//     }
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// const updateTour = async (req, res) => {
//   try {
//     const id = req.params.id;
//     const {
//       product,
//       duration,
//       amount,
//       region,
//       lastUpdate,
//       display,
//       order,
//       status,
//       tourType,
//       categories,
//     } = req.body;

//     const tourRepo = await getRepository(Tour);
//     const tour = await tourRepo.findOne({
//       where: { id: id },
//       relations: ["categories"], // Kategorilerle ilişkiyi yükleme
//     });

//     if (tour) {
//       getRepository(Tour).merge(tour, {
//         product,
//         duration,
//         amount,
//         region,
//         lastUpdate,
//         display,
//         order,
//         status,
//         tourType,
//         categories: categories
//           ? categories.map((categoryId) => ({ id: categoryId }))
//           : tour.categories,
//       });

//       const result = await getRepository(Tour).save(tour);
//       res.status(200).json(result);
//     } else {
//       res.status(404).json({ message: "Tour not found" });
//     }
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// const updateTour = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const tourRepository = getRepository(Tour);
//     const tour = await tourRepository.findOne({
//       where: { id: id },
//       relations: ["categories"], // Kategorilerle ilişkiyi yükleme
//     });
//     if (tour) {
//       getRepository(Tour).merge(tour, req.body);
//       const result = await getRepository(Tour).save(tour);
//       res.status(200).json(result);
//     } else {
//       res.status(404).json({ message: "User not found" });
//     }
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

const updateTour = async (req, res) => {
  try {
    const { id } = req.params;
    const tourRepository = await getRepository(Tour);
    const tour = await tourRepository.findOneBy({
      id: id, // where id is your column name
    });
    if (tour) {
      getRepository(Tour).merge(tour, req.body);
      const result = await getRepository(Tour).save(tour);
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteTour = async (req, res) => {
  try {
    const result = await getRepository(Tour).delete(req.params.id);
    if (result.affected) {
      res.status(200).json({ message: "Tour deleted successfully" });
    } else {
      res.status(404).json({ message: "Tour not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getTours,
  getTourById,
  createTour,
  updateTour,
  deleteTour,
};
