const { model, Schema } = require("mongoose")

module.exports = model('inventory', new Schema({
    Guild: String,
    User: String,
    Inventory: Object,
}))