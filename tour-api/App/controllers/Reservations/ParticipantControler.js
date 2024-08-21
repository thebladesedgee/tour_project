const { getRepository } = require("typeorm");
const Participant = require("../../models/Reservations/participantModel");

const getParticipants = async (req, res) => {
  try {
    const participantRepository = getRepository(Participant);
    const participants = await participantRepository.find();
    res.json(participants);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getParticipantById = async (req, res) => {
  try {
    const { id } = req.params;
    const participantRepository = await getRepository(Participant);
    const participant = await participantRepository.findOneBy({ id: id });
    if (participant) {
      res.json(participant);
    } else {
      res.status(404).json({ message: "Participant not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createParticipant = async (req, res) => {
  try {
    const participantRepository = getRepository(Participant);
    const participant = participantRepository.create(req.body);
    const savedParticipant = await participantRepository.save(participant);
    res.status(201).json(savedParticipant);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateParticipant = async (req, res) => {
  try {
    const { id } = req.params;
    const participantRepository = await getRepository(Participant);
    const participant = await participantRepository.findOneBy({ id: id });
    if (participant) {
      getRepository(Participant).merge(participant, req.body);
      const result = await getRepository(Participant).save(participant);
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "Participant not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteParticipant = async (req, res) => {
  try {
    const result = await getRepository(Participant).delete(req.params.id);
    if (result.affected) {
      res.status(200).json({ message: "Participant deleted successfully" });
    } else {
      res.status(404).json({ message: "Participant not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getParticipants,
  getParticipantById,
  createParticipant,
  updateParticipant,
  deleteParticipant,
};
