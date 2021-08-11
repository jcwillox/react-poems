import express, { Express, NextFunction, Request, Response } from "express";
import poems from "./poems";
import cors from "cors";

const app: Express = express();
const PORT = process.env.PORT || 5000;

app.use(express.static("build"));
app.use(cors());

/* basic logging handler */
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(req.url);
  next();
});

app.use("/api", poems);

app.get("*", (req: Request, res: Response) => {
  res.sendFile("build/index.html");
});

app.listen(PORT, () => {
  console.log(`server started at http://localhost:${PORT}`);
});
