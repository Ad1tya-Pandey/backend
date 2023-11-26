const mongoose = require('mongoose');

const footballSchema = new mongoose.Schema({
  team: String,
  gamesPlayed: Number,
  win: Number,
  draw: Number,
  loss: Number,
  goalsFor: Number,
  goalsAgainst: Number,
  points: Number,
  year: Number,
});


const Football = mongoose.model('Football', footballSchema);

module.exports = Football;
