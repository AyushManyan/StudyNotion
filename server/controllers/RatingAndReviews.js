const RatingAndReviews = require("../models/RatingAndReviews");
const Course = require("../models/Course");
const { mongoose } = require("mongoose");

// create rating

exports.createRating = async(res,req)=>{
    try {
        
        // get user id , fetchdata from body , 
        const userId = req.user.id;
        // check user enrolled or not
        const {rating, review, courseId} = req.body;
        // check user already review or not
        const courseDetails = await Course.findOne(
            {_id:courseId,
                studentsEnrolled:{$elemMatch:{$eq:userid}},
            }
        )

        if(!courseDetails){
            return res.status(404).json({
                success:false,
                message:"Student is not enrolled in the course"
            })
        }
        const alreadyReviewed = await RatingAndReviews.findOne({
            user:userId,
            course:courseId
        });
        if(alreadyReviewed){
            return res.status(403).json({
                success:false,
                message:"Course is Already reviewed by the user"
            })
        }
        // create rating nd review
        const ratingReview = await RatingAndReviews.create({
            rating,
            review,
            course:courseId,
            user:userId
        })
        // update course review
        const updatedCourseDetails = await Course.findByIdAndUpdate({_id:courseId},
            {
                $push:{
                    ratingAndReviews:ratingReview._id,
                }
            },
            {new:true}
        )
        console.log(updatedCourseDetails);
        
        // return response
        return res.status(200).json({
            success:true,
            message:"Rating and Review created Successfully",
            ratingReview
        })

    } catch (error) {
        console.log(error);
        
        return res.status(500).json({
            success:false,
            message:"something went wrong , while creating Rating and review"
        })
        
    }
}


// get average rating

exports.getAverageRating = async (req,res)=>{
    try {
        // get course id
        const courseId = req.body.courseId;
        // calculate avg rating
        const result = await RatingAndReviews.aggregate([
            {
                $match:{
                    course:new mongoose.Types.ObjectId(courseId),
                }
            },
            {
                $group:{
                    _id:null,
                    averageRating: {$avg:"$rating"}
                }
            }
        ]);

        // return response
        if(result.length > 0){
            return res.status(200).json({
                success:true,
                message:"get average rating successful",
                averageRating:result[0].averageRating
            })
        }

        return res.status(200).json({
            success:true,
            message:"Average rating is zero till now",
            averageRating:0,
        })


        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Something went wrong while get AverageRating"
        })
        
    }
}


// get all rating

exports.getAllRatingReview = async (req,res)=>{
    try {

        const allReviews = await RatingAndReviews.find({})
                                .sort({rating:"desc"})
                                .populate({
                                    path:"user",
                                    select:"firstName lastName email image",
                                })
                                .populate({
                                    path:"course",
                                    select:"courseName"
                                })

        return res.status(200).json({
            success:true,
            message:"All reviews fetched successfully",
            data:allReviews
        })
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Something went wrong while fetching allrating and reviews"
        })
        
    }
}