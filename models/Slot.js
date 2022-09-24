const mongoose = require("mongoose");

const SlotSchema = new mongoose.Schema({
  parkingSlot: {
    type: String,
    required: [true, "Please provide park slot."],
    trim: true,
  },
  isFull: {
    type: Boolean,
    default: false,
  },
});

// let Slot = mongoose.model("park", SlotSchema);

// module.exports.model = Slot
// module.exports.schema = SlotSchema

module.exports = mongoose.model("park", SlotSchema);
