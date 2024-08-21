const { getRepository } = require("typeorm");
const User = require("../../models/CustomerManagement/CustomersModel");

const getUsers = async (req, res) => {
  try {
    const userRepository = getRepository(User);
    const users = await userRepository.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const userRepo = await getRepository(User);
    const user = await userRepo.findOneBy({
      id: id, // where id is your column name
    });
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: "user not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createUser = async (req, res) => {
  try {
    const userRepository = getRepository(User);
    const user = userRepository.create(req.body);
    const savedUser = await userRepository.save(user);
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const userRepo = await getRepository(User);
    const user = await userRepo.findOneBy({
      id: id, // where id is your column name
    });
    if (user) {
      getRepository(User).merge(user, req.body);
      const result = await getRepository(User).save(user);
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const result = await getRepository(User).delete(req.params.id);
    if (result.affected) {
      res.status(200).json({ message: "User deleted successfully" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
