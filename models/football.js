const mongoose = require('mongoose');

const footballSchema = new mongoose.Schema({
  Team: String,
  'Games Played': Number,
  Win: Number,
  Draw: Number,
  Loss: Number,
  'Goals For': Number,
  'Goals Against': Number,
  Points: Number,
  Year: Number,
});


const Football = mongoose.model('Football', footballSchema);

module.exports = Football;
