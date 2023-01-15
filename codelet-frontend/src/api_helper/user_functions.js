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

export const saveQuizToDb = (id, score) => {
    // console.log(id, score);
    let request = fetch(apiUrl + "newquiz", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "x-access-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({
            user_id: id,
            score: score,
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
