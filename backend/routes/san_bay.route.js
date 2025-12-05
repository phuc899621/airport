import express from "express";
import * as sanBayController from "../controllers/san_bay.controller.js";

const router = express.Router();

router.get("/", sanBayController.getSanBay);
router.post("/", sanBayController.insertSanBay);

export default router;
