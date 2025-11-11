import * as sanBayModel from "../models/san_bay.model.js";

export const getSanBay = async (req, res) => {
    try {
        const result = await sanBayModel.getSanBay();
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const insertSanBay = async (req, res) => {
    try{
        const { MaSanBay, TenSanBay, DiaChi } = req.body;
        const result = await sanBayModel.insertSanBay({ MaSanBay, TenSanBay, DiaChi });
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}