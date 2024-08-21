const { getRepository } = require("typeorm");
const Agency = require("../../models/GeneralSettings/AgencyMode");

const getAgencies = async (req, res) => {
  try {
    const agencyRepository = getRepository(Agency);
    const agencies = await agencyRepository.find();
    res.json(agencies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAgencyById = async (req, res) => {
  try {
    const { id } = req.params;
    const agencyRepository = await getRepository(Agency);
    const agency = await agencyRepository.findOneBy({ id: id });
    if (agency) {
      res.json(agency);
    } else {
      res.status(404).json({ message: "Agency not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createAgency = async (req, res) => {
  try {
    const agencyRepository = getRepository(Agency);
    const agency = agencyRepository.create(req.body);
    const savedAgency = await agencyRepository.save(agency);
    res.status(201).json(savedAgency);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateAgency = async (req, res) => {
  try {
    const { id } = req.params;
    const agencyRepository = await getRepository(Agency);
    const agency = await agencyRepository.findOneBy({ id: id });
    if (agency) {
      getRepository(Agency).merge(agency, req.body);
      const result = await getRepository(Agency).save(agency);
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "Agency not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteAgency = async (req, res) => {
  try {
    const result = await getRepository(Agency).delete(req.params.id);
    if (result.affected) {
      res.status(200).json({ message: "Agency deleted successfully" });
    } else {
      res.status(404).json({ message: "Agency not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAgencies,
  getAgencyById,
  createAgency,
  updateAgency,
  deleteAgency,
};
