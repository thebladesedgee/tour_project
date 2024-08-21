const { getRepository } = require("typeorm");
const Reservation = require("../../models/Reservations/RezervationModel");

const createReservation = async (req, res) => {
  try {
    const rezervationRepository = getRepository(Reservation);
    const reservation = rezervationRepository.create(req.body);
    const savedUser = await rezervationRepository.save(reservation);
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// const createReservation = async (req, res) => {
//   try {
//     const { pnr, amount, reservationDate, startDate, status, userId } =
//       req.body;

//     // Yeni rezervasyon oluşturma
//     const reservation = getRepository(Reservation).create({
//       pnr,
//       amount,
//       reservationDate,
//       startDate,
//       status,
//       user: { id: userId }, // User tablosu ile ilişkilendirme
//     });

//     const result = await getRepository(Reservation).save(reservation);
//     res.status(201).json(result);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

const getReservations = async (req, res) => {
  try {
    const reservationRepository = getRepository(Reservation);

    const reservations = await reservationRepository.find({
      relations: ["user", "tour", "tahsilat"],
    });

    return res.status(200).json(reservations);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Bir hata oluştu" });
  }
};

// const getReservations = async (req, res) => {
//   try {
//     const reservations = await getRepository(Reservation).find();
//     res.status(200).json(reservations);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

//Güncellll
const getReservationById = async (req, res) => {
  try {
    const id = req.params.id;
    console.log("Fetching reservation with ID:", id);

    const reservationRepo = await getRepository(Reservation);
    const reservation = await reservationRepo.findOneBy({
      id: id, // where id is your column name
    });
    if (reservation) {
      res.json(reservation);
    } else {
      res.status(404).json({ message: "reservation not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
//Güncellll

const updateReservation = async (req, res) => {
  try {
    const { id } = req.params;
    const reservationRepo = await getRepository(Reservation);
    const reservation = await reservationRepo.findOneBy({
      id: id, // where id is your column name
    });
    if (reservation) {
      getRepository(Reservation).merge(reservation, req.body);
      const result = await getRepository(Reservation).save(reservation);
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// const updateReservation = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const reservationRepo = await getRepository(Reservation);
//     const reservation = await reservationRepo.findOneBy({
//       id: id, // where id is your column name
//     });
//     if (reservation) {
//       getRepository(Reservation).merge(reservation, {
//         pnr,
//         amount,
//         reservationDate,
//         startDate,
//         status,
//         user: userId ? { id: userId } : reservation.user,
//       });
//       const result = await getRepository(Reservation).save(reservation);
//       res.status(200).json(result);
//     } else {
//       res.status(404).json({ message: "Reservation not found" });
//     }
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

const deleteReservation = async (req, res) => {
  try {
    const result = await getRepository(Reservation).delete(req.params.id);
    if (result.affected) {
      res.status(200).json({ message: "Reservation deleted successfully" });
    } else {
      res.status(404).json({ message: "Reservation not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getReservations,
  getReservationById,
  createReservation,
  updateReservation,
  deleteReservation,
};
