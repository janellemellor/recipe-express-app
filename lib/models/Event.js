const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  recipeId: {
    type: String, 
    required: true
  },
  dateOfEvent:{
    type: Date(),
    required: true
  },
  notes: {
    type: String,
    required: true
  },
  rating: {
    type: Number, 
    required: true
  }
});

module.exports = mongoose.model('Event', eventSchema);
