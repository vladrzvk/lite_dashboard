import axios from "axios";
import SessionService from "../session.service";
import RequestService from "../request.service";

const register = (firstName, lastName, username, password) => {
    return axios.post(RequestService.API_URL + "user/signup", {
        firstName, lastName, username, password
    },{headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
        }});
};

const login = (username, password) => {
    return axios
        .post(RequestService.API_URL + "auth/login", {
            username,
            password,
        },{headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
            }})
        .then((response) => {
            SessionService.storeToken(response.data);
            return response.data;
        });
};




const loginWithGoogle = (googleIdToken) => {
    return axios
        .post(RequestService.API_URL + "auth/oauth2/google", {
            googleIdToken
        },{headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
            }})
        .then((response) => {
            SessionService.storeToken(response.data);
            return response.data;
        });
};


export default {
    register,
    login,
    loginWithGoogle,
}