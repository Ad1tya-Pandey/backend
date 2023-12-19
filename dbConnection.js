// dbConnection.js
const mongoose = require('mongoose');
const FootballModel = require('./models/football');

const mongoUri = 'mongodb://localhost:27017/Football';
mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });




const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB Atlas successfully');
});

module.exports = FootballModel;
