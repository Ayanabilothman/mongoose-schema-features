import mongoose from "mongoose";
import User, { Roles } from "./user.model.js";

export const adminSchema = mongoose.Schema(
  {
    permissions: Array,
    assignedTasks: Array,
    department: String,
  },

  {
    discriminatorKey: "role",
  }
);

const Admin = User.discriminator(Roles.admin, adminSchema);
export default Admin;
