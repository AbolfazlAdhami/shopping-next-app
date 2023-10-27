import mongoose from "mongoose";
const { Schema, models, model } = mongoose;

mongoose.Promise = global.Promise;

const userSchema = new Schema({
  name: { type: String, require: true },
  email: { type: String, require: true },
  password: { type: String, require: true },
  isAdmin: { type: Boolean, require: true, default: false },
});

export const User = models.User || model("User", userSchema);
