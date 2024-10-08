import mongoose from "mongoose";
import User, { Roles } from "./user.model.js";

export const clientSchema = mongoose.Schema({
  address: String,
  phone: String,
});

const Client = User.discriminator(Roles.client, clientSchema);
export default Client;
