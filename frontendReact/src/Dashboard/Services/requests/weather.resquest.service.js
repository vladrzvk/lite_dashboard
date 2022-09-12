import axios from "axios";

import RequestService from "../request.service";
import SessionService from "../session.service";

const getDefaultWeather = () =>{
    return axios.get(RequestService.API_URL + "owm/default",{headers: {
            'Access-Control-Allow-Origin' : '*'}} );
}

const getPrefUser = () =>{
    const session = SessionService.getCurrentUser();
    return axios.get(RequestService.API_URL + "owm/pref/"+session.user.id,{headers: {
            'Authorization' : "Bearer " +session.token,
            'Access-Control-Allow-Origin' : '*'}} );
}
const deletePref = () => {
    const session = SessionService.getCurrentUser();
    axios.delete(RequestService.API_URL + "owm/delete/?user_id="+session.user.id ,{headers: {
            'Authorization' : "Bearer " +session.token,
            'Access-Control-Allow-Origin' : '*'}} );
}
const find = (city) =>{
    console.log(city);
    const session = SessionService.getCurrentUser();
    return axios.post(RequestService.API_URL + "owm/findandadd?user_id="+session.user.id + "&city_name="+city,{},{headers: {
            'Authorization' : "Bearer " +session.token,
            'Access-Control-Allow-Origin' : '*'}} );
}


export default {
    deletePref,
    find,
    getPrefUser,
    getDefaultWeather,
}