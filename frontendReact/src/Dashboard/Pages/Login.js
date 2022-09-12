import image_BG from "../../Assets/bg_blur.jpg";
import LoginForm from "../Components/Auth/LoginForm";
import Weather from "../Components/Widgets/Utils/Weather/Weather";
import {useState} from "react";
import WeatherRender from "../Components/Widgets/Utils/Weather/RenderDefault"


function Login() {

    const [weartherWidget, setWeartherWidget] = useState(new Weather());
    return(
        <>
            <div className="flex flex-col h-screen justify-center center overflow-scroll" style={{
                backgroundImage : `url(${image_BG})`,
                backgroundPosition: "center",
                backgroundAttachment : "fixed",
                backgroundSize: "cover",
                backgroundRepeat: 'no-repeat',
            }}>

                <LoginForm/>
                <div className="xl:absolute xl:top-5 xl:left-5 sm:flex sm:justify-center bg-transparent">
                    <WeatherRender/>
                </div>
            </div>
        </>
    )
}export default Login;