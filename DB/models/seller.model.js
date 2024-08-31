import mongoose from "mongoose";
import User, { Roles } from "./user.model.js";
export const sellerSchema = mongoose.Schema(
  {
    rating: Number,
    businessType: { type: String, enum: ["individual", "corporation"] },
  },
  {
    discriminatorKey: "role",
  }
);

const Seller = User.discriminator(Roles.seller, sellerSchema);
export default Seller;
