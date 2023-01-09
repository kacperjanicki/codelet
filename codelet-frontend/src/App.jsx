import "./css/Core.css";
import Quiz from "./components/Quiz";
import LandingPage from "./components/LandingPage";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Navbar from "./components/Navbar";
import { createContext, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AuthProvider } from "react-auth-kit";

export const UserContext = createContext();

function App() {
    const [userObj, setUserObj] = useState();

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
