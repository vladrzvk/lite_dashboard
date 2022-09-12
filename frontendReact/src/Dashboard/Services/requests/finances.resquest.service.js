import axios from "axios";

import RequestService from "../request.service";
import SessionService from "../session.service";


const getAllCurrenties = () =>{
    const session = SessionService.getCurrentUser();
    return axios.get(RequestService.API_URL + "yfinance/all",{headers: {
            'Authorization' : "Bearer " +session.token,
            'Access-Control-Allow-Origin' : '*'}} );
}


const getDetails = (code) =>{
    const session = SessionService.getCurrentUser();
    return axios.get(RequestService.API_URL + "yfinance/details/"+code,{headers: {
            'Authorization' : "Bearer " +session.token,
            'Access-Control-Allow-Origin' : '*'}} );
}


export default {
    getAllCurrenties,
    getDetails,
}