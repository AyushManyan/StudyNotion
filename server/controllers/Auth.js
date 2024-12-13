// const User = require("../models/User");
// const OTP = require("../models/OTP");
// const otpGenerator = require("otp-generator");
// const bycrpt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// const { passwordUpdated } = require("../mail/templates/passwordUpdate")
// const Profile = require("../models/Profile")
// const mailSender = require("../utils/mailSender")
// require("dotenv").config();

// // Send otp

// // exports.sendotp = async(req,res) =>{
// //     try {
// //             // fetch email from request body
// //         const {email} = req.body;

// //         // check if user already exit
// //         const checkUserPresent = await User.findOne({email});

// //         // if user already exit, then return 
        
// //         if(checkUserPresent){
// //             return res.status(401).json({
// //                 success:false,
// //                 message:"User Already registered"
// //             })
// //         }

// //         // generate otp

// //         var otp = otpGenerator.generate(6,{
// //             upperCaseAlphabets:false,
// //             lowerCaseAlphabets:false,
// //             specialChars:false,
// //         });

// //         console.log("otp generated: ",otp);

// //         // check unique otp or not 

// //         let result = await OTP.findOne({otp:otp});

// //         while(result){
// //             otp = otpGenerator(6,{
// //                 upperCaseAlphabets:false,
                
// //             });
           
// //         }

// //         const otpPayload = {email,otp};
       
// //         // create an entry in db for otp
// //         const otpBody = await OTP.create(otpPayload);
// //         console.log(otpBody);

// //         // return response successful

// //         res.status(200).json({
// //             success:true,
// //             message:"OTP sent Successfuly",
// //             otp
// //         });
        
    
// //     } catch (error) {
// //         console.log(error);
// //         return res.status(500).json({
// //             success:false,
// //             message:error.message
// //         })
        
        
// //     }
// // };

// exports.sendotp = async (req, res) => {
//     try {
//         // Fetch email from request body
//         const { email } = req.body;

//         // Check if user already exists
//         const checkUserPresent = await User.findOne({ email });

//         // If user already exists, return an error response
//         if (checkUserPresent) {
//             return res.status(401).json({
//                 success: false,
//                 message: "User already registered",
//             });
//         }

//         // Generate OTP
//         let otp = otpGenerator.generate(6, {
//             upperCaseAlphabets: false,
//             lowerCaseAlphabets: false,
//             specialChars: false,
//         });

//         console.log("OTP generated: ", otp);

//         // Check if the generated OTP is unique
//         let result = await OTP.findOne({ otp });

//         while (result) {
//             otp = otpGenerator.generate(6, {
//                 upperCaseAlphabets: false,
//                 lowerCaseAlphabets: false,
//                 specialChars: false,
//             });
//             result = await OTP.findOne({ otp });
//         }

//         const otpPayload = { email, otp };

//         // Create an entry in the database for the OTP
//         const otpBody = await OTP.create(otpPayload);
//         console.log(otpBody);

//         // Send OTP to the user's email
//         await mailSender(
//             email,
//             "Your OTP Code",
//             `Your OTP code is ${otp}. It will expire in 10 minutes.`
//         );

//         // Return a successful response
//         res.status(200).json({
//             success: true,
//             message: "OTP sent successfully",
//         });
//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({
//             success: false,
//             message: error.message,
//         });
//     }
// };



// // signUp

// exports.signup = async(req,res)=>{
//     try {
//         // step==>
//         // data fetch from request body
//         const {
//             firstName,
//             lastName,
//             email,
//             password,
//             confirmPassword,
//             accountType,
//             contactNumber,
//             otp
//         } = req.body;
//         // validate krlo
//         if(!firstName || !lastName || !email || !password || !confirmPassword || !otp || !contactNumber){
//             return res.status(403).json({
//                 success:false,
//                 message:"All fields are required"
//             });
//         } 
//         // 2 password match kro
//         if(password !== confirmPassword){
//             return res.status(400).json({
//                 success:false,
//                 message:"Password and confirm password not match"
//             });
//         }
//         // check user already exist or not
//         const existingUser = await User.findOne({email});
//         if(existingUser){
//             return res.status(400).json({
//                 success:false,
//                 message:"User already registered"
//             });
//         }

//         // find most recent otp stored for the use
//         const recentOtp = await OTP.find({email}).sort({createdAt:-1}).limit(1);
//         console.log(recentOtp);
        
//         // validate otp

//         if(recentOtp.length == 0){
//             // not found
//             return res.status(400).json({
//                 success:false,
//                 message:"OTP not found"
//             });
//         }else if(otp !== recentOtp.otp){
//             return res.status(400).json({
//                 success:false,
//                 message:"Invalid OTP"
//             });
//         }
//         // hash password
//         const hashedPassword = await bycrpt.hash(password,10);
        
//          // Create the user
//     let approved = ""
//     approved === "Instructor" ? (approved = false) : (approved = true)


//         // entry create in db

//         const profileDetails = await Profile.create({
//             gender:null,
//             dateOfBirth:null,
//             about:null,
//             contactNumber:null,
//         });

