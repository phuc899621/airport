import Joi from "joi";

export const dangKySchema = Joi.object({
  email: Joi.string().email().required(),
  matKhau: Joi.string().required(),
  tenDangNhap: Joi.string().required(),
});

export const xacThucTaiKhoanSchema = Joi.object({
  email: Joi.string().email().required(),
  otp: Joi.string().min(4).max(4).required(),
});

export const dangNhapSchema = Joi.object({
  identifier: Joi.string().required(),
  matKhau: Joi.string().required(),
});

export const quenMatKhauSchema = Joi.object({
  email: Joi.string().email().required(),
});

export const xacThucQuenMatKhauSchema = Joi.object({
  email: Joi.string().email().required(),
  otp: Joi.string().min(4).max(4).required(),
});

export const taoMoiMatKhauSchema = Joi.object({
  token: Joi.string().required(),
  matKhau: Joi.string().required(),
});
