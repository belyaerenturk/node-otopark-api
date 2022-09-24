const express = require("express");
const router = express.Router();

const { authenticateUser } = require("../middleware/authentication");

const {
  getAllSlots,
  getSlot,
  createSlot,
  deleteSlot,
  updateSlot,
} = require("../controllers/slots");

router.route("/").get(getAllSlots).post(createSlot);
router.route("/:id").get(getSlot).patch(updateSlot).delete(deleteSlot);

module.exports = router;
