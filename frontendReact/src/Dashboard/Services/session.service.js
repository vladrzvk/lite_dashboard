

const DURATION_TOKEN = 60 * 60 * 1000;

const storeToken = (data) => {
    if (data.token) {
        const now = new Date()
        data["expiry"] = now.getTime() + DURATION_TOKEN;
        localStorage.setItem("user", JSON.stringify(data));
    }
}

const logout = () => {
    localStorage.removeItem("user");
};
const getCurrentUser = () => {
    const now = new Date()
    let user = JSON.parse(localStorage.getItem("user"));

    if (user && now.getTime() > user.expiry) {
        logout();
        return null;
    } else {
        return user;
    }

};

export default {
    getCurrentUser,
    logout,
    storeToken,
}