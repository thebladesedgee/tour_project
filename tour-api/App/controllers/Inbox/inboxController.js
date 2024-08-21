const { getRepository } = require("typeorm");
const Inbox = require("../../models/Inbox/inboxModel");

const getInboxes = async (req, res) => {
  try {
    const inboxRepository = getRepository(Inbox);
    const inboxes = await inboxRepository.find();
    res.json(inboxes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getInboxById = async (req, res) => {
  try {
    const { id } = req.params;
    const inboxRepository = await getRepository(Inbox);
    const inbox = await inboxRepository.findOneBy({ id: id });
    if (inbox) {
      res.json(inbox);
    } else {
      res.status(404).json({ message: "Inbox not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createInbox = async (req, res) => {
  try {
    const inboxRepository = getRepository(Inbox);
    const inbox = inboxRepository.create(req.body);
    const savedInbox = await inboxRepository.save(inbox);
    res.status(201).json(savedInbox);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateInbox = async (req, res) => {
  try {
    const { id } = req.params;
    const inboxRepository = await getRepository(Inbox);
    const inbox = await inboxRepository.findOneBy({ id: id });
    if (inbox) {
      getRepository(Inbox).merge(inbox, req.body);
      const result = await getRepository(Inbox).save(inbox);
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "Inbox not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteInbox = async (req, res) => {
  try {
    const result = await getRepository(Inbox).delete(req.params.id);
    if (result.affected) {
      res.status(200).json({ message: "Inbox deleted successfully" });
    } else {
      res.status(404).json({ message: "Inbox not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getInboxes,
  getInboxById,
  createInbox,
  updateInbox,
  deleteInbox,
};
