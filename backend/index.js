import express from "express";
import AuthRouter from "./modules/auth/auth.route.js";
import ChuyenBayRouter from "./modules/chuyen_bay/chuyen_bay.route.js";
import SanBayRouter from "./modules/san_bay/san_bay.route.js";
import MayBayRouter from "./modules/may_bay/may_bay.route.js";
import session from "express-session";
import setupSwagger from "./docs/swagger.js";


const app = express();
const PORT = 3000;

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
app.use("/san-bay", SanBayRouter);
app.use("/may-bay", MayBayRouter);


app.get("/", async (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
