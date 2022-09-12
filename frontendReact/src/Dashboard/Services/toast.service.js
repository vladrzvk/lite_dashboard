import ReactDOM from "react-dom";
import Success from "../Toasts/Success";
import Error from "../Toasts/Error";
import Info from "../Toasts/Info";



const getPlacement = () => {
    let div = document.getElementById("toast-emplacement");
    if (div){
        return div;
    }else{
        let div = document.createElement("div");
        div.style.position = "fixed";
        div.style.top = "0";
        div.style.padding = "3rem"
        div.style.zIndex = "60000";
        div.id = "toast-emplacement";
        div.style.right = "0";
        document.body.append(div);

        return div;
    }
}

const success = async (message) => {
    let div = getPlacement();

    let toaster = document.createElement("div")
    ReactDOM.render(<Success message={message}/>,toaster);

    div.append(toaster);

    setTimeout(() => {   toaster.remove(); }, 2000);

}
const error = async (message) => {
    let div = getPlacement();

    let toaster = document.createElement("div")
    ReactDOM.render(<Error message={message}/>,toaster);

    div.append(toaster);

    setTimeout(() => {   toaster.remove(); }, 3000);

}
const info = async (message) => {
    let div = getPlacement();

    let toaster = document.createElement("div")
    ReactDOM.render(<Info message={message}/>,toaster);

    div.append(toaster);

    setTimeout(() => {   toaster.remove(); }, 3000);

}


export default {
    success,
    error,
    info,
}