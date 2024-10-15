// import "./App.css";
import { Route, Routes,useNavigate} from "react-router-dom";
import "./App.css";
import { useEffect } from "react";
// Redux
import { useDispatch, useSelector } from "react-redux"


import Navbar from "./components/common/Navbar"
import OpenRoute from "./components/cores/Auth/OpenRoute"

// {pages}
import Home from "./pages/Home"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import VerifyEmail from "./pages/VerifyEmail"
import ForgotPassword from "./pages/ForgotPassword";
import UpdatePassword from "./pages/UpdatePassword";
import About from "./pages/About";
import Contact from "./pages/Contact";
import MyProfile from "./components/cores/Dashboard/MyProfile";
import PrivateRoute from "./components/cores/Auth/PrivateRoute";
import Dashboard from "./pages/Dashboard";
import Error from "./pages/Error";
import Settings from "./components/cores/Dashboard/Settings"
import EnrolledCourses from "./components/cores/Dashboard/EnrolledCourses"
import Cart from "./components/cores/Dashboard/Cart"
import AddCourse from "./components/cores/Dashboard/AddCourse"


import { getUserDetails } from "./services/operations/profileAPI"
import { ACCOUNT_TYPE } from "./utils/constant"

function App() {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.profile)

  useEffect(() => {
    if (localStorage.getItem("token")) {
      const token = JSON.parse(localStorage.getItem("token"))
      dispatch(getUserDetails(token, navigate))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        {/* Open Route - for Only Non Logged in User */}
        <Route
          path="login"
          element={
            <OpenRoute>
              <Login />
            </OpenRoute>
          }
        />
        <Route
          path="signup"
          element={
            <OpenRoute>
              <Signup />
            </OpenRoute>
          }
        />
        <Route
          path="forgot-password"
          element={
            <OpenRoute>
              <ForgotPassword />
            </OpenRoute>
          }
        />
        <Route
          path="update-password/:id"
          element={
            <OpenRoute>
              <UpdatePassword />
            </OpenRoute>
          }
        />


        <Route
          path="verify-email"
          element={
            <OpenRoute>
              <VerifyEmail />
            </OpenRoute>
          }
        />
        {/* <Route
          path="about"
          element={
            <OpenRoute>
              <About />
            </OpenRoute>
          }
        /> */}


        {/* Private Route - for Only Logged in User */}
        <Route element={
          <PrivateRoute>
            <Dashboard></Dashboard>
          </PrivateRoute>
        }
        >

          <Route path="dashboard/my-profile" element={<MyProfile />} />
          <Route path="dashboard/Settings" element={<Settings />} />
          {user?.accountType === ACCOUNT_TYPE.STUDENT && (
            <>
              <Route
                path="dashboard/enrolled-courses"
                element={<EnrolledCourses />}
              />
              <Route path="/dashboard/cart" element={<Cart />} />
            </>
          )}

{user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
            <>
              {/* <Route path="dashboard/instructor" element={<Instructor />} />
              <Route path="dashboard/my-courses" element={<MyCourses />} /> */}
              <Route path="dashboard/add-course" element={<AddCourse />} />
              {/* <Route
                path="dashboard/edit-course/:courseId"
                element={<EditCourse />}
              /> */}
            </>
          )}

        </Route>

        <Route path="*" element={<Error />} />


      </Routes>
    </div>
  )
}

export default App;
