const mongoose = require('mongoose');

module.exports = mongoose.model( // first we are exporting the model so we can use it another file for our command!
'logs', //naming your model 
new mongoose.Schema({ //schema contructor
    guild: String, //main key (we would be using this for finding the model cause guild is unique!)
    channel: String // secondary key (for the data channel.. where we would send the logs to!)
}));