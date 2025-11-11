import express from "express";
import sql, {connectDB} from "./config/db.js";
import * as sanBayController from "./controllers/san_bay.controller.js";

const app = express();
const PORT = 3000;

await connectDB();

app.use(express.json());


app.get("/", async (req, res) => {
  try {
    const result = await sql.query`SELECT GETDATE() AS currentTime`;
    res.json(result.recordset[0]);
  } catch (err) {
    console.error("Query error:", err);
    res.status(500).json({ error: err.message });
  }
});

app.get("/san-bay", sanBayController.getSanBay);
app.post("/san-bay", sanBayController.insertSanBay);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
