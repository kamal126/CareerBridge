import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js" 
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";




const registerUser = asyncHandler( async (req, res) => {
    // get user data from req.body || frontend
    // validate user data -> not empty, email format, password strength
    // check if user already exists -> email, username
    // check for image file, check for avtar
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
    
    // check for avtar image
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
        throw new ApiError(500, "Failed to upload avtar image");
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

})

/**
  curl -X POST ^
  http://localhost:8080/api/v1/users/register ^
  -F "username=kamal1" ^
  -F "email=k@g.com" ^
  -F "password=kam@1234" ^
  -F "fullName=Kamal chandra" ^
  -F "avatar=@C:\Users\aser\OneDrive\Documents\rahul (1).jpg" 
  
*/

export { registerUser };