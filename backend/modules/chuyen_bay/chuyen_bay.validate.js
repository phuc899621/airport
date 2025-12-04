import joi from "joi";

export const layLichChuyenBayQuerySchema = joi.object({
    maChuyenBay: joi.number().integer().positive().optional().messages({
      "number.base": "Mã chuyến bay phải là số nguyên dương",
      "number.integer": "Mã chuyến bay phải là số nguyên dương",
      "number.positive": "Mã chuyến bay phải là số nguyên dương",
    }),
    maSanBayDi: joi.number().integer().positive().optional().messages({
      "number.base": "Mã sân bay đi phải là số nguyên dương",
      "number.integer": "Mã sân bay đi phải là số nguyên dương",
      "number.positive": "Mã sân bay đi phải là số nguyên dương",
    }),
    maSanBayDen: joi.number().integer().positive().optional().messages({
      "number.base": "Mã sân bay đến phải là số nguyên dương",
      "number.integer": "Mã sân bay đến phải là số nguyên dương",
      "number.positive": "Mã sân bay đến phải là số nguyên dương",
    }),
    maMayBay: joi.number().integer().positive().optional().messages({
        "number.base": "Mã máy bay phải là số nguyên dương",
        "number.integer": "Mã máy bay phải là số nguyên dương",
        "number.positive": "Mã máy bay phải là số nguyên dương",
    }),
    loaiMayBay: joi.string().optional().messages({
        "string.base": "Loai máy bay phải là chuỗi",
    }),
    ngayGio: joi.date().iso().optional().messages({
        "date.base": "Ngày giờ bay phải là kiểu ngày hợp lệ",
        "date.iso": "Ngày giờ bay phải đúng chuẩn ISO",
    }),
    maHienThi: joi.string().optional().messages({
        "string.base": "Mã hiển thị phải là một chuỗi",
    }),
    tenSanBayDi: joi.string().optional().messages({
        "string.base": "Tên sân bay đi phải là một chuỗi",
    }),
    tenSanBayDen: joi.string().optional().messages({
        "string.base": "Tên sân bay đến phải là một chuỗi",
    }),

})

export const layChuyenBayQuerySchema = joi.object({
    maSanBayDi: joi.number().integer().positive().optional().messages({
      "number.base": "Mã sân bay đi phải là số nguyên dương",
      "number.integer": "Mã sân bay đi phải là số nguyên dương",
      "number.positive": "Mã sân bay đi phải là số nguyên dương",
    }),
    maSanBayDen: joi.number().integer().positive().optional().messages({
      "number.base": "Mã sân bay đến phải là số nguyên dương",
      "number.integer": "Mã sân bay đến phải là số nguyên dương",
      "number.positive": "Mã sân bay đến phải là số nguyên dương",
    }),
    maMayBay: joi.number().integer().positive().optional().messages({
        "number.base": "Mã máy bay phải là số nguyên dương",
        "number.integer": "Mã máy bay phải là số nguyên dương",
        "number.positive": "Mã máy bay phải là số nguyên dương",
    }),
    ngayGio: joi.date().iso().optional().messages({
        "date.base": "Ngày giờ bay phải là kiểu ngày hợp lệ",
        "date.iso": "Ngày giờ bay phải đúng chuẩn ISO",
    }),
    maHienThi: joi.string().optional().messages({
        "string.base": "Mã hiển thị phải là một chuỗi",
    })
})

export const layChuyenBayParamsSchema = joi.object({
    maChuyenBay: joi.number().integer().positive().optional().messages({
        "number.base": "Mã chuyến bay phải là số nguyên dương",
        "number.integer": "Mã chuyến bay phải là số nguyên dương",
        "number.positive": "Mã chuyến bay phải là số nguyên dương",
    })
    
})

