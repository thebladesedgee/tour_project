const { getRepository } = require("typeorm");
const SalesReport = require("../../models/Reporting/SalesReportModel");

const getSalesReports = async (req, res) => {
  try {
    const salesReportRepository = getRepository(SalesReport);
    const salesReports = await salesReportRepository.find();
    res.json(salesReports);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getSalesReportById = async (req, res) => {
  try {
    const { id } = req.params;
    const salesReportRepository = await getRepository(SalesReport);
    const salesReport = await salesReportRepository.findOneBy({ id: id });
    if (salesReport) {
      res.json(salesReport);
    } else {
      res.status(404).json({ message: "SalesReport not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createSalesReport = async (req, res) => {
  try {
    const salesReportRepository = getRepository(SalesReport);
    const salesReport = salesReportRepository.create(req.body);
    const savedSalesReport = await salesReportRepository.save(salesReport);
    res.status(201).json(savedSalesReport);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateSalesReport = async (req, res) => {
  try {
    const { id } = req.params;
    const salesReportRepository = await getRepository(SalesReport);
    const salesReport = await salesReportRepository.findOneBy({ id: id });
    if (salesReport) {
      getRepository(SalesReport).merge(salesReport, req.body);
      const result = await getRepository(SalesReport).save(salesReport);
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "SalesReport not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteSalesReport = async (req, res) => {
  try {
    const result = await getRepository(SalesReport).delete(req.params.id);
    if (result.affected) {
      res.status(200).json({ message: "SalesReport deleted successfully" });
    } else {
      res.status(404).json({ message: "SalesReport not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getSalesReports,
  getSalesReportById,
  createSalesReport,
  updateSalesReport,
  deleteSalesReport,
};