//         const user = await User.create({
//             firstName,
//             lastName,
//             email,
//             contactNumber,
//             password:hashedPassword,
//             accountType,
//             additionalDetails:profileDetails._id,
//             image:`https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
//         })

//         // return response

//         return res.status(200).json({
//             success:true,
//             message:"user is registered successfully",
//             user
//         });

//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({
//             success:false,
//             message:"user cannot be registered. Please try again"
//         })
                
//     }
// }



// //   login

// exports.login = async (res,req)=>{
//     try {
//         // get data from body
//         const {email , password} = req.body;
//         // validation

//         if(!email || !password){
//             return res.status(403).json({
//                 success:false,
//                 message:"All fields are required, try again "
//             })
//         }

//         // check user exist or not
//         const user = await User.findOne({email}).populate("additionalDeatils");
//         if(!user){
//             return res.status(401).json({
//                 success:false,
//                 message:"User is not registered, please signup first",
//             });
//         }

//         // generate jwt , after password matching

//         if(await bycrpt.compare(password,user.password)){

//             const payload = {
//                 email: user.email,
//                 id:user._id,
//                 accountType:user.accountType
//             }
//             const token = jwt.sign(payload, process.env.JWT_SECRET, {
//                 expiresIn:"2h",

//             });

//             // Save token to user document in database
//             user.token = token;
//             user.password = undefined;
//             // create cookies and send response
//             const options = {
//                 expiresIn: new Date(Date.now()+3*24*60*60*1000),
//                 httpOnly: true
//             }

//             res.cookie("token", token,options).status(200).json({
//                 success:true,
//                 token,
//                 user,
//                 message:"Logged in Successfully"
//             })

//         }else{
//             return res.status(401).json({
//                 success:false,
//                 message:"Password is incorrect"
//             })
//         }


//     } catch (error) {
        
//         console.log(error);
//         return res.status(500).json({
//             success:flase,
//             message:"Login Failure, Please try again"
//         })
        
//     }
// };


// // change password-----------------------------------------------------

// exports.changePassword = async (req,res)=>{
//     try {
//             // get dtata from body
//         const userDetails = await User.findById(req.user.id);
//         // get oldpassword , newpassword, confirm new password
//         const {oldPassword , newPassword} = req.body;

//         // validation
//         const isPassword = await bycrpt.compare(
//             oldPassword,
//             userDetails.password
//         )
//         if(!isPassword){
//             return res.status(401).json({
//                 success:flase,
//                 message:"Old password not correct"
//             })
//         }
//         // update pwd in db

//         const encryptedPassword = await bycrpt.hash(newPassword,10);
//         const updatedUserDetails = await User.findByIdAndUpdate(
//             req.user.id,
//             {password:encryptedPassword},
//             {new:true}
//         )
//         // send email,

//         // Send notification email
//         try {
//             const emailResponse = await mailSender(
//             updatedUserDetails.email,
//             "Password for your account has been updated",
//             passwordUpdated(
//                 updatedUserDetails.email,
//                 `Password updated successfully for ${updatedUserDetails.firstName} ${updatedUserDetails.lastName}`
//             )
//             )
//             console.log("Email sent successfully:", emailResponse.response)
//         } catch (error) {
//             // If there's an error sending the email, log the error and return a 500 (Internal Server Error) error
//             console.error("Error occurred while sending email:", error)
//             return res.status(500).json({
//             success: false,
//             message: "Error occurred while sending email",
//             error: error.message,
//             })
//         }
//     } catch (error) {
//         // If there's an error updating the password, log the error and return a 500 (Internal Server Error) error
//         console.error("Error occurred while updating password:", error)
//         return res.status(500).json({
//         success: false,
//         message: "Error occurred while updating password",
//         error: error.message,
//         })
        
//     }
// }




// // ---------------------original code--------------





const bcrypt = require("bcrypt")
const User = require("../models/User")
const OTP = require("../models/OTP")
const jwt = require("jsonwebtoken")
const otpGenerator = require("otp-generator")
const mailSender = require("../utils/mailSender")
const { passwordUpdated } = require("../mail/templates/passwordUpdate")
const Profile = require("../models/Profile")
require("dotenv").config()

// Signup Controller for Registering USers

exports.signup = async (req, res) => {
  try {
    // Destructure fields from the request body
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      accountType,
      contactNumber,
      otp,
    } = req.body
    // Check if All Details are there or not
    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !confirmPassword ||
      !otp
    ) {
      return res.status(403).send({
        success: false,
        message: "All Fields are required",
      })
    }
    // Check if password and confirm password match
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message:
          "Password and Confirm Password do not match. Please try again.",
      })
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists. Please sign in to continue.",
      })
    }

    // Find the most recent OTP for the email
    const response = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1)
    // console.log(response)
    if (response.length === 0) {
      // OTP not found for the email
      return res.status(400).json({
        success: false,
        message: "The OTP is not valid",
      })
    } else if (otp !== response[0].otp) {
      // Invalid OTP
      return res.status(400).json({
        success: false,
        message: "The OTP is not valid",
      })
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create the user
    let approved = ""
    approved === "Instructor" ? (approved = false) : (approved = true)

    // Create the Additional Profile For User
    const profileDetails = await Profile.create({
      gender: null,
      dateOfBirth: null,
      about: null,
      contactNumber: null,
    })
    const user = await User.create({
      firstName,
      lastName,
      email,
      contactNumber,
      password: hashedPassword,
      accountType: accountType,
      approved: approved,
      additionalDetails: profileDetails._id,
      image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
    })

    return res.status(200).json({
      success: true,
      user,
      message: "User registered successfully",
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      success: false,
      message: "User cannot be registered. Please try again.",
    })
  }
}

