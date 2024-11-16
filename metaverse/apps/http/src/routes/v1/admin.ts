import { Router } from "express";
export const adminRouter = Router();

adminRouter.post("/element", async (req, res) => {
  res.json({
    message: "element",
  });
});

adminRouter.put("/element/:elementId", (req, res) => {
  res.json({ message: "Element updated" });
});

adminRouter.post("/avatar", async (req, res) => {
  res.json({ message: "avatar" });
});

adminRouter.post("/map", async (req, res) => {
  res.json({
    message: "map",
  });
});
