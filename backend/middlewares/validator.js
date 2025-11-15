import Joi from "joi";

export function validate(schema) {
  return (req, res, next) => {
    const options = {
      abortEarly: false, 
      allowUnknown: true,  
      stripUnknown: true,  
    };

    const { error, value } = schema.validate(req.body, options);

    if (error) {
      return res.status(400).json({
        message: "Invalid input",
        data: error.details.map(e => e.message)
      });
    }

    req.body = value; 
    next();
  };
}
