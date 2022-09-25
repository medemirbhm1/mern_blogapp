import express from "express";
import { config } from "dotenv";
import postRoutes from "./routes/postRoutes.mjs";
import categoryRoutes from "./routes/categoryRoutes.mjs";
import { connectDB } from "./config/db.mjs";
import "colors";

//getting env variables
config();
//connecting to db
connectDB();

const port = process.env.PORT;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api/posts", postRoutes);
app.use("/api/categories", categoryRoutes)
app.listen(port, () => {
  console.log(`server listening on:${port}`);
});