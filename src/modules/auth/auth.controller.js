import User from "../../../DB/models/user.model.js";
import Client from "../../../DB/models/client.model.js";
import Seller from "../../../DB/models/seller.model.js";
import Admin from "../../../DB/models/admin.model.js";

import asyncHandler from "./../../../utils/asyncHandler.js";
import resObject from "./../../../utils/responseObject.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

const register = asyncHandler(async (req, res, next) => {
  const model = mongoose.model(req.body.role);
  const user = await model.create({ ...req.body });

  return res.json(
    resObject({ message: "user created successfully", results: { user } })
  );
});

const accountActivation = asyncHandler(async (req, res, next) => {
  const payload = jwt.verify(req.params.token, process.env.SECRET_KEY);
  const model = mongoose.model(payload.role);
  const user = await model.findByIdAndUpdate(
    payload.id,
    {
      accountAcctivated: true,
    },
    { new: true }
  );
  return res.json(
    resObject({
      message: "account acctivated successfully, try to login!",
      results: { user },
    })
  );
});
const login = asyncHandler(async (req, res, next) => {
  const user = await User.findByEmail(req.body.email);

  if (!user) return next(new Error("Invalid Email!", { cause: 404 }));

  if (!user.accountAcctivated)
    return next(new Error("Activate your account first!", { cause: 404 }));

  if (!user.checkPassword(req.body.password))
    return next(new Error("Invalid Password!", { cause: 404 }));

  const token = user.generateToken();

  return res.json(
    resObject({
      results: { token },
    })
  );
});

export { register, accountActivation, login };
