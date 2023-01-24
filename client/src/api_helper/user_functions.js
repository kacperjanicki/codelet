let apiUrl = process.env.REACT_APP_apiURL;

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

export const singUpReq = (username, password) => {
    let request = fetch(apiUrl + "signup", {
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

export const saveQuizToDb = (id, score, callback, questions) => {
    // console.log(id, score);
    let request = fetch(apiUrl + "quiz/newquiz", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "x-access-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({
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

export const editProfile = (name, newName) => {
    let request = fetch(apiUrl + `user/${name}/editProfile`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "x-access-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({ username: newName }),
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
