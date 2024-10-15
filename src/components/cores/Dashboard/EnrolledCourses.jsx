import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getUserEnrolledCourses } from '../../../services/operations/profileAPI'
import ProgressBar from '@ramonak/react-progress-bar'

const EnrolledCourses = () => {
    const { token } = useSelector((state) => state.auth);

    const [enrolledCourses, setEnrolledCourses] = useState(null);

    const getEnrolledCourses = async () => {
        try {
            const response = await getUserEnrolledCourses(token);
            setEnrolledCourses(response);
        } catch (error) {
            console.log("ERROR MESSAGE - ", error.message);
        }
    }

    useEffect(() => {
        getEnrolledCourses();
    }, []);

    return (
        <div className='text-white'>

            <div>Enrolled Course</div>
            {
                !enrolledCourses ? (
                    <div>Loading...</div>
                ) : !enrolledCourses.length ? (
                    <div>You have not enrolled in any course yet</div>
                    
                ) : (
                    <div>
                        <div>
                            <p>Course Name</p>
                            <p>Duration</p>
                            <p>Progress</p>
                        </div>
                        {/* {card shure hote h} */}
                        {
                            enrolledCourses.map((course , index) => (
                                <div>
                                    <div>
                                        <img src = {course.thumbnail} />
                                        <div>
                                            <p>{course.courseName}</p>
                                            <p>{course.courseDescription}</p>
                                        </div>
                                    </div>
                                    <div>
                                        <p>{course?.totalDuration}</p>
                                    </div>
                                    <div>
                                        <p>Progress: {course?.progressPercentage || 0}</p>

                                        <ProgressBar 
                                            completed={course?.progressPercentage || 0}
                                            height="8px"
                                            isLabelVisible={false}
                                        />
                                    </div>
                                    
                                </div>
                        ))}
                    </div>
                )
            }

        </div>
    )
}

export default EnrolledCourses