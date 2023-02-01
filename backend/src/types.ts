import { Session } from "express-session";
import { Request, Response } from "express";

export type Context = {
  req: Request & { session?: Session & { userId?: number } };
  res: Response;
};
