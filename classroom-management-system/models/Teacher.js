const mongoose = require('mongoose');
const User = require('./User');

const teacherSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

module.exports = mongoose.model('Teacher', teacherSchema);
