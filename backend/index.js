import express from "express";
import cors from "cors";

import AuthRouter from "./routes/auth.route.js";
import ChuyenBayRouter from "./routes/chuyen_bay.route.js";

import * as sanBayController from "./controllers/san_bay.controller.js";
import session from "express-session";
import setupSwagger from "./docs/swagger.js";


const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

setupSwagger(app);
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
app.use("/chuyen-bay", ChuyenBayRouter);


app.get("/", async (req, res) => {
  res.send("Hello World!");
});

app.get("/san-bay", sanBayController.getSanBay);
app.post("/san-bay", sanBayController.insertSanBay);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
