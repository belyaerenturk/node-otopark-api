const mongoose = require("mongoose");
const SlotSchema = require("./Slot").schema;

const ReservationSchema = new mongoose.Schema(
  {
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user"],
    },
    space: {
      type: SlotSchema,
      isFull: {
        type: Boolean,
        required: false,
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("reservation", ReservationSchema);
