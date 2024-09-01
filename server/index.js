const express = require("express");
const app = express();

const userRoute = require("./routes/User");
const profilRoute = require("./routes/profile");
const paymentRoute = require("./routes/Payments");
const courseRoute = require("./routes/Course");


const database = require("./config/database");
const cookieParser = require("cookie-parser");

const cors = require("cors");

const {cloudinaryConnect} = require("./config/cloudinary");

const fileUpload = require("express-fileupload");

const dotenv= require("dotenv");

const PORT = process.env.PORT || 4000;

// database
database.connect();
// middleware
app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin:"http://localhost:3000",
        credentials:true,
    })
)

app.use(
    fileUpload({
        useTempFiles:true,  
        tempFileDir:"/tmp"
    })
)
// cloudinary
cloudinaryConnect();

// routes

app.use("/api/v1/auth",userRoute);
app.use("/api/v1/profile",profilRoute);
app.use("/api/v1/course",courseRoute);
app.use("/api/v1/payment",paymentRoute);


// default route

app.get("/",(req,res)=>{
    return res.json({
        success:true,
        message:"YOur server is up and running"
    })
});

app.listen(PORT,()=>{
    console.log(`app is running on ${PORT}`);
    
})