import image_BG from "../../Assets/bg_blur.jpg";
import RegisterForm from "../Components/Auth/RegisterForm";


function Register() {
    return(
        <>
            <div className="flex flex-col h-screen justify-center center" style={{
                backgroundImage : `url(${image_BG})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundRepeat: 'no-repeat',
            }}>
                <RegisterForm/>
            </div>
        </>
    )
}export default Register;