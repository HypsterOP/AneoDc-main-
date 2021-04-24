const mongoose = require("mongoose")

const TicketDataSchema = new mongoose.Schema({
    MessageID: String,
    GuildID: String,
    TicketNumber: Number,
    WhitelistedRole : String,
});

const MessageModel = module.exports = mongoose.model("TicketData", TicketDataSchema)