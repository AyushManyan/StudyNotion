import { set } from 'mongoose';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from "react-redux"
import { fetchCourseCategories } from '../../../../../services/operations/courseDetailsAPI';
import ChipInput from './ChipInput';
import Upload from '../Upload';
import RequirementsField from './RequirementsField';
import IconBtn from '../../../../common/IconBtn';
import { setCourse, setStep } from "../../../../../slices/courseSlice"
import { COURSE_STATUS } from "../../../../../utils/constant"

import { HiOutlineCurrencyRupee } from 'react-icons/hi';
import { addCourseDetails, editCourseDetails } from '../../../../../services/operations/courseDetailsAPI';
import { toast } from "react-hot-toast"


const CourseInformationForm = () => {
    const dispatch = useDispatch();

    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        formState: { errors },
    } = useForm();

    const {token} = useSelector((state) => state.auth);
    const {course, editCourse} = useSelector((state) => state.course);
    const [loading, setLoading] = useState(false);
    const [courseCategories, setCourseCategories] = useState([]);

    useEffect(() => {
        const getCategories = async () => {
            setLoading(true);
            const categories = await fetchCourseCategories();
            if(categories.length > 0) {
                setCourseCategories(categories);
            }
            setLoading(false);
        }

        if(editCourse){
            setValue("courseTitle" , course.courseName)
            setValue("courseDescription" , course.courseDescription)
            setValue("coursePrice" , course.coursePrice)
            setValue("courseCategory" , course.courseCategory)
            setValue("courseTags" , course.courseTags) 
            setValue("courseBenefits" , course.whatYouWillLearn)
            setValue("courseImage" , course.thumbnail)  
            setValue("courseRequirements" , course.instructions)
        }

        getCategories();
    },[]);

    const isFormUpdated = () => {
        const currentValues = getValues();
        if(currentValues.courseTitle !== course.courseName 
            || currentValues.courseShortDesc !== course.courseDescription
            || currentValues.coursePrice !== course.coursePrice
            || currentValues.courseCategory._id !== course.courseCategory._id
            || currentValues.courseTags.toString() !== course.courseTags.toString()
            || currentValues.courseBenefits !== course.whatYouWillLearn
            || currentValues.courseImage !== course.thumbnail
            || currentValues.courseRequirements .toString() !== course.instructions.toString()
        ){
            return true;
        }else{
            return false;
        }

    }

    // handle next button
    const onSubmit = async (data) => {
        // console.log(data)
    
        if (editCourse) {
          // const currentValues = getValues()
          // console.log("changes after editing form values:", currentValues)
          // console.log("now course:", course)
          // console.log("Has Form Changed:", isFormUpdated())
          if (isFormUpdated()) {
            const currentValues = getValues()
            const formData = new FormData()
            // console.log(data)
            formData.append("courseId", course._id)
            if (currentValues.courseTitle !== course.courseName) {
              formData.append("courseName", data.courseTitle)
            }
            if (currentValues.courseShortDesc !== course.courseDescription) {
              formData.append("courseDescription", data.courseShortDesc)
            }
            if (currentValues.coursePrice !== course.price) {
              formData.append("price", data.coursePrice)
            }
            if (currentValues.courseTags.toString() !== course.tag.toString()) {
              formData.append("tag", JSON.stringify(data.courseTags))
            }
            if (currentValues.courseBenefits !== course.whatYouWillLearn) {
              formData.append("whatYouWillLearn", data.courseBenefits)
            }
            if (currentValues.courseCategory._id !== course.category._id) {
              formData.append("category", data.courseCategory)
            }
            if (
              currentValues.courseRequirements.toString() !==
              course.instructions.toString()
            ) {
              formData.append(
                "instructions",
                JSON.stringify(data.courseRequirements)
              )
            }
            if (currentValues.courseImage !== course.thumbnail) {
              formData.append("thumbnailImage", data.courseImage)
            }
            // console.log("Edit Form data: ", formData)
            setLoading(true)
            const result = await editCourseDetails(formData, token)
            setLoading(false)
            if (result) {
              dispatch(setStep(2))
              dispatch(setCourse(result))
            }
          } else {
            toast.error("No changes made to the form")
          }
          return
        }
    
        const formData = new FormData()
        formData.append("courseName", data.courseTitle)
        formData.append("courseDescription", data.courseShortDesc)
        formData.append("price", data.coursePrice)
        formData.append("tag", JSON.stringify(data.courseTags))
        formData.append("whatYouWillLearn", data.courseBenefits)
        formData.append("category", data.courseCategory)
        formData.append("status", COURSE_STATUS.DRAFT)
        formData.append("instructions", JSON.stringify(data.courseRequirements))
        formData.append("thumbnailImage", data.courseImage)
        setLoading(true)
        const result = await addCourseDetails(formData, token)
        if (result) {
          dispatch(setStep(2))
          dispatch(setCourse(result))
        }
        setLoading(false)
      }
    

  return ( 
    <form onSubmit={handleSubmit(onSubmit)}
    className="space-y-8 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6">

        <div className="flex flex-col space-y-2">
            <label htmlFor='CourseTitle'  className="text-sm text-richblack-5">Course Title <sup className="text-pink-200">*</sup></label>
            <input
                id='courseTitle'
                placeholder="Enter course title"
                className="form-style w-full"
                {...register("courseTitle", { required: "Course title is required" })}
            />
            {
                errors.courseTitle && <span className="ml-2 text-xs tracking-wide text-pink-200">
                    Course title is required
                </span>
            }

        </div>

        <div className="flex flex-col space-y-2">
            <label htmlFor='courseShortDesc' className="text-sm text-richblack-5">Course Short Description <sup className="text-pink-200">*</sup></label>
            <textarea
                id='courseShortDesc'
                placeholder="Enter course description"
                className="form-style resize-x-none min-h-[130px] w-full"
                {...register("courseShortDesc",{required:true})}
            />
            {
                errors.courseShortDesc && <span>
                    Course description is required
                </span>
            }
        </div>

        <div className="flex flex-col space-y-2">
            <label htmlFor='coursePrice' className="text-sm text-richblack-5">Course Price <sup className="text-pink-200">*</sup></label>
            <div className="relative">
            <input
                id='coursePrice'
                placeholder="Enter course price"
                className="form-style w-full !pl-12"
                {...register("coursePrice", { required:true, valueAsNumber:true,pattern: {
                    value: /^(0|[1-9]\d*)(\.\d+)?$/,
                  }, })}
            />
            <HiOutlineCurrencyRupee className="absolute left-3 top-1/2 inline-block -translate-y-1/2 text-2xl text-richblack-400"/>
            </div>
            {
                errors.coursePrice && <span className="ml-2 text-xs tracking-wide text-pink-200">
                    Course price is required
                </span>
            }
        </div>

        <div className="flex flex-col space-y-2">
            <label htmlFor='courseCategory' className="text-sm text-richblack-5">Course Category <sup className="text-pink-200">*</sup></label>
            <select name="" id="courseCategory"
                defaultValue=""
                className="form-style w-full"
                {...register("courseCategory", { required: true
                 })}
            >
                <option value="" disabled>Select course category</option>
                {
                    !loading && courseCategories.map((category,index) => (
                        <option key={index} value={category?._id}>{category?.name}</option>
                    ))
                }
            </select>
            {
                errors.courseCategory && <span className="ml-2 text-xs tracking-wide text-pink-200">
                    Course category is required
                </span>
            }
        </div>

        {/* Course Tags */}
        <ChipInput
            label="Tags"
            name="courseTags"
            placeholder="Enter Tags and press Enter"
            register={register}
            errors={errors}
            setValue={setValue}
            getValues={getValues}
        />
        
        {/* Course Thumbnail Image */}
      <Upload
        name="courseImage"
        label="Course Thumbnail"
        register={register}
        setValue={setValue}
        errors={errors}
        editData={editCourse ? course?.thumbnail : null}
      />

      {/* {benfits of the course} */}

      <div>
        <label htmlFor="">Benefits of the course <sup>*</sup></label>
        <textarea name="" id="coursebenefits"
            placeholder='Enter the benefits of the course'
            className="form-style w-full resize-none min-h-[130px]"
            {...register("courseBenefits",{required:true})}
        ></textarea>
        {
            errors.courseBenefits && <span className="ml-2 text-xs tracking-wide text-pink-200">
                Benefits of the course is required
            </span>
        }
      </div>

      <RequirementsField
        name="courseRequirements"
        label="Requirements/Instructions"
        register={register}
        setValue={setValue}
        errors={errors}
        getValues={getValues}
      />

      <div>
        {
            editCourse && (
                <button 
                    onClick={()=> dispatch(setStep(2))}
                    className='flex items-center gap-2 bg-richblack-300'
                >
                    Continue Without Saving
                </button>
            )
        }

        <IconBtn 
            text = {!editCourse ? "Next" : "Save Changes"}
        />


      </div>

    </form>
  )
}

export default CourseInformationForm