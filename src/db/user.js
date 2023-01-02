import { Schema, model } from "mongoose";

const UserSchema = Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  access_token: {
    type: String,
  },
  refresh_token: {
    type: String,
  },
  isVerfied: {
    type: Boolean,
    default: false,
  },
});
const User = model("Users", UserSchema);
export default User;
