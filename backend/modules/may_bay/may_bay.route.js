import express from "express";
import { validate } from "../../middlewares/base.validator.js";
import * as MayBayController from "./may_bay.controller.js";
import * as MayBayValidator from "./may_bay.validate.js";
import ValidateOption from "../../middlewares/base.validator.option.js";

const router = express.Router();

router.get("/",validate(MayBayValidator.layMayBayQuerySchema,ValidateOption.QUERY),MayBayController.layMayBay); 
router.get("/:maMayBay", validate(MayBayValidator.layMayBayParamsSchema,ValidateOption.PARAMS),MayBayController.layMayBay);
router.post("/", validate(MayBayValidator.taoSanBayBodySchema),MayBayController.taoMayBay); 
router.put("/:maMayBay",
    validate(MayBayValidator.capNhatSanBayParamsSchema,ValidateOption.PARAMS),
    validate(MayBayValidator.capNhatSanBayBodySchema),MayBayController.capNhatMayBay); 
router.delete("/:maMayBay", 
    validate(MayBayValidator.xoaSanbayParamsSchema,ValidateOption.PARAMS),MayBayController.xoaMayBay);

export default router;