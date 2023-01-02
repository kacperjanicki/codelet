import "./css/Core.css";
import Quiz from "./components/Quiz";
import LandingPage from "./components/LandingPage";
import Login from "./components/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
    return (
        <div className="bgDefault">
            <BrowserRouter>
                <Routes>
                    <Route exact path="/" element={<LandingPage />}></Route>
                    <Route exact path="/login" element={<Login />}></Route>
                    <Route exact path="/quiz" element={<Quiz />}></Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
