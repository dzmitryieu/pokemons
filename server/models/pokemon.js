const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pokemonSchema = new Schema({
    name: String,
    base_experience: Number,
    height: Number,
    image_url: String
});

module.exports = mongoose.model('Pokemon', pokemonSchema);
