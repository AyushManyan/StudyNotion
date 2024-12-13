// // reset Password token

// const User = require("../models/User");
// const mailSender = require("../utils/mailSender");
// const bcrypt = require("bcrypt");

// // reset passwoard

// exports.resetPasswordToken = async(req , res) =>{
//     try {
//         // get email from req body
//         const email = req.body;
//         // check user for this email , email validation
//         const user = await User.findOne({email:email});
//         if(!user){
//             return res.status(401).json({
//                 success:false,
//                 message:"Your email is not registered with us"
//             });
//         }

//         // generate token
//         const token = crypto.randomUUID();
//         // update user by adding token and expiration time
//         const updatedDetails = await User.findOneAndUpdate(
//             {email:email},
//             {token:token,
//                 resetPasswordExprires:Date.now()+5*60*100,
//             },
//             {new:true}
//         )
//         // create url
//         const url = `http://localhost:3000/update-password/${token}`;

//         // send mail containing the url
//         await mailSender(email,"password Reset Link",`Password reset link:${url}`)
//         // return response

//         return res.json({
//             success:true,
//             message:"email send successfully, please check email and change password"
//         })
//     } catch (error) {

//         console.log(error);
//         return res.status(500).json({
//             success:false,
//             message:"something went wrong while reset password"
//         })
        
        
//     }

// };


// // reset password 

// exports.restPassword = async (req,res)=>{
//     try {
//         // data fetch  we fetch the details based on token 
//         const {password, confirmPassword , token} = req.body;

//         // validation
//         if(password !== confirmPassword){
//             return res.status(401).json({
//                 success:false,
//                 message:"Password not match" 
//             });
//         }

//         // get userDetails from db using token
//         const userDetails = await User.findOne({token:token});
//         // if no entry - invaild token

//         if(!userDetails){
//             return res.status(401).json({
//                 success:false,
//                 message:"Token is invalid",
//             })
//         }

//         // hash password 
//         const hashPassword = await bcrypt.hash(password,10);

//         // password update
//         await User.findOneAndUpdate(
//             {token:token},
//             {password:hashPassword},
//             {new:true}
//         );

//         // return
//         return res.status(200).json({
//             success:true,
//             message:"Password rest Successfully"
//         })
//     } catch (error) {

//         console.log(error);
//         return res.status(500).json({
//             success:false,
//             message:"something went wrong while reset password"
//         })
        
//     }

// }




// -------------original  code---------------

const User = require("../models/User")
const mailSender = require("../utils/mailSender")
const bcrypt = require("bcrypt")
const crypto = require("crypto")
exports.resetPasswordToken = async (req, res) => {
  try {
    const email = req.body.email
    const user = await User.findOne({ email: email })
    if (!user) {
      return res.json({
        success: false,
        message: `This Email: ${email} is not Registered With Us Enter a Valid Email `,
      })
    }
    const token = crypto.randomBytes(20).toString("hex")

    const updatedDetails = await User.findOneAndUpdate(
      { email: email },
      {
        token: token,
        resetPasswordExpires: Date.now() + 3600000,
      },
      { new: true }
    )
    // console.log("DETAILS", updatedDetails)

    const url = `http://localhost:3000/update-password/${token}`
    // const url = `https://studynotion-edtech-project.vercel.app/update-password/${token}`
// 
    await mailSender(
      email,
      "Password Reset",
      `Your Link for email verification is ${url}. Please click this url to reset your password.`
    )

    res.json({
      success: true,
      message:
        "Email Sent Successfully, Please Check Your Email to Continue Further",
    })
  } catch (error) {
    return res.json({
      error: error.message,
      success: false,
      message: `Some Error in Sending the Reset Message`,
    })
  }
}

exports.resetPassword = async (req, res) => {
  try {
    const { password, confirmPassword, token } = req.body

    if (confirmPassword !== password) {
      return res.json({
        success: false,
        message: "Password and Confirm Password Does not Match",
      })
    }
    const userDetails = await User.findOne({ token: token })
    if (!userDetails) {
      return res.json({
        success: false,
        message: "Token is Invalid",
      })
    }
    if (!(userDetails.resetPasswordExpires > Date.now())) {
      return res.status(403).json({
        success: false,
        message: `Token is Expired, Please Regenerate Your Token`,
      })
    }
    const encryptedPassword = await bcrypt.hash(password, 10)
    await User.findOneAndUpdate(
      { token: token },
      { password: encryptedPassword },
      { new: true }
    )
    res.json({
      success: true,
      message: `Password Reset Successful`,
    })
  } catch (error) {
    return res.json({
      error: error.message,
      success: false,
      message: `Some Error in Updating the Password`,
    })
  }
}
