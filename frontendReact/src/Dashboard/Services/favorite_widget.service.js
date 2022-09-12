import Weather from "../Components/Widgets/Utils/Weather/Weather";
import Minecraft from "../Components/Widgets/Games/Minecraft/Minecraft";
import Finance from "../Components/Widgets/Utils/Finance/Finance";
import XTerminal from "../Components/Widgets/Utils/xTerminal/XTerminal";
import Spotify from "../Components/Widgets/Music/Spotify/Spotify";
import Dailymotion from "../Components/Widgets/Videos/Dailymotion/Weather";


function objectToString(object) {
    switch (object.subClass) {
        case Minecraft:
            return "Minecraft";
        case Finance:
            return "Finance";
        case Dailymotion:
            return "Dailymotion";
        case XTerminal:
            return "XTerminal";
        case Weather:
            return "Weather";
        case Spotify:
            return "Spotify"
        default:
            return "Weather";
    }
}

function stringToObject(string){
    switch (string) {
        case "Minecraft":
            return new Minecraft();
        case "Dailymotion":
            return new Dailymotion();
        case "Spotify":
            return new Spotify();
        case "Finance":
            return new Finance();
        case "XTerminal":
            return new XTerminal();
        case "Weather":
            return new Weather();
        default:
            return new Weather();
    }
}

function removeFav(widget){
    let fav_storage = JSON.parse(localStorage.getItem("fav"));
    if(fav_storage !=null){
        fav_storage.splice(fav_storage.indexOf(objectToString(widget)), 1);
    }else{
        fav_storage = [];
    }
    localStorage.setItem("fav", JSON.stringify(fav_storage));
}
function getFav(){
    let fav_storage = JSON.parse(localStorage.getItem("fav"));
    if(fav_storage ==null){
        return [new Weather()];
    }else{
        let res = [];
        fav_storage.map(item=>{
            res.push(stringToObject(item));
        })
        return res;
    }
}
function saveFav(widget){
    let fav_storage = JSON.parse(localStorage.getItem("fav"));
    if(fav_storage !=null){
        fav_storage.push(objectToString(widget));

    }else{
        fav_storage = ["Weather"];
        fav_storage.push(objectToString(widget));
    }
    localStorage.setItem("fav", JSON.stringify(fav_storage));
}

export default {
    saveFav,
    getFav,
    removeFav,
}