import { NextFunction, Request, Response } from "express";
const { Router, json } = require("express");
const cors = require("cors");
import { initRoutes } from "../routes";

const router = Router();

router.use(cors());
router.use(json({}));
router.use((req: Request, res: Response, next: NextFunction) => {
  res.timeStarted = process.hrtime();
  next();
});

initRoutes(router);
router.proxy = true;

export default router;
