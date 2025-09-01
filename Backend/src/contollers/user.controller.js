import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js" 
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import jwt from "jsonwebtoken"
import mongoose from "mongoose";

// generate access token and refresh token 
const generateAccessAndRefreshTokens = async (userId) => {

    try {
        const user = await User.findById(userId)

        if(!user){
            throw new ApiError(404, "use not found while generating tokens")
        }

        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();
    
        // store refersh token in db
        user.refreshToken  = refreshToken
        
        await user.save({ validateBeforeSave: false }).catch(err => {
            console.error("Error saving refresh token:", err.message);
        });

        return {accessToken, refreshToken}
    } catch (error) {
        throw new ApiError(500, "something went wrong while generating access tokens and refresh tokens")
    }
}


const registerUser = asyncHandler( async (req, res) => {
    // get user data from req.body || frontend
    // validate user data -> not empty, email format, password strength
    // check if user already exists -> email, username
    // check for image file, check for avatar
    // upload them to cloudinary -> multer
    // create user object - create entry in db
    // remove password and refresh token field from reponse
    // check for user ccreation success
    // return response to frontend

    // destructure user data from req.body
    const {fullName, email, username, password} = req.body;
    console.log("email: ", email);

    // if(!fullName || !email || !username || !password){
    //     throw new ApiError(400, "All fields are required");
    // }

    // more robust validation
    if([fullName, email, username, password].some((field) => field?.trim() === "")){
        throw new ApiError(400, "All fields are required");
    }

    // email format validation
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if(!emailRegex.test(email)){
        throw new ApiError(400, "Invalid email format");
    }

    // password strength validation
    // Minimum eight characters, at least one letter, one number and one special character:
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    if(!passwordRegex.test(password)){
        throw new ApiError(400, "Password must be minimum eight characters, at least one letter, one number and one special character");
    }

    // check if user already exists
    const existedUser = await User.findOne({
        $or : [{ username }, { email }]
    })
    // conflict
    if(existedUser){
        throw new ApiError(409, "User already exists with this email or username");
    }
    console.log("existedUser: ", existedUser);

    // handle file - multer
    console.log("req.files: ", req.files);
    
    // check for avatar image
    const avatarLocalPath = req.files?.avatar?.[0]?.path;
    if (!avatarLocalPath) {
        throw new ApiError(400, "avatar image is required");
    }
    console.log("avatarLocalPath: ", avatarLocalPath);

    // upload on cloudinary
    const avatar = await uploadOnCloudinary(avatarLocalPath)
    console.log("avatar: ", avatar);
    
    // check if upload was successful
    if(!avatar){
        throw new ApiError(500, "Failed to upload avatar image");
    }

    // create user object - entry in db
    const newUser = await User.create({
        fullName,
        avatar: avatar.url,
        email,
        password,
        username: username.toLowerCase()
    })
    // check for user creation success
    if(!newUser){
        throw new ApiError(500, "Failed to create user");
    }
// remove password and refresh token from response
    const createdUser = await User.findById(newUser._id).select(
        "-password -refreshToken"
    )
// check for user creation success
    if(!createdUser){
        throw new ApiError(500, "something went wrong while creating user");
    }
// send success response
    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered Successfully")
    )

});

/**
  curl -X POST ^
  http://localhost:8080/api/v1/users/register ^
  -F "username=kamal1" ^
  -F "email=k@g.com" ^
  -F "password=kam@1234" ^
  -F "fullName=Kamal chandra" ^
  -F "avatar=@C:\Users\aser\OneDrive\Documents\rahul (1).jpg" 
  
*/


const loginUser = asyncHandler( async (req, res) => {
    // req.body -> data
    // username or email
    // find the use by -> username || email
    // password check
    // send cookie

    console.log(req.body);
    
    const {email, password, username} = req.body;

    // 1. input validation
    // if(!(email || username)){
    //     throw new ApiError(400, "username or email is required");
    // }
    if(!email && !username){
        throw new ApiError(400, "username or email is required")
    }
    if(!password){
        throw new ApiError(400, "password is required");
    }

    // 2. find user in DB vy email or usrname
    const user = await User.findOne({
        $or: [{username}, {email}]
    })

    if(!user){
        throw new ApiError(404, "user doesn't exist");
    }

    // 3. password check
    const isPasswordValid = await user.isPasswordCorrect(password);
    if(!isPasswordValid){
        throw new ApiError(401, "Invalid password credentials")
    }

    // 4. generate accessToken and refreshToken
    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id);

    // 5. send cookie
    const loggedInUser = await User.findById(user._id).select("-password -refreshToken");
    
    // 6. cookie options
    const options = {
        httpOnly: true, // preventes JS access
        secure: true
    };

    // 7. send response with cookies
    return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
        new ApiResponse(
            200,    // status
            {
                user: loggedInUser, accessToken, refreshToken   // data[]
            },
            "User loggedIn Successfully"    // msg
        )
    )

});

const logoutUser = asyncHandler(async (req, res) => {
    if(!req.user?._id){
        throw new ApiError(401, "Invalid user or alredy logged out");
    }

    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset:{
                refreshToken: 1
            }
        },
        {
            new : true
        }
    )

    const options = {
        httpOnly: true,
        secure: true
    }
    
    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(
            new ApiResponse(
                200,
                {},
                "User logged Out"
            )
        )
});

const refershAccessToken = asyncHandler(async(req,res)=>{
    const incomingRefreshhToken = req.cookies?.refreshToken || req.body.refreshToken

    if(!incomingRefreshhToken){
        throw new ApiError(401, "Unauthorized request, token missing");
    }

    // verify token
    try {
        const decodedToken = jwt.verify(
            incomingRefreshhToken,
            process.env.REFRESH_TOKEN_SECRET
        );
    
        // find user in db
        const user = await User.findById(decodedToken?._id)
        console.log("user: ", user);

        // check if user exists and refresh token matches
        if(!user || user.refreshToken !== incomingRefreshhToken){
            throw new ApiError(401, "Invalid refresh token or user not found");
        }
    
        // generate new access token
        const { accessToken , newRefreshToken } = await generateAccessAndRefreshTokens(user._id);
    
        const options = {
            httpOnly: true,
            secure: true
        }
    
        return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", newRefreshToken, options)
            .json(
                new ApiResponse(
                    200,
                    { accessToken, refreshToken: newRefreshToken },
                    "Access token refreshed successfully"
                )
            )
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid refresh token");
    }
})

export { registerUser, loginUser, logoutUser, refershAccessToken };