const mongoose = require("mongoose");
require("dotenv").config();

exports.connect = () => {
    mongoose.connect(process.env.MongoDB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(()=>console.log("DB Connected Successfully")
    )
    .catch((error)=>{
        console.log("Error in connecting");
        console.error(error);
        process.exit(1);        
    })
}