export const taoChuyenBayBodySchema = joi.object({
    maSanBayDi: joi.number().integer().positive().required().messages({
      "number.base": "Mã sân bay đi phải là số nguyên dương",
      "number.integer": "Mã sân bay đi phải là số nguyên dương",
      "number.positive": "Mã sân bay đi phải là số nguyên dương",
      "any.required": "Vui lòng cung cấp mã sân bay đi",
    }),
    maSanBayDen: joi.number().integer().positive().required().messages({
      "number.base": "Mã sân bay đến phải là số nguyên dương",
      "number.integer": "Mã sân bay đến phải là số nguyên dương",
      "number.positive": "Mã sân bay đến phải là số nguyên dương",
      "any.required": "Vui lòng cung cấp mã sân bay đến",
    }),
    maMayBay: joi.number().integer().positive().required().messages({
        "number.base": "Mã máy bay phải là số nguyên dương",
        "number.integer": "Mã máy bay phải là số nguyên dương",
        "number.positive": "Mã máy bay phải là số nguyên dương",
        "any.required": "Vui lòng cung cấp mã máy bay",
    }),
    ngayGio: joi.date().iso().required().messages({
        "date.base": "Ngày giờ bay phải là kiểu ngày hợp lệ",
        "date.iso": "Ngày giờ bay phải đúng chuẩn ISO",
        "any.required": "Vui lòng cung cấp ngày giờ bay",
    }),
    thoiGianBay: joi.number().integer().positive().required().messages({
        "number.base": "Thời gian bay phải là số nguyên dương",
        "number.integer": "Thời gian bay phải là số nguyên dương",
        "number.positive": "Thời gian bay phải là số nguyên dương",
        "any.required": "Vui lòng cung cấp thời gian bay",
    }),
    maHienThi: joi.string().required().messages({
        "string.base": "Mã hiển thị phải là một chuỗi",
        "any.required": "Vui lòng cung cấp mã hiển thị",
    }),
    giaVe: joi.number().integer().positive().required().messages({
        "number.base": "Giá vé phải là số nguyên dương",
        "number.integer": "Giá vé phải là số nguyên dương",
        "number.positive": "Giá vé phải là số nguyên dương",
        "any.required": "Vui lòng cung cấp giá vé",
    }),
})

export const capNhatChuyenBayBodySchema = joi.object({
    maSanBayDi: joi.number().integer().positive().optional().messages({
      "number.base": "Mã sân bay đi phải là số nguyên dương",
      "number.integer": "Mã sân bay đi phải là số nguyên dương",
      "number.positive": "Mã sân bay đi phải là số nguyên dương",
    }),
    maSanBayDen: joi.number().integer().positive().optional().messages({
      "number.base": "Mã sân bay đến phải là số nguyên dương",
      "number.integer": "Mã sân bay đến phải là số nguyên dương",
      "number.positive": "Mã sân bay đến phải là số nguyên dương",
    }),
    maMayBay: joi.number().integer().positive().optional().messages({
        "number.base": "Mã máy bay phải là số nguyên dương",
        "number.integer": "Mã máy bay phải là số nguyên dương",
        "number.positive": "Mã máy bay phải là số nguyên dương",
    }),
    ngayGio: joi.date().iso().optional().messages({
        "date.base": "Ngày giờ bay phải là kiểu ngày hợp lệ",
        "date.iso": "Ngày giờ bay phải đúng chuẩn ISO",
    }),
    thoiGianBay: joi.number().integer().positive().optional().messages({
        "number.base": "Thoi gian bay phai la so nguyen duong",
        "number.integer": "Thoi gian bay phai la so nguyen duong",
        "number.positive": "Thoi gian bay phai la so nguyen duong",
    }),
    maHienThi: joi.string().optional().messages({
        "string.base": "Mã hiển thị phải là một chuỗi",
    }),
    giaVe: joi.number().integer().positive().optional().messages({
        "number.base": "Giá vé phải là số nguyên dương",
        "number.integer": "Giá vé phải là số nguyên dương",
        "number.positive": "Giá vé phải là số nguyên dương",
    }),
})

export const capNhatChuyenBayParamsSchema = joi.object({
    maChuyenBay: joi.number().integer().positive().required().messages({
        "number.base": "Mã chuyến bay phải là số nguyên dương",
        "number.integer": "Mã chuyến bay phải là số nguyên dương",
        "number.positive": "Mã chuyến bay phải là số nguyên dương",
        "any.required": "Vui lòng cung cấp mã chuyến bay",
    })
})

export const xoaChuyenBayParamsSchema= joi.object({
    maChuyenBay: joi.number().integer().positive().required().messages({
        "number.base": "Mã chuyến bay phải là số nguyên dương",
        "number.integer": "Mã chuyến bay phải là số nguyên dương",
        "number.positive": "Mã chuyến bay phải là số nguyên dương",
        "any.required": "Vui lòng cung cấp mã chuyến bay",
    })
})