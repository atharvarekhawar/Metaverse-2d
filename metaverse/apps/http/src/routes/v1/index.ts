const express = require("express");
export const router = express.Router();
import { userRouter } from "./user";
import { spaceRouter } from "./space";
import { adminRouter } from "./admin";

router.get("/signup", async ({ req, res }: any) => {
  res.json({
    message: "signup",
  });
});

router.get("/signin", async ({ req, res }: any) => {
  res.json({
    message: "signin",
  });
});

router.get("/elements", async ({ req, res }: any) => {
  res.json({
    message: "elements",
  });
});

router.get("/avatars", async ({ req, res }: any) => {
  res.json({
    message: "avatars",
  });
});

router.use("/user", userRouter);
router.use("/space", spaceRouter);
router.use("/admin", adminRouter);
