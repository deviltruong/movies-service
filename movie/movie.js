const mongoose = require('mongoose');
// const validator = require('validator');

const { Schema } = mongoose;

const movieSchema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  title: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  runtime: Number,
  format: String,
  plot: String,
  releaseYear: {
    type: Number,
    required: true,
  },
  releaseMonth: {
    type: Number,
    required: true,
  },
  releaseDay: {
    type: Number,
    required: true,
  },
  // email: {
  //   type: String,
  //   required: true,
  //   trim: true,
  //   lowercase: true,
  //   unique: true,
  //   validate: {
  //     validator: validator.isEmail,
  //     message: 'This is not a valid Email',
  //   },
  // },
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;
