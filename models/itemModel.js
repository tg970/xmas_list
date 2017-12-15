const mongoose = require('mongoose');

const itemSchema = mongoose.Schema({
   item: { type: String, required: true },
   link: { type: String, required: true},
   price: { type: Number },
   img: { type: String },
   desc: { type: String },
   purchased: Boolean
});

module.exports = mongoose.model('Item', itemSchema);
