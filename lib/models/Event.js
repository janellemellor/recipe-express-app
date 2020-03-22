const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  recipeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Recipe', 
    required: true
  },
  dateOfEvent:{
    type: Date,
    required: true
  },
  notes: {
    type: String,
    required: true
  },
  rating: {
    type: Number, 
    required: true,
    min: 0, 
    max: 5
  }
});

module.exports = mongoose.model('Event', schema);
