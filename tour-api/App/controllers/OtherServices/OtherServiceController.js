const { getRepository } = require("typeorm");
const OtherService = require("../../models/OtherServices/OtherServiceModel");

const getOtherServices = async (req, res) => {
  try {
    const otherServiceRepository = getRepository(OtherService);
    const otherServices = await otherServiceRepository.find();
    res.json(otherServices);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getOtherServiceById = async (req, res) => {
  try {
    const { id } = req.params;
    const otherServiceRepository = await getRepository(OtherService);
    const otherService = await otherServiceRepository.findOneBy({ id: id });
    if (otherService) {
      res.json(otherService);
    } else {
      res.status(404).json({ message: "OtherService not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createOtherService = async (req, res) => {
  try {
    const otherServiceRepository = getRepository(OtherService);
    const otherService = otherServiceRepository.create(req.body);
    const savedOtherService = await otherServiceRepository.save(otherService);
    res.status(201).json(savedOtherService);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateOtherService = async (req, res) => {
  try {
    const { id } = req.params;
    const otherServiceRepository = await getRepository(OtherService);
    const otherService = await otherServiceRepository.findOneBy({ id: id });
    if (otherService) {
      getRepository(OtherService).merge(otherService, req.body);
      const result = await getRepository(OtherService).save(otherService);
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "OtherService not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteOtherService = async (req, res) => {
  try {
    const result = await getRepository(OtherService).delete(req.params.id);
    if (result.affected) {
      res.status(200).json({ message: "OtherService deleted successfully" });
    } else {
      res.status(404).json({ message: "OtherService not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getOtherServices,
  getOtherServiceById,
  createOtherService,
  updateOtherService,
  deleteOtherService,
};
