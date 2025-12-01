import express from "express";
import * as ChuyenBayController from "./chuyen_bay.controller.js";
import { validate } from "../../middlewares/base.validator.js";
import { sessionMiddleware } from "../../middlewares/session.middlewares.js";
const router = express.Router();

router.get("/lich", sessionMiddleware,ChuyenBayController.getLichChuyenBay); 

export default router;