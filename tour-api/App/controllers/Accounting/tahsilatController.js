const { getRepository } = require("typeorm");
const Tahsilat = require("../../models/Accounting/tahsilatModel");

const getTahsilats = async (req, res) => {
  try {
    const tahsilatRepository = getRepository(Tahsilat);
    const tahsilats = await tahsilatRepository.find();
    res.json(tahsilats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getTahsilatById = async (req, res) => {
  try {
    const { id } = req.params;
    const tahsilatRepository = await getRepository(Tahsilat);
    const tahsilat = await tahsilatRepository.findOneBy({ id: id });
    if (tahsilat) {
      res.json(tahsilat);
    } else {
      res.status(404).json({ message: "Tahsilat not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createTahsilat = async (req, res) => {
  try {
    const tahsilatRepository = getRepository(Tahsilat);
    const tahsilat = tahsilatRepository.create(req.body);
    const savedTahsilat = await tahsilatRepository.save(tahsilat);
    res.status(201).json(savedTahsilat);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateTahsilat = async (req, res) => {
  try {
    const { id } = req.params;
    const tahsilatRepository = await getRepository(Tahsilat);
    const tahsilat = await tahsilatRepository.findOneBy({ id: id });
    if (tahsilat) {
      getRepository(Tahsilat).merge(tahsilat, req.body);
      const result = await getRepository(Tahsilat).save(tahsilat);
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "Tahsilat not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteTahsilat = async (req, res) => {
  try {
    const result = await getRepository(Tahsilat).delete(req.params.id);
    if (result.affected) {
      res.status(200).json({ message: "Tahsilat deleted successfully" });
    } else {
      res.status(404).json({ message: "Tahsilat not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getTahsilats,
  getTahsilatById,
  createTahsilat,
  updateTahsilat,
  deleteTahsilat,
};
