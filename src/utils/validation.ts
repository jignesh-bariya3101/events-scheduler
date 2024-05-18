import { Request, Response, NextFunction } from "express";

export const validateEvent = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { title, startDate, endDate, recurrence, eventTime } = req.body;
  if (!title || !startDate || !endDate || !recurrence || !eventTime) {
    return res.status(400).json({ error: "All fields are required" });
  }
  next();
};
