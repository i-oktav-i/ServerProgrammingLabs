import { NextFunction, Request, Response } from "express";

export const checkPermissionMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.user?.group === 0) next();
  else {
    res.status(403).json({ error: "Permission denied" });
  }
};
