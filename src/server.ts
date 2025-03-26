import express, { Express } from "express";
import dotenv from "dotenv";
import cors from "cors";
import userRouter from "./routes/userRoutes";


import swaggerUi from "swagger-ui-express";
import specs from "./swagger-config";
import  connectDB  from "./config/db";
import categoryRouter from "./routes/categoryRoutes";
import productRouter from "./routes/productRoutes";

dotenv.config({ path: "./.env" });
const app: Express = express();

const port = process.env.PORT;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
app.use(userRouter);
app.use('/categories', categoryRouter);
app.use('/products', productRouter);





const start = async () => {

  // Connect to MongoDB
connectDB();
 
  app.listen(port, async () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
  });
};

start();
