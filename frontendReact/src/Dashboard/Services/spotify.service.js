import axios from "axios";

const API_URL = "https://api.spotify.com/v1";
const API_AUTH_URL = "https://accounts.spotify.com";

const CLIENT_ID = "d80c63df742a41cabe077b0de55650d0";
const REDIRECT_URI = encodeURIComponent("http://localhost:3000/");

const getAccessToken = () => {
    if(localStorage.getItem('spotifyToken')){
        return JSON.parse(localStorage.getItem('spotifyToken'));
    }
    const accessToken = window.location.hash
    .substring(1)
    .split('&')
    .reduce((initial, item) => {
        const parts = item.split('=');
        initial[parts[0]] = decodeURIComponent(parts[1]);
        return initial;
    }, {}).access_token
    if (accessToken) {            
        localStorage.setItem('spotifyToken', JSON.stringify(accessToken));
        return accessToken;
    }
    else {
        const accessUrl = `${API_AUTH_URL}/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=token`;
        window.location = accessUrl;
    }
}

const login = () => {
	const accessToken = window.location.hash
    .substring(1)
    .split('&')
    .reduce((initial, item) => {
        const parts = item.split('=');
        initial[parts[0]] = decodeURIComponent(parts[1]);
        return initial;
    }, {}).access_token
    if (accessToken) {            
        localStorage.setItem('spotifyToken', JSON.stringify(accessToken));
        return accessToken;
    }
    else {
        const accessUrl = `${API_AUTH_URL}/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=token`;
        window.location = accessUrl;
    }
}

const searchAlbums = (query) => {
	const accessToken = getAccessToken();
	const searchQuery = query;
	const fetchQuery = `q=${searchQuery}`;
	return axios.get(API_URL + `/search?${fetchQuery}&type=album`,{headers: {
			'Authorization' : `Bearer ${accessToken}`,
		}} );
//            'Access-Control-Allow-Origin' : '*'}} );
}

export default {
	searchAlbums,
	login
}