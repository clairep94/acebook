const mongoose = require("mongoose");

const ChatSchema = new mongoose.Schema({
  members: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'User'
  },
},
{
  timestamps: true, // USE THIS --> auto adds doc.createdAt, doc.updatedAt properties
}
);

const Chat = mongoose.model("Chat", ChatSchema);

module.exports = Chat;
