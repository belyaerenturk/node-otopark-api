const Reservation = require("../models/Reserv");
const { StatusCodes } = require("http-status-codes");
const { NotFoundError, BadRequestError } = require("../errors");

const getAllReservations = async (req, res) => {
  const reservations = await Reservation.find({
    createdBy: req.user.userId,
  }).sort("createdAt");
  res.status(StatusCodes.OK).json({ reservations });
};

const getSingleReservation = async (req, res) => {
  const {
    user: { userId },
    params: { id: reservationId },
  } = req;

  const reservation = await Reservation.findOne({
    _id: reservationId,
    createdBy: userId,
  });

  if (!reservation) {
    throw new BadRequestError(`No reservation with id ${reservationId}`);
  }

  res.status(StatusCodes.OK).json({ reservation });
};

const createReservation = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const reservation = await Reservation.create(req.body);
  res.status(StatusCodes.CREATED).json({ reservation });
};

const updateReservation = async (req, res) => {
  const {
    body: { parkingSlot, isFull },
    user: { userId },
    params: { id: reservationId },
  } = req;

  if (parkingSlot === "") {
    throw new NotFoundError("Parking slot is can not be empty");
  }

  const reservation = await Reservation.findByIdAndUpdate(
    { _id: reservationId, createdBy: userId },
    req.body,
    { new: true, runValidators: true }
  );

  if (!reservation) {
    throw new BadRequestError(`No reservation with id ${reservationId}`);
  }

  res.status(StatusCodes.OK).json({ reservation, msg: "Sucessfully Update" });
};

const deleteReservation = async (req, res) => {
  const {
    user: { userId },
    params: { id: reservationId },
  } = req;

  const reservation = await Reservation.findByIdAndDelete({
    _id: reservationId,
    createdBy: userId,
  });

  res.status(StatusCodes.OK).json({ reservation, msg: "Successfully delete" });
};

module.exports = {
  getAllReservations,
  getSingleReservation,
  createReservation,
  updateReservation,
  deleteReservation,
};
