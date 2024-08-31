import joi from "joi";
import { Roles } from "../../../DB/models/user.model.js";

export const register = joi
  .object({
    name: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().required(),
    rePassword: joi.string().valid(joi.ref("password")).required(),
    role: joi
      .string()
      .valid(...Object.values(Roles))
      .required(),
  })
  .required();

export const login = joi
  .object({
    email: joi.string().email().required(),
    password: joi.string().required(),
  })
  .required();
