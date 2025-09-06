import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken"
import { User } from "../models/user.model.js";

export const verifyJWT = asyncHandler( async (req, _, next) => {    // - -> res agar res ka use na ho to _ likh sakte hai
    try {
        const token = req.cookies?.accessToken || req.header("Authorizaation")?.replace("Bearer ", "");
    
        console.log("token: ", token);
        
    
        // 1. check if token is provided
        if(!token){
            throw new ApiError(401, "Unauthorized request, token missing");
        }
    
         
        const decodeToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    
        const user = await User.findById(decodeToken?._id).select("-password -refreshToken");
    
        if(!user){
            throw new ApiError(401, "Invalid access token or user not found");
        }
    
        req.user = user;
    
        next()
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid access token");
        
    }
})


