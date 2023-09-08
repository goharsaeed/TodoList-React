const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
  item: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

module.exports = mongoose.model('Todo', TodoSchema);
