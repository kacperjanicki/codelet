// let apiUrl = process.env.REACT_APP_apiURL;
let apiUrl = "http://localhost:3050/api/";

export const loginReq = (username, password) => {
    return fetch(apiUrl + "login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: username, password: password }),
    })
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));
            return data;
        });
};

export const singUpReq = (username, fname, lname, password, age) => {
    let request = fetch(apiUrl + "signup", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username: username,
            fname: fname,
            lname: lname,
            password: password,
            age: age,
        }),
    })
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            return data;
        });
    return request;
};
export const isUserAuth = () => {
    let request = fetch(apiUrl + "isAuth", {
        method: "GET",
        headers: {
            "x-access-token": localStorage.getItem("token"),
        },
    })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            return data;
        });
    return request;
};

export const saveQuizToDb = (quizId, lang, no, id, score, callback, questions) => {
    // console.log(id, score);
    let request = fetch(apiUrl + "quiz/newquiz", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "x-access-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({
            quizId: quizId,
            lang: lang,
            no: no,
            user_id: id,
            score: score,
            callback: callback,
            questions: questions,
        }),
    })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            return data;
        });
    return request;
};

export const getProfileInfo = (username) => {
    let request = fetch(apiUrl + `getProfileInfo?usr=${username}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            return data;
        });
    return request;
};

export const fetchQuiz = (lang, id) => {
    let request = fetch(apiUrl + `quiz/fetchQuiz/${lang}/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "x-access-token": localStorage.getItem("token"),
        },
    })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            return data;
        });
    return request;
};

export const changeQuizPrivacy = (privacy, id) => {
    let request = fetch(apiUrl + `quiz/${id}/changePublicity`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "x-access-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({ public: privacy, id: id }),
    })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            return data;
        });
    return request;
};

export const quizesAvailable = () => {
    let request = fetch(apiUrl + `quiz/allQuizesFetch`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "x-access-token": localStorage.getItem("token"),
        },
    })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            return data;
        });
    return request;
};
export const getAllUsers = () => {
    let request = fetch(apiUrl + `user/allUsersFetch`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "x-access-token": localStorage.getItem("token"),
        },
    })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            return data;
        });
    return request;
};
// export const validateName = (name) => {
//     let request = fetch(apiUrl + `quiz/validateName?name=${name}`, {
//         method: "GET",
//         headers: {
//             "Content-Type": "application/json",
//             "x-access-token": localStorage.getItem("token"),
//         },
//     })
//         .then((response) => {
//             return response.json();
//         })
//         .then((data) => {
//             return data;
//         });
//     return request;
// };

export const createNewQuiz = (author_id, name, lang, desc, questions, id) => {
    let request = fetch(apiUrl + "quiz/addNewQuiz", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "x-access-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({
            author_id: author_id,
            name: name,
            desc: desc,
            questions: questions,
            lang: lang,
            no: id,
        }),
    })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            return data;
        });
    return request;
};

export const createQuizId = (lang) => {
    let request = fetch(apiUrl + "quiz/newQuizId", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "x-access-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({ lang: lang }),
    })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            return data;
        });
    return request;
};

export const editProfile = (name, valuesChanged) => {
    let request = fetch(apiUrl + `user/${name}/editProfile`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "x-access-token": localStorage.getItem("token"),
        },
        body: JSON.stringify(valuesChanged),
    })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            return data;
        });
    return request;
};

// export const deleteGameFromHistory = (id, player_id) => {
//     let request = fetch(apiUrl + `user/${id}/editProfile`, {
//         method: "PUT",
//         headers: {
//             "Content-Type": "application/json",
//             "x-access-token": localStorage.getItem("token"),
//         },
//         body: JSON.stringify({ id: username, username: newName }),
//     })
//         .then((response) => {
//             return response.json();
//         })
//         .then((data) => {
//             return data;
//         });
//     return request;
// };
