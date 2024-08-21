const { getRepository } = require("typeorm");
const CompanyInformation = require("../../models/GeneralSettings/companyInformation");

const getCompanies = async (req, res) => {
  try {
    const companyRepository = getRepository(CompanyInformation);
    const companies = await companyRepository.find();
    res.json(companies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getCompanyById = async (req, res) => {
  try {
    const { id } = req.params;
    const companyRepository = await getRepository(CompanyInformation);
    const company = await companyRepository.findOneBy({ id: id });
    if (company) {
      res.json(company);
    } else {
      res.status(404).json({ message: "Company not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createCompany = async (req, res) => {
  try {
    const companyRepository = getRepository(CompanyInformation);
    const company = companyRepository.create(req.body);
    const savedCompany = await companyRepository.save(company);
    res.status(201).json(savedCompany);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateCompany = async (req, res) => {
  try {
    const { id } = req.params;
    const companyRepository = await getRepository(CompanyInformation);
    const company = await companyRepository.findOneBy({ id: id });
    if (company) {
      getRepository(CompanyInformation).merge(company, req.body);
      const result = await getRepository(CompanyInformation).save(company);
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "Company not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteCompany = async (req, res) => {
  try {
    const result = await getRepository(CompanyInformation).delete(
      req.params.id
    );
    if (result.affected) {
      res.status(200).json({ message: "Company deleted successfully" });
    } else {
      res.status(404).json({ message: "Company not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getCompanies,
  getCompanyById,
  createCompany,
  updateCompany,
  deleteCompany,
};
