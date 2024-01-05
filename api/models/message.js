const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
  chatID: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Chat'
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  body: {
    type: String,
  }
},
{
  timestamps: true, // USE THIS --> auto adds doc.createdAt, doc.updatedAt properties
}
);

const Message = mongoose.model("Message", MessageSchema);

module.exports = Message;
