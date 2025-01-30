import express from "express";
import cors from "cors";
import dogRoutes from "./routes/dog.js";
import authRoutes from "./routes/auth.js";

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET, POST, PUT, DELETE",
    credentials: true,
  })
);

app.use(express.json());
app.use("/api/", dogRoutes);
app.use("/api/auth", authRoutes);

app.listen(3001, () => {
  console.log("connected!");
});
