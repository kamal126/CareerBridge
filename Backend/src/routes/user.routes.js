import { Router } from "express";
import { registerUser } from "../contollers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

// Register User
router.route("/register").post(
    upload.fields([{ name: "avatar", maxCount: 1 },]),
    registerUser
)

export default router;
