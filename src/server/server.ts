import express, { Express, Request, Response } from "express";
import poems from "./poems";
import cors from "cors";
import morgan from "morgan";

const app: Express = express();
const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

app.use(express.static("build"));
app.use(cors());
app.use("/api", poems);

app.get("*", (req: Request, res: Response) => {
  res.sendFile("build/index.html");
});

app.listen(PORT, () => {
  console.log(`server started at http://localhost:${PORT}`);
});
