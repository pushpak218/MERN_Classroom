const mongoose = require('mongoose');
const User = require('./User');

const studentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  classroom: { type: mongoose.Schema.Types.ObjectId, ref: 'Classroom' },
});

module.exports = mongoose.model('Student', studentSchema);
