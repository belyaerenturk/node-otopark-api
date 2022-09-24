const Slot = require("../models/Slot");
const { StatusCodes } = require("http-status-codes");
const { NotFoundError } = require("../errors");

const getAllSlots = async (req, res) => {
  const slots = await Slot.find({});
  res.status(StatusCodes.OK).json({ slots });
};

const createSlot = async (req, res) => {
  const slot = await Slot.create(req.body);
  res.status(StatusCodes.CREATED).json({ slot });
};

const getSlot = async (req, res) => {
  const { id: slotID } = req.params;
  const slot = await Slot.findOne({ _id: slotID });

  if (!slot) {
    throw new NotFoundError(`No slot with id ${slotID}`);
  }

  res.status(StatusCodes.OK).json({ slot });
};

const deleteSlot = async (req, res) => {
  const { id: slotID } = req.params;
  const slot = await Slot.findByIdAndDelete({ _id: slotID });
  if (!slot) {
    throw new NotFoundError(`No slot with id ${slotID}`);
  }

  res.status(StatusCodes.OK).json({ slot });
};

const updateSlot = async (req, res) => {
  const { id: slotID } = req.params;
  const slot = await Slot.findOneAndUpdate({ _id: slotID }, req.body, {
    new: true,
    runValidators: true,
  });

  if (!slot) {
    throw new NotFoundError(`No task with id ${slotID}`);
  }

  res.status(StatusCodes.OK).json({ slot });
};

module.exports = {
  getAllSlots,
  createSlot,
  getSlot,
  deleteSlot,
  updateSlot,
};
