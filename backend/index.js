import express from "express";
import cors from "cors";
import pool from "./config/db.js";
import AuthRouter from "./routes/auth.routes.js";
import * as sanBayController from "./controllers/san_bay.controller.js";
import session from "express-session";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(
  session({
    secret: "899621", 
    resave: false, 
    saveUninitialized: false, 
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
      secure: false,
      httpOnly: true,
    },
  })
);


app.use("/auth", AuthRouter);


app.get("/", async (req, res) => {
  res.send("Hello World!");
});

app.get("/san-bay", sanBayController.getSanBay);
app.post("/san-bay", sanBayController.insertSanBay);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
