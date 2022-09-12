
import axios from "axios";

const API_URL = "https://api.dailymotion.com/videos?fields=duration%2Cembed_url%2Cowner.avatar_240_url%2Cthumbnail_240_url%2Ctitle%2Cid%2Cowner.username%2Cupdated_time&limit=5"


const search = (q) => {
    return axios.get(API_URL + "&search=" + q);
};

export default {
    search,
};