const mongoose = require("mongoose");
const { Schema, model } = require("mongoose");
module.exports = model(
  "custom",
  new Schema({
    Guild: String,
    Command: String,
    Commands: String
  })
);

const UserSchema = new mongoose.Schema({
  discordId: {
    type: String,
    required: true,
    unique: true
  },
  discordTag: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
    required: true
  },
  guilds: {
    type: Array,
    required: true
  }
});

module.exports = model("User", UserSchema);
// schema for users
