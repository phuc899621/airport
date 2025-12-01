import Joi from "joi";
import { errorHandler } from "../core/errors/error_handler.js";
import { ValidationError } from "../core/errors/errors.js";
import ValidateOption from "./base.validator.option.js";

export function validate(schema, option=ValidateOption.BODY) {
  return (req, res, next) => {
    const options = {
      abortEarly: false, 
      allowUnknown: true,  
      stripUnknown: true,  
    };
    const target=req[option]||{};
    const { error, value } = schema.validate(target, options);
    console.log(error,value);
    if (error) {
      errorHandler(res, new ValidationError(error.details[0].message));
    }

    if (!req.validated) req.validated = {};
    req.validated[option] = value;
    next();
  };
}

