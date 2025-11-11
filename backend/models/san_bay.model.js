import sql from "../config/db.js";

class SanBayModel{
  constructor(MaSanBay, TenSanBay, DiaChi) {
    this.MaSanBay=MaSanBay,
    this.TenSanBay=TenSanBay,
    this.DiaChi=DiaChi
  }
}

export const getSanBay = async () => {
  try {
    const result = await sql.query(`SELECT * FROM SanBay`);
    console.log(result.recordset);
    return result.recordset.map((item) => new SanBayModel(item.MaSanBay, item.TenSanBay, item.DiaChi));
  } catch (err) {
    throw new Error(err.message);
  }
};

export const insertSanBay = async (sanBay) => {
  try {
    const { MaSanBay, TenSanBay, DiaChi } = sanBay;
    await sql.query`INSERT INTO SanBay (MaSanBay, TenSanBay, DiaChi) VALUES (${MaSanBay}, ${TenSanBay}, ${DiaChi})`;
  } catch (err) {
    throw new Error(err.message);
  }
};


