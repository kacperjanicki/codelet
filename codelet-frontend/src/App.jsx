import "./css/Core.css";
import Quiz from "./components/Quiz";
import LandingPage from "./components/LandingPage";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Navbar from "./components/Navbar";
import { createContext, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AuthProvider } from "react-auth-kit";
import { useEffect } from "react";
import { isUserAuth } from "./api_helper/user_functions";

export const UserContext = createContext();

function App() {
    const [userObj, setUserObj] = useState();
    // This useEffect hook allows to persist user login
    // It gets `user` from localStorage, user is set when logging it
    // Then is calls `isAuth()` to make request to /isAuth route in backend
    // /isAuth endpoint validates JWT token so user can't edit localStorage
    // on client side and possibly make it seem like he is logged in
    // only if res.ok is true `user` from localStorage gets parsed and set into state
    useEffect(() => {
        const loggedInUser = localStorage.getItem("user");
        if (loggedInUser) {
            isUserAuth().then((res) => {
                if (res.ok) {
                    const foundUser = JSON.parse(localStorage.getItem("user"));
                    setUserObj(foundUser);
                }
            });
        }
    }, []);

    return (
        <AuthProvider authType="cookie" cookieSecure={false}>
            <UserContext.Provider value={{ userObj, setUserObj }}>
                <div className="bgDefault">
                    <BrowserRouter>
                        <Navbar />
                        <Routes>
                            <Route exact path="/" element={<LandingPage />}></Route>
                            <Route exact path="/login" element={<Login />}></Route>
                            <Route exact path="/signup" element={<Signup />}></Route>
                            <Route exact path="/quiz" element={<Quiz />}></Route>
                        </Routes>
                    </BrowserRouter>
                </div>
            </UserContext.Provider>
        </AuthProvider>
    );
}

export default App;