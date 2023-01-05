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

export const singUpReq = (username, password) => {
    let request = fetch(apiUrl + "signup", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: username, password: password }),
    })
        .then((res) => {
            if (res.ok) return res.json();
            return res.text().then((txt) => {
                let err = JSON.parse(txt);
                throw new Error(err.msg);
                return err;
            });
        })
        .then((data) => {
            return data;
        })
        .catch((err) => {
            console.error(err);
        });

    return request;
};
