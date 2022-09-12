import {IoIosArrowDropleftCircle} from "react-icons/all";
import {Link, useNavigate} from "react-router-dom";
import AuthService from "../../Services/requests/auth.request.service";
import ToastService from "../../Services/toast.service";
import GoogleLogin from "react-google-login";

function RegisterForm() {
    const history = useNavigate();

    const handleLoginGoogle = async googleData => {
        console.log(googleData);
        let id_token = googleData.getAuthResponse().id_token;

        if(id_token){
            AuthService.loginWithGoogle(id_token).then(
                (response) => {
                    ToastService.success("Login successfully");
                    history("/")
                },
                (error) => {
                    ToastService.error(error.toString());
                }
            );

        }else{
            ToastService.error("Login failed");
        }


    }

    const handleRegister = (e) => {
        e.preventDefault();

        let form = document.forms.registerform;

        let firstName = form.fist_name.value;
        let lastName = form.last_name.value;
        let password = form.password.value;
        let password_confirm = form.confirm_password.value;
        let email = form.email.value;

        if(password !== password_confirm){
            ToastService.error("Passwords do not match. Try Again");
        }else{
            AuthService.register(firstName, lastName, email, password).then(
                (response) => {

                    ToastService.success("Register successfully");
                    history("/")

                },
                (error) => {
                    ToastService.error(error.toString());
                }
            );
        }


    };

    return(
        <>
            <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8">
                    <div>
                        <img
                            className="mx-auto h-24 w-auto"
                            src="https://key0.cc/images/small/2096759_4ee75907d3177a55e5a1409bf28c78f1.png"
                            alt="Workflow"
                        />

                    </div>
                    <form className="mt-8 space-y-3  relative"  name="registerform" onSubmit={handleRegister}>
                        <div className="absolute top-0 -left-20">
                            <button
                                type="submit"
                                className="group relative flex justify-center p-1 border border-transparent text-sm font-medium     rounded-full   text-white bg-gray-300 opacity-75  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                            <span className="flex items-center ">
                              <IoIosArrowDropleftCircle className="h-12 w-12 text-gray-500 group-hover:text-gray-200" aria-hidden="true" />
                            </span>

                            </button>
                        </div>
                        <input type="hidden" name="remember" defaultValue="true" />
                        <div className="rounded-md shadow-lg -space-y-px">
                            <div className="flex flew-row ">
                                <div className="mr-1">
                                    <label htmlFor="first-name" className="sr-only">
                                        First Name
                                    </label>
                                    <input
                                        id="first-name"
                                        name="fist_name"
                                        type="text"
                                        autoComplete="email"
                                        required
                                        className="appearance-none rounded-none relative block w-full px-3 py-4 bg-gray-300 opacity-75 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                        placeholder="First Name"
                                    />
                                </div>
                                <div className="ml-1">
                                    <label htmlFor="last-name" className="sr-only">
                                        Last Name
                                    </label>
                                    <input
                                        id="last-name"
                                        name="last_name"
                                        type="text"
                                        autoComplete="current-password"
                                        required
                                        className="appearance-none rounded-none relative block w-full px-3 py-4 bg-gray-300 opacity-75 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                        placeholder="Last Name"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="rounded-md shadow-lg">
                            <div className="mb-3">
                                <label htmlFor="email-address" className="sr-only">
                                    Email address
                                </label>
                                <input
                                    id="email-address"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-4 bg-gray-300 opacity-75 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    placeholder="Email address"
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="sr-only">
                                    Password
                                </label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="password"
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-4 bg-gray-300 opacity-75 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    placeholder="Password"
                                />
                            </div>
                            <div className="mb-1">
                                <label htmlFor="confirm-password" className="sr-only">
                                   Confirm Password
                                </label>
                                <input
                                    id="confirm-password"
                                    name="confirm_password"
                                    type="password"
                                    autoComplete="confirm-password"
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-4 bg-gray-300 opacity-75 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    placeholder="Confirm Password"
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                />
                                <label htmlFor="remember-me" className="ml-2 block text-sm text-white">
                                    Remember me
                                </label>
                            </div>

                            <div className="text-sm">
                                <Link to="/login" className="font-medium text-gray-400 hover:text-gray-500">
                                    You already have an account ?
                                </Link>
                            </div>
                        </div>

                        <div className="flex flex-row items-center gap-2">
                            <div className="sm: border-b sm:border-gray-400 flex-grow"> </div>
                            <div className="text-gray-300">Or continue with</div>
                            <div className="sm: border-b sm:border-gray-400 flex-grow"> </div>

                        </div>
                        <div className="flex flex-row items-center gap-2">
                            <GoogleLogin
                                className="flex flex-grow justify-center p-1 border border-transparent text-sm font-medium rounded-md text-white bg-gray-300 opacity-75  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"

                                clientId={'302989144123-c8vmja36mr2vfq1k8k57qt6ojvki0pcg.apps.googleusercontent.com'}
                                buttonText="Log in"
                                onSuccess={handleLoginGoogle}
                                onFailure={handleLoginGoogle}
                            />
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}export default RegisterForm;