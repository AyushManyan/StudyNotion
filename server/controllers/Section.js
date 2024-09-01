// const Section = require("../models/Section");
// const Course = require("../models/Course");

// // create Section

// exports.createSection = async (req,res)=>{
//     try {
        
//         // fectch data 
//         const {sectionName , courseId} = req.body;
//         // data vaildation
//         if(!sectionName || !courseId){
//             return res.status(400).json({
//                 success:false,
//                 message:"missing Properties",
//             })
//         }

//         // create section

//         const newSection = await Section.create({sectionName});
//         // update course with section objectid

//         const updatedCourseDetails = await Course.findByIdAndUpdate(
//             courseId,
//             {
//                 $push:{
//                     courseContent:newSection._id,
//                 }
//             },
//             {new:trure}
//         );
        

//         // hw: use populate to replace section/sub-section both in the upadte course-------------------------------

//         // return response

//         return res.status(200).json({
//             sucess:true,
//             message:"Section is created successfully",
//             updatedCourseDetails
//         })


//     } catch (error) {

//         return res.status(500).json({
//             success:false,
//             message:"Unable to the create section , please try again",
//             error:error.message,
//         })
        
//     }
// };



// // update section

// exports.updateSection = async (req,res)=>{
//     try {
//         // data input
//         const {sectionName, sectionId}= req.body;
//         // data validation
//         if(!sectionName || !sectionId){
//             return res.status(400).json({
//                 success:false,
//                 message:"Missing Properties"
//             });
//         }
//          // update data
//         const section = await Section.findByIdAndUpdate(sectionId,{sectionName},{new:true});

//         // return response

//         return res.status(200).json({
//              success:true,
//              message:"Section Updated SuccessFully",
//         })

//     } catch (error) {

//         return res.status(500).json({
//             success:false,
//             message:"Something went wrong , while updating Section"
//         })
        
//     }
// }


// exports.deleteSection = async(req,res)=>{

//     try {

//         // get id-asssuming that we send id in params
//         const {sectionId} = req.params;
//         // use find by id nd delete
//         await Section.findByIdAndDelete(sectionId);
//         // TODO: do we need to delete section from course schema
//         // return
//         return res.status(200).json({
//             success:true,
//             message:"Section deleted successfully"
//         })

//     } catch (error) {
//         return res.status(500).json({
//             success:false,
//             message:"Something went wrong , while deleting Section"
//         })
        
//     }

// }






// ----------orginal code---------


const Section = require("../models/Section")
const Course = require("../models/Course")
const SubSection = require("../models/Subsection")
// CREATE a new section
exports.createSection = async (req, res) => {
  try {
    // Extract the required properties from the request body
    const { sectionName, courseId } = req.body

    // Validate the input
    if (!sectionName || !courseId) {
      return res.status(400).json({
        success: false,
        message: "Missing required properties",
      })
    }

    // Create a new section with the given name
    const newSection = await Section.create({ sectionName })

    console.log(newSection);
    
    // Add the new section to the course's content array
    const updatedCourse = await Course.findByIdAndUpdate(
      courseId,
      {
        $push: {
          courseContent: newSection._id,
        },
      },
      { new: true }
    )
      .populate({
        path: "courseContent",
        populate: {
          path: "SubSection",
        },
      })
      .exec()

    // Return the updated course object in the response
    res.status(200).json({
      success: true,
      message: "Section created successfully",
      updatedCourse,
    })
  } catch (error) {
    // Handle errors
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    })
  }
}

// UPDATE a section
exports.updateSection = async (req, res) => {
  try {
    const { sectionName, sectionId, courseId } = req.body
    const section = await Section.findByIdAndUpdate(
      sectionId,
      { sectionName },
      { new: true }
    )
    const course = await Course.findById(courseId)
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec()
    console.log(course)
    res.status(200).json({
      success: true,
      message: section,
      data: course,
    })
  } catch (error) {
    console.error("Error updating section:", error)
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    })
  }
}

// DELETE a section
exports.deleteSection = async (req, res) => {
  try {
    const { sectionId, courseId } = req.body
    await Course.findByIdAndUpdate(courseId, {
      $pull: {
        courseContent: sectionId,
      },
    })
    const section = await Section.findById(sectionId)
    console.log(sectionId, courseId)
    if (!section) {
      return res.status(404).json({
        success: false,
        message: "Section not found",
      })
    }
    // Delete the associated subsections
    await SubSection.deleteMany({ _id: { $in: section.subSection } })

    await Section.findByIdAndDelete(sectionId)

    // find the updated course and return it
    const course = await Course.findById(courseId)
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec()

    res.status(200).json({
      success: true,
      message: "Section deleted",
      data: course,
    })
  } catch (error) {
    console.error("Error deleting section:", error)
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    })
  }
}
