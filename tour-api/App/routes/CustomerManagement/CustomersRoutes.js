const express = require("express");
const router = express.Router();
const {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} = require("../../controllers/CustomerManagement/CustomersController");

router.get("/getUsers", getUsers);
router.get("/getUsersByid/:id", getUserById);
router.post("/create", createUser);
router.put("/updateUser/:id", updateUser);
router.delete("/deleteUser/:id", deleteUser);

module.exports = router;