// Login controller for authenticating users
exports.login = async (req, res) => {
  try {
    // Get email and password from request body
    const { email, password } = req.body

    // Check if email or password is missing
    if (!email || !password) {
      // Return 400 Bad Request status code with error message
      return res.status(400).json({
        success: false,
        message: `Please Fill up All the Required Fields`,
      })
    }

    // Find user with provided email
    const user = await User.findOne({ email }).populate("additionalDetails")

    // If user not found with provided email
    if (!user) {
      // Return 401 Unauthorized status code with error message
      return res.status(401).json({
        success: false,
        message: `User is not Registered with Us Please SignUp to Continue`,
      })
    }

    // Generate JWT token and Compare Password
    if (await bcrypt.compare(password, user.password)) {
      const token = jwt.sign(
        { email: user.email, id: user._id, role: user.role },
        process.env.JWT_SECRET,
        {
          expiresIn: "24h",
        }
      )

      // Save token to user document in database
      user.token = token
      user.password = undefined
      // Set cookie for token and return success response
      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      }
      res.cookie("token", token, options).status(200).json({
        success: true,
        token,
        user,
        message: `User Login Success`,
      })
    } else {
      return res.status(401).json({
        success: false,
        message: `Password is incorrect`,
      })
    }
  } catch (error) {
    console.error(error)
    // Return 500 Internal Server Error status code with error message
    return res.status(500).json({
      success: false,
      message: `Login Failure Please Try Again`,
    })
  }
}
// Send OTP For Email Verification
exports.sendotp = async (req, res) => {
  try {
    const { email } = req.body;

    // Check if user is already present
    // Find user with provided email
    const checkUserPresent = await User.findOne({ email });
    // to be used in case of signup

    // If user found with provided email
    if (checkUserPresent) {
      // Return 401 Unauthorized status code with error message
      return res.status(401).json({
        success: false,
        message: `User is Already Registered`,
      })
    }

    var otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    })
    const result = await OTP.findOne({ otp: otp });
    // console.log("Result is Generate OTP Func");
    // console.log("OTP", otp);
    // console.log("Result", result);
    while (result) {
      otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
      }) 
      result = await OTP.findOne({ otp });
    }

    
    const otpPayload = { email, otp };
    // console.log("otppayload ",otpPayload);
    
    const otpBody = await OTP.create(otpPayload);
    // console.log("OTP Body", otpBody);


   
    res.status(200).json({
      success: true,
      message: `OTP Sent Successfully`,
      otp,
    })
  } catch (error) {
    console.log(error.message)
    return res.status(500).json({ success: false, error: error.message })
  }
}

// Controller for Changing Password
exports.changePassword = async (req, res) => {
  try {
    // Get user data from req.user
    const userDetails = await User.findById(req.user.id)

    // Get old password, new password, and confirm new password from req.body
    const { oldPassword, newPassword } = req.body

    // Validate old password
    const isPasswordMatch = await bcrypt.compare(
      oldPassword,
      userDetails.password
    )
    if (!isPasswordMatch) {
      // If old password does not match, return a 401 (Unauthorized) error
      return res
        .status(401)
        .json({ success: false, message: "The password is incorrect" })
    }

    // Update password
    const encryptedPassword = await bcrypt.hash(newPassword, 10)
    const updatedUserDetails = await User.findByIdAndUpdate(
      req.user.id,
      { password: encryptedPassword },
      { new: true }
    )

    // Send notification email
    try {
      const emailResponse = await mailSender(
        updatedUserDetails.email,
        "Password for your account has been updated",
        passwordUpdated(
          updatedUserDetails.email,
          `Password updated successfully for ${updatedUserDetails.firstName} ${updatedUserDetails.lastName}`
        )
      )
      // console.log("Email sent successfully:", emailResponse.response)
    } catch (error) {
      // If there's an error sending the email, log the error and return a 500 (Internal Server Error) error
      console.error("Error occurred while sending email:", error)
      return res.status(500).json({
        success: false,
        message: "Error occurred while sending email",
        error: error.message,
      })
    }

    // Return success response
    return res
      .status(200)
      .json({ success: true, message: "Password updated successfully" })
  } catch (error) {
    // If there's an error updating the password, log the error and return a 500 (Internal Server Error) error
    console.error("Error occurred while updating password:", error)
    return res.status(500).json({
      success: false,
      message: "Error occurred while updating password",
      error: error.message,
    })
  }
}
