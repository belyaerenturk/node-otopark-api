const express = require("express");
const router = express.Router();

const {
  getAllReservations,
  getSingleReservation,
  createReservation,
  updateReservation,
  deleteReservation,
} = require("../controllers/reserv");

router.route("/").get(getAllReservations).post(createReservation);
router
  .route("/:id")
  .get(getSingleReservation)
  .patch(updateReservation)
  .delete(deleteReservation);

module.exports = router;
