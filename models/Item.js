const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    qte: {
        type: Number,
        required: true
    },
    rayon: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    customer: {
      type: String, 
      required : true
    }
});

const Item = mongoose.model('Item', ItemSchema,'items'  /* <-- nom de la collection */);

module.exports = { Item: Item };
