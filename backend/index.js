import express from "express";
import cors from "cors";
import postRouter from "./routes/postRoutes.js";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", postRouter);

app.listen(PORT, () => {
  console.log(`Servidor en localhost:${PORT}`);
});
