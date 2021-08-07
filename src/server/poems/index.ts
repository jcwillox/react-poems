import express, { NextFunction, Request, Response, Router } from "express";
import { poemStore } from "./store";

const router = Router();

/* a very basic authentication middleware */
router.use((req: Request, res: Response, next: NextFunction) => {
  if (req.headers["bob"] !== "Bobalooba") {
    return res.sendStatus(401);
  }
  next();
});

/* automatically decode requests with a json body */
router.use(express.json());

router.get("/ping", function (req: Request, res: Response) {
  return res.send("pong");
});

router.get("/poems", (req: Request, res: Response) => {
  return res.json(poemStore.all());
});

router.post("/poems", (req: Request, res: Response) => {
  poemStore.add(req.body);
  return res.sendStatus(200);
});

router.get("/poems/:id", (req: Request, res: Response) => {
  return res.json(poemStore.get(req.params["id"]) || {});
});

export default router;
