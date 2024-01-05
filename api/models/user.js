const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
    {
    firstName: {
      type: String,
      required: [true, 'First name is required.']
    },
    lastName: {
      type: String,
      required: [true, 'Last name is required.']
    },
    email: {
      type: String,
      required: [true, 'Email is required.'],
      unique: [true, 'Email must be unique.']
    },
    password: {
      type: String,
      required: [true, 'Password is required.']
    },
    bio: { 
      type: String, 
      default: '' 
    },
    profilePictureURL: { 
      type: String, 
      default: '' 
    },


    // FRIENDS FEATURE:
    friends: {
      type: [mongoose.Schema.Types.ObjectId],
      default: [],
      ref: 'User'
    },
      requests: {
      type: [mongoose.Schema.Types.ObjectId],
      default: [],
      ref: 'User'
    },

  },
  {
    timestamps: true,
  }

);

const User = mongoose.model("User", UserSchema);

module.exports = User;
