import express from "express";
import * as ChuyenBayController from "./chuyen_bay.controller.js";
import { validate } from "../../middlewares/base.validator.js";
import { sessionMiddleware } from "../../middlewares/session.middlewares.js";
import * as ChuyenBayValidator from "./chuyen_bay.validate.js";
import ValidateOption from "../../middlewares/base.validator.option.js";
const router = express.Router();

router.get("/",validate(ChuyenBayValidator.layChuyenBayQuerySchema,ValidateOption.QUERY),ChuyenBayController.layChuyenBay);
router.get("/lich",validate(ChuyenBayValidator.layLichChuyenBayQuerySchema,ValidateOption.QUERY),ChuyenBayController.layLichChuyenBay); 
router.get("/:maChuyenBay", validate(ChuyenBayValidator.layChuyenBayParamsSchema,ValidateOption.PARAMS),ChuyenBayController.layChuyenBay);
router.post("/", validate(ChuyenBayValidator.taoChuyenBayBodySchema),ChuyenBayController.taoChuyenBay);
router.put("/:maChuyenBay",
    validate(ChuyenBayValidator.capNhatChuyenBayParamsSchema,ValidateOption.PARAMS),
    validate(ChuyenBayValidator.capNhatChuyenBayBodySchema),ChuyenBayController.capNhatChuyenBay); 
router.delete("/:maChuyenBay", 
    validate(ChuyenBayValidator.xoaChuyenBayParamsSchema,ValidateOption.PARAMS),ChuyenBayController.xoaChuyenBay);

export default router;