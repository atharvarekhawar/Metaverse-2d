import { Router } from "express";

export const userRouter = Router();

userRouter.post("/metadata", async (req, res) => {
  res.json({
    message: "metadata",
  });
});

userRouter.get("/metadata/bulk", async (req, res) => {
  res.json({
    Pmessage: "metadata bulk",
  });
});
