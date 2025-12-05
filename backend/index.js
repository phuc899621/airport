import express from "express";
import AuthRouter from "./modules/auth/auth.route.js";
import ChuyenBayRouter from "./modules/chuyen_bay/chuyen_bay.route.js";
import SanBayRouter from "./modules/san_bay/san_bay.route.js";
import session from "express-session";
import setupSwagger from "./docs/swagger.js";


const app = express();
const PORT = 3000;

// CORS middleware - QUAN TRỌNG: Phải đặt trước tất cả routes
app.use((req, res, next) => {
  const allowedOrigins = ['http://localhost:5173', 'http://localhost:5174'];
  const origin = req.headers.origin;
  
  if (allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');
  
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

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


app.get("/", async (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
