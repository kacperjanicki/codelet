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
