import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { quizesAvailable } from "../../api_helper/user_functions";
import Card from "../homepage/Card";

const Explore = () => {
    const [lang, setLang] = useState();
    const [quizes, setQuizes] = useState();
    useEffect(() => {
        if (!lang) return;
        async function getQuizes() {
            let res = await quizesAvailable();
            let quizes = res.quizList;
            quizes = quizes.filter((quiz) => quiz.lang === lang);
            setQuizes(quizes);
        }
        getQuizes();
    }, [lang]);
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        console.log(searchParams.get("lang"));
        let options = document.querySelectorAll("option");
        console.log(options);
        options.forEach((opt) => {
            if (opt.value == searchParams.get("lang")) {
                opt.selected = true;
                setLang(searchParams.get("lang"));
            }
        });
    }, []);

    return (
        <>
            <div className="sortContainer">
                Sort:
                <div className="sortOptions">
                    <div>
                        <label htmlFor="lang">By language:</label>
                        <select
                            onChange={(e) => {
                                if (e.target.value !== "false") setLang(e.target.value);
                            }}
                            name="lang"
                        >
                            <option value={false}>By language</option>
                            <option value="python">Python</option>
                            <option value="javascript">Javascript</option>
                        </select>
                    </div>
                    {/* copy from /profile sorting buttons */}
                </div>
            </div>
            {lang && quizes && (
                <div className="quizRecommended">
                    {quizes.map((quiz) => (
                        <div key={quiz}>
                            <Card key={quiz.quizid} quiz={quiz} />
                        </div>
                    ))}
                </div>
            )}
        </>
    );
};

export default Explore;
