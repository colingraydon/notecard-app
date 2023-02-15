import { Session } from "express-session";
import { Request, Response } from "express";
import { Redis } from "ioredis";

export type Context = {
  req: Request & { session?: Session & { userId?: number } };
  res: Response;
  redis: Redis;
};
