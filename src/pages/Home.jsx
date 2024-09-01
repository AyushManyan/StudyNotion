import React from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import HighlightText from '../components/cores/HomePage/HighlightText';
import CTAButton from '../components/cores/HomePage/Button';
import Banner from "../assets/Images/banner.mp4";
import CodeBlocks from '../components/cores/HomePage/CodeBlocks';

function Home() {
    return (
        <div className='p-10'>
            {/* section 1 */}
            <div className='relative mx-auto flex flex-col w-11/12 items-center max-w-maxContent gap-8 text-white justify-between'>

                <Link to={"/signup"}>

                    <div className='group mx-auto mt-16 w-fit rounded-full bg-richblack-800 p-1 font-bold text-richblack-200 drop-shadow-[0_1.5px_rgba(255,255,255,0.25)] transition-all duration-200 hover:scale-95 hover:drop-shadow-none'>
                        <div className='flex flex-row items-center gap-2 rounded-full px-10 py-[5px] transition-all duration-200 group-hover:bg-richblack-900'>
                            <p>Become an Instructor</p>
                            <FaArrowRight></FaArrowRight>
                        </div>
                    </div>
                </Link>

                {/* Heading */}
                <div className='text-center text-4xl font-semibold mt-7'>
                    Empower Your Future With
                    <HighlightText text={" Coding Skills"}> </HighlightText>
                </div>

                {/* Subheading */}
                <div className='mt-4 w-[90%] text-center text-lg font-bold text-richblack-300'>
                    With our online coding courses, you can learn at your own pace, from
                    anywhere in the world, and get access to a wealth of resources,
                    including hands-on projects, quizzes, and personalized feedback from
                    instructors.
                </div>

                <div className='flex flex-row gap-7 mt-8'>
                    <CTAButton active={true} linkto={"/signup"}>Learn More</CTAButton>
                    <CTAButton active={false} linkto={"/login"}>Book Demo</CTAButton>
                </div>


                {/* shadow and white box shadow  */}
                <div className='mx-3 my-7 shadow-[10px_-5px_50px_-5px] shadow-blue-200'>
                    <video className="shadow-[20px_20px_rgba(255,255,255)]" autoPlay loop muted>
                        <source src={Banner} type="video/mp4"></source>
                    </video>
                </div>

                {/* code section 1 */}

                <div>
                    <CodeBlocks
                        position={"lg:flex-row"}
                        heading={
                            <div className='text-4xl font-semibold'>
                                Unlock Your
                                <HighlightText text={" Coding Potential "}></HighlightText>
                                with our online course
                            </div>
                        }
                        subheading={
                            "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
                        }
                        ctabtn1={
                            {
                                btnText: "try it yourself",
                                linkto: "/signup",
                                active: true
                            }
                        }
                        ctabtn2={
                            {
                                btnText: "learn more",
                                linkto: "/login",
                                active: false
                            }
                        }

                        codeblock={`<!DOCTYPE html>\n <html lang="en">\n<head>\n<title>This is myPage</title>\n</head>\n<body>\n<h1><a href="/">Header</a></h1>\n<nav> <a href="/one">One</a> <a href="/two">Two</a> <a href="/three">Three</a>\n</nav>\n</body>`}

                        codeColor={"text-yellow-25"}
                        backgroundGradient={<div className="codeblock1 absolute"></div>}



                    ></CodeBlocks>
                </div>

                {/* code section 2 */}

                <div>
                    <CodeBlocks
                        position={"lg:flex-row-reverse"}
                        heading={
                            <div className="w-[100%] text-4xl font-semibold lg:w-[50%]">
                                Start
                                <HighlightText text={" coding in seconds"} />
                            </div>
                        }
                        subheading={
                            "Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
                        }
                        ctabtn1={
                            {
                                btnText: "Continue Lesson",
                                linkto: "/signup",
                                active: true
                            }
                        }
                        ctabtn2={
                            {
                                btnText: "learn more",
                                linkto: "/login",
                                active: false
                            }
                        }

                        codeColor={"text-white"}
                        codeblock={`import React from "react";\n import CTAButton from "./Button";\nimport TypeAnimation from "react-type";\nimport { FaArrowRight } from "react-icons/fa";\n\nconst Home = () => {\nreturn (\n<div>Home</div>\n)\n}\nexport default Home;`}
                        backgroundGradient={<div className="codeblock2 absolute"></div>}

                    ></CodeBlocks>
                </div>

            </div>


            {/* section 2 */}


            {/* section 3 */}


            {/* footer */}
        </div>
    )
}

export default Home;