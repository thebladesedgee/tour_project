const express = require("express");
const router = express.Router();
const {
  getInboxes,
  getInboxById,
  createInbox,
  updateInbox,
  deleteInbox,
} = require("../../controllers/Inbox/inboxController");

router.get("/getInboxes", getInboxes);
router.get("/getInboxById/:id", getInboxById);
router.post("/createInbox", createInbox);
router.put("/updateInbox/:id", updateInbox);
router.delete("/deleteInbox/:id", deleteInbox);

module.exports = router;
