import dotenv from "dotenv";
dotenv.config();
import { connectDB } from "./connection/db.js";
import express from "express";
import routes from "./routes/index.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import paymentRoutes from "./routes/payment.route.js";



const app = express();


app.use("/api/payment/webhook", express.raw({ type: "application/json" }));

app.use(express.json());
app.use(cookieParser());

const allowedOrigins = [
  //"http://localhost:5173",                           
  "https://e-commerce-frontend-sysmatixx.vercel.app"  // Replace with your EXACT live Vercel frontend URL
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps, curl, or Postman)
      if (!origin) return callback(null, true);
      
      if (allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, 
  })
);



app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 5001;
app.use("/api", routes);
app.use("/api/payment", paymentRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  connectDB();
});
