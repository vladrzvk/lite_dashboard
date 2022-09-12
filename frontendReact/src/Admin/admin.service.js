import axios from "axios";
import AuthService from "./auth.admin.service";
import {FaUsers} from "react-icons/all";



const API_URL = "http://localhost:8080/";

const getAll = (route) => {
    const user = AuthService.getCurrentUser();
    return axios.get(API_URL + route,{headers : {Authorization : 'Bearer ' + user.token} });
}
const deleteItem = (route, id) =>{
    const user =  AuthService.getCurrentUser();
    return axios.delete(
        API_URL + route + id,
        {
            headers: {Authorization: 'Bearer ' + user.token},
            data: {"user_agent_id": user.id,},
        }
    );
}
const updateItem = (route, id, data) =>{
    const user =  AuthService.getCurrentUser();
    data["id"] = id;
    return axios.put(
        API_URL + route,
        data,
        {
            headers: {
                Authorization: 'Bearer ' + user.token,
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'

            },
        }
    );
}

const addItem = (route, data) =>{
    const user =  AuthService.getCurrentUser();
    data["user_agent_id"] = user.id
    return axios.post(
        API_URL + route,
        data,
        {
            headers: {Authorization: 'Bearer ' + user.token},
        }
    );
}
/*
confirm_password	"test"
email	"test@gmail.com"
first_name	"test"
last_name	"test"
password	"test"
phone_number	"+336333432"
role	"test"
user_agent_id	13
*/
const CONFIG = {

    "user" : {
        "icon" :  <FaUsers size={20}/>,
        "link_text": "User",
        "link" : "/admin/user",
        "color_bg" : "bg-blue-500",
        "route" : {
            "get_all" : "user/users",
            "delete": "user/",
            "update": "user/",
            "add" : "user/signup",
        },
        "columns": [
            {
                "type" : "text",
                "name" : "id",
                "editable" : false,
            },
            {
                "type" : "text",
                "name" : "username",
                "editable" : true,
            },
            {
                "type" : "text",
                "name" : "lastName",
                "editable" : true,
            },
            {
                "type" : "text",
                "name" : "firstName",
                "editable" : true,
            },
            {
                "type" : "text",
                "name" : "password",
                "editable" : true,
            },
        ]
    },

}
export default {
    CONFIG,
    getAll,
    deleteItem,
    updateItem,
    addItem
};
