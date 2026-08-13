import express from "express";
import cors from "cors";
import booksRouter from "./entities/books/route";
import { errorHandler, notFoundHandler } from "./middleware/errorHandler";
import config from "./config/config";

const app = express();

app.use(cors({ origin: config.corsOrigin }));

app.use(express.json());

app.get("/api", (req, res) => {
  res.send("Hello from Books Explorer API!");
});

app.use("/api/books", booksRouter);

app.use(notFoundHandler);

app.use(errorHandler);

const PORT = 4000;

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
