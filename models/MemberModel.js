const mongoose = require("mongoose");

module.exports = mongoose.model(
  "MemberData",
  new mongoose.Schema({
    /* REQUIRED */
    id: { type: String }, 
    guildID: { type: String },
    sanctions: { type: Array, default: [] }, 
    mute: {
      type: Object,
      default: {
        muted: false,
        case: null,
        endDate: null,
      },
    },
  })
);
