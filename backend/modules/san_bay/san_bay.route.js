import express from "express";
import { validate } from "../../middlewares/base.validator.js";
import * as SanBayController from "./san_bay.controller.js";
import * as SanBayValidator from "./san_bay.validate.js";
import { adminMiddleware } from "../../middlewares/session.middlewares.js";
import ValidateOption from "../../middlewares/base.validator.option.js";

const router = express.Router();

router.get("/", validate(SanBayValidator.laySanBayQuerySchema,ValidateOption.QUERY),SanBayController.laySanBay); 
router.get("/:maSanBay", validate(SanBayValidator.laySanBayParamsSchema,ValidateOption.PARAMS),SanBayController.laySanBay);
router.post("/", validate(SanBayValidator.taoSanBayBodySchema),SanBayController.taoSanBay); 
router.put("/:maSanBay",
    validate(SanBayValidator.capNhatSanBayParamsSchema,ValidateOption.PARAMS),
    validate(SanBayValidator.capNhatSanBayBodySchema),SanBayController.capNhatSanBay); 
router.delete("/:maSanBay", 
    validate(SanBayValidator.xoaSanbayParamsSchema,ValidateOption.PARAMS),SanBayController.xoaSanBay);

export default router;