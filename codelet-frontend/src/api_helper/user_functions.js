let apiUrl = process.env.REACT_APP_apiURL;

export const loginReq = (username, password) => {
    fetch(apiUrl + "login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({ user: username, pass: password }),
    })
        .then((res) => res.json())
        .then((data) => console.log(data));
};

export const singUpReq = (username, password, email) =>
    fetch(apiUrl + "signup", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({ username: username, pass: password, email: email }),
    })
        .then((res) => res.json())
        .then((data) => console.log(data));
