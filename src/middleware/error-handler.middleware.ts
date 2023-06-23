import { Request, Response, NextFunction } from "express";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err.stack);
  if (err instanceof Error) {
    return res.status(400).send({ message: err.message });
  }
  return res.status(500).send({message: "Something went wrong"});
};
