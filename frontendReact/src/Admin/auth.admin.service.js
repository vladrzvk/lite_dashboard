import axios from "axios";

const API_URL = "http://localhost:8080/";

const DURATION_TOKEN = 60 * 60 * 1000;

const storeToken = (data) => {
    if (data.token) {
        const now = new Date()
        data["expiry"] = now.getTime() + DURATION_TOKEN;
        localStorage.setItem("user_admin", JSON.stringify(data));
    }
}

const logout = () => {
    localStorage.removeItem("user_admin");
};
const getCurrentUser = () => {
    const now = new Date()
    let user = JSON.parse(localStorage.getItem("user_admin"));

    if (user && now.getTime() > user.expiry) {
        logout();
        return null;
    } else {
        return user;
    }

};



const register = (firstName, lastName, username, password) => {
    return axios.post(API_URL + "user/signup", {
        firstName, lastName, username, password
    },{headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
        }});
};

const login = (username, password) => {
    return axios
        .post(API_URL + "auth/login", {
            username,
            password,
        },{headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
            }})
        .then((response) => {
            storeToken(response.data);
            return response.data;
        });
};




export default {
    register,
    login,
    getCurrentUser,
}