const express = require("express");
const router = express.Router();
const {
  getSalesReports,
  getSalesReportById,
  createSalesReport,
  updateSalesReport,
  deleteSalesReport,
} = require("../../controllers/Reporting/SalesReportController");

router.get("/getSalesReports", getSalesReports);
router.get("/getSalesReportById/:id", getSalesReportById);
router.post("/createSalesReport", createSalesReport);
router.put("/updateSalesReport/:id", updateSalesReport);
router.delete("/deleteSalesReport/:id", deleteSalesReport);

module.exports = router;
