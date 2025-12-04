import Joi from "joi";

export const layMayBayParamsSchema = Joi.object({
    maMayBay: Joi.number().integer().positive().optional().messages({
      "number.base": "Mã máy bay phải là số nguyên dương",
      "number.integer": "Mã máy bay phải là số nguyên dương",
      "number.positive": "Mã máy bay phải là số nguyên dương",
    }),
});
export const layMayBayQuerySchema = Joi.object({
    loaiMayBay: Joi.string().optional().messages({
      "string.base": "Loại máy bay phải là chuỗi",
    }),
});

export const taoMayBayBodySchema = Joi.object({
  maSanBay: Joi.number().integer().positive().required().messages({
    "number.base": "Mã sân bay phải là số nguyên dương",
    "number.integer": "Mã sân bay phải là số nguyên dương",
    "number.positive": "Mã sân bay phải là số nguyên dương",
    "any.required": "Vui lòng cung cấp mã sân bay",
  }),
  loaiMayBay: Joi.string().required().messages({
    "string.base": "Loại máy bay phải là chuỗi",
    "any.required": "Vui lòng cung cấp loại máy bay",
  }),
  slGheHang1: Joi.number().integer().positive().required().messages({
    "number.base": "Số ghế hạng 1 phải là số nguyên dương",
    "number.integer": "Số ghế hạng 1 phải là số nguyên dương",
    "number.positive": "Số ghế hạng 1 phải là số nguyên dương",
    "any.required": "Vui lòng cung cấp số ghế hạng 1",
  }),
  slGheHang2: Joi.number().integer().positive().required().messages({
    "number.base": "Số ghế hạng 2 phải là số nguyên dương",
    "number.integer": "Số ghế hạng 2 phải là số nguyên dương",
    "number.positive": "Số ghế hạng 2 phải là số nguyên dương",
    "any.required": "Vui lòng cung cấp số ghế hạng 2",
  }),
});
export const capNhatMayBayBodySchema = Joi.object({
  maSanBay: Joi.number().integer().positive().optional().messages({
    "number.base": "Mã sân bay phải là số nguyên dương",
    "number.integer": "Mã sân bay phải là số nguyên dương",
    "number.positive": "Mã sân bay phải là số nguyên dương",
  }),
  loaiMayBay: Joi.string().optional().messages({
    "string.base": "Loại máy bay phải là chuỗi",
  }),
  slGheHang1: Joi.number().integer().positive().optional().messages({
    "number.base": "Số ghế hạng 1 phải là số nguyên dương",
    "number.integer": "Số ghế hạng 1 phải là số nguyên dương",
    "number.positive": "Số ghế hạng 1 phải là số nguyên dương",
  }),
  slGheHang2: Joi.number().integer().positive().optional().messages({
    "number.base": "Số ghế hạng 2 phải là số nguyên dương",
    "number.integer": "Số ghế hạng 2 phải là số nguyên dương",
    "number.positive": "Số ghế hạng 2 phải là số nguyên dương",
  }),
});
export const capNhatMayBayParamsSchema = Joi.object({
  maMayBay: Joi.number().integer().positive().required().messages({
    "number.base": "Mã máy bay phải là số nguyên dương",
    "number.integer": "Mã máy bay phải là số nguyên dương",
    "number.positive": "Mã máy bay phải là số nguyên dương",
    "any.required": "Vui lòng cung cấp mã máy bay",
  }),
});

export const xoaMayBayParamsSchema = Joi.object({
  maMayBay: Joi.number().integer().positive().required().messages({
    "number.base": "Mã máy bay phải là số nguyên dương",
    "number.integer": "Mã máy bay phải là số nguyên dương",
    "number.positive": "Mã máy bay phải là số nguyên dương",
    "any.required": "Vui lòng cung cấp mã máy bay",
  }),
})
