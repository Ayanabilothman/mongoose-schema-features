// required: function

import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import sendEmail from "../../utils/sendEmail.js";
import generateActivationTemp from "../../utils/generateHTMLTemps.js";

export const Roles = {
  client: "Client",
  seller: "Seller",
  admin: "Admin",
};

const userSchema = mongoose.Schema(
  {
    name: { type: String },
    profilePic: String,
    email: { type: String, unique: true, required: true },
    password: {
      required: true,
      type: String,
      set: (value) => bcrypt.hashSync(value, 10),
    },
    birthDate: Date,
    age: Number,
    accountAcctivated: { type: Boolean, default: false },
  },
  {
    discriminatorKey: "role",
    timestamps: true,
  }
);

// statics
userSchema.statics.findByEmail = async function (email) {
  return await this.findOne({ email });
};

// methods
userSchema.methods.checkPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

userSchema.methods.generateToken = function () {
  return jwt.sign(
    { id: this.id, email: this.email, role: this.role },
    process.env.SECRET_KEY
  );
};

// query helper
userSchema.query.paginate = function ({ page, limit }) {
  const skip = limit * (page - 1);
  return this.skip(skip).limit(limit);
};

// pre hook
userSchema.pre("save", async function (next) {
  if (this.birthDate)
    this.age = new Date().getFullYear() - this.birthDate.getFullYear();

  return next();
});

// post hook
userSchema.post("save", async function (doc, next) {
  if (doc.createdAt.getTime() === doc.updatedAt.getTime()) {
    const token = doc.generateToken();
    const activationLink = `http://localhost:3000/auth/accountActivation/${token}`;

    const sent = await sendEmail({
      to: doc.email,
      subject: "Account Acctivation",
      html: generateActivationTemp(activationLink),
    });
    return sent ? next() : next(new Error("Failed to send email!"));
  }
});

const User = mongoose.model("User", userSchema);

export default User;
