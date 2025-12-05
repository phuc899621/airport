import Joi from "joi";

export const laySanBayParamsSchema = Joi.object({
    maSanBay: Joi.number().integer().positive().optional(),
});
export const laySanBayQuerySchema = Joi.object({
    tenSanBay: Joi.string().optional(),
    quocGia: Joi.string().optional(),
});

export const taoSanBayBodySchema = Joi.object({
  tenSanBay: Joi.string().required(),
  quocGia: Joi.string().required(),
});
export const capNhatSanBayBodySchema = Joi.object({
  tenSanBay: Joi.string().optional(),
  quocGia: Joi.string().optional(),
});
export const capNhatSanBayParamsSchema = Joi.object({
  maSanBay: Joi.number().integer().positive().required(),
});

export const xoaSanbayParamsSchema = Joi.object({
  maSanBay: Joi.number().integer().positive().required(),
})
