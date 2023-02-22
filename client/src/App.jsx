import "./css/Core.css";
import Quiz from "./components/quiz/Quiz";
import QuizRoute from "./components/quiz/QuizRoute";
import LandingPage from "./components/LandingPage";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Navbar from "./components/Navbar";
import Profile from "./components/profile/Profile";
import Homepage from "./components/homepage/Homepage";
import ProtectedRoute from "./components/ProtectedRoute";
import Alert from "./components/Alert";
import { createContext, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AuthProvider } from "react-auth-kit";
import { useEffect } from "react";
import { isUserAuth } from "./api_helper/user_functions";
import RouteNotFound from "./components/RouteNotFound";
import EditProfile from "./components/profile/EditProfile";
import Create from "./components/create/Create";
import Explore from "./components/explore/Explore";
import QuizPreview from "./components/quiz/QuizPreview";
import alert from "./alert.js";

export const UserContext = createContext();

function App() {
    const [userObj, setUserObj] = useState();
    const [loading, setLoading] = useState();
    // This useEffect hook allows to persist user login
    // It gets `user` from localStorage, user is set when logging it
    // Then is calls `isAuth()` to make request to /isAuth route in backend
    // /isAuth endpoint validates JWT token so user can't edit localStorage
    // on client side and possibly make it seem like he is logged in
    // only if res.ok is true `user` from localStorage gets parsed and set into state
    useEffect(() => {
        setLoading(true);
        const loggedInUser = localStorage.getItem("user");
        if (loggedInUser) {
            isUserAuth().then((res) => {
                if (res.ok) {
                    const foundUser = JSON.parse(localStorage.getItem("user"));
                    setUserObj(foundUser);
                    setLoading(false);
                } else if (!res.ok) {
                    setLoading(false);
                }
            });
        } else {
            setLoading(false);
        }
    }, []);

    return (
        <AuthProvider authType="cookie" cookieSecure={false}>
            <UserContext.Provider value={{ userObj, setUserObj }}>
                {!loading ? (
                    <div className="bgDefault">
                        <BrowserRouter>
                            <Navbar />
                            <Alert />
                            <Routes>
                                <Route exact path="/home" element={<Homepage />}></Route>
                                <Route exact path="/" element={<LandingPage />}></Route>
                                <Route exact path="/login" element={<Login />}></Route>
                                <Route exact path="/signup" element={<Signup />}></Route>
                                <Route exact path="/create" element={<Create />}></Route>
                                <Route exact path="/explore" element={<Explore />}></Route>

                                <Route
                                    exact
                                    path="/quiz/:id/play"
                                    element={
                                        <ProtectedRoute>
                                            <QuizRoute children={<Quiz />} />
                                        </ProtectedRoute>
                                    }
                                ></Route>
                                <Route
                                    exact
                                    path="/quiz/:id/"
                                    element={<ProtectedRoute>{<QuizPreview />}</ProtectedRoute>}
                                ></Route>
                                <Route
                                    exact
                                    path="/profile/:username/edit"
                                    element={
                                        <ProtectedRoute>
                                            <EditProfile />
                                        </ProtectedRoute>
                                    }
                                ></Route>
                                <Route exact path="/profile/:username" element={<Profile />}></Route>
                                <Route
                                    path="/*"
                                    element={<RouteNotFound msg={["Route", "not found"]} />}
                                ></Route>
                            </Routes>
                            <Alert />
                        </BrowserRouter>
                    </div>
                ) : (
                    <div className="bgDefault"></div>
                )}
            </UserContext.Provider>
        </AuthProvider>
    );
}

export default App;
