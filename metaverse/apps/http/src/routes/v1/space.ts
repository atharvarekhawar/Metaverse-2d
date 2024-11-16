import { Router } from "express";
export const spaceRouter = Router();

spaceRouter.get("/", async (req, res) => {
  res.json({ message: "space" });
});
