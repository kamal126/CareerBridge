import { Router } from "express";
import { registerUser,
            loginUser,
            logoutUser,
            refershAccessToken,
            updateCurrPassword

 } from "../contollers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import  { verifyJWT }  from "../middlewares/auth.middleware.js";

const router = Router();

// Register User
router.route("/register").post(
    upload.fields([{ name: "avatar", maxCount: 1 },]),
    registerUser
)

// Login User
router.route("/login").post(loginUser)

// secure routes
router.route("/logout").post(verifyJWT, logoutUser) // verifyJWT middleware to protect the route
router.route("/refresh-token").post(refershAccessToken) // no need to verifyJWT here as we are using refresh token
router.route("/password-change").post(verifyJWT, updateCurrPassword)


export default router;
