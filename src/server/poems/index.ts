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

router.get("/ping", (req: Request, res: Response) => {
  return res.send("pong");
});

router.post("/poems/upvote/:id", (req: Request, res: Response) => {
  if (poemStore.upvote(req.params["id"])) {
    return res.sendStatus(200);
  }
  return res.sendStatus(404);
});

router.post("/poems/downvote/:id", (req: Request, res: Response) => {
  if (poemStore.downvote(req.params["id"])) {
    return res.sendStatus(200);
  }
  return res.sendStatus(404);
});

router.get("/poems", (req: Request, res: Response) => {
  return res.json(poemStore.all());
});

router.post("/poems", (req: Request, res: Response) => {
  return res.json(poemStore.add(req.body));
});

router.get("/poems/:id", (req: Request, res: Response) => {
  return res.json(poemStore.get(req.params["id"]) || {});
});

export default router;
