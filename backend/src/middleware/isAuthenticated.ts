import { Context } from "../types";
import { MiddlewareFn } from "type-graphql";

//type-graphql middleware. this will run before any resolver, if called
//passes in
export const isAuthenticated: MiddlewareFn<Context> = ({ context }, next) => {
  if (!context.req.session.userId) {
    throw new Error("not authenticated");
  }

  return next();
};
