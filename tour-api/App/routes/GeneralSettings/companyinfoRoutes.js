const express = require("express");
const router = express.Router();
const {
  getCompanies,
  getCompanyById,
  createCompany,
  updateCompany,
  deleteCompany,
} = require("../../controllers/GeneralSettings/companyinfoControler");

router.get("/getCompanies", getCompanies);
router.get("/getCompanyById/:id", getCompanyById);
router.post("/createCompany", createCompany);
router.put("/updateCompany/:id", updateCompany);
router.delete("/deleteCompany/:id", deleteCompany);

module.exports = router;
