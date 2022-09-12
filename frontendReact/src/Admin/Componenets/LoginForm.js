import {IoIosArrowDropleftCircle} from "react-icons/all";
import AuthService from "../auth.admin.service"
import ToastService from "../../Dashboard/Services/toast.service";

function LoginForm(props) {


    const handleLogin = (e) => {
        e.preventDefault();

        let form = document.forms.loginform;

        let password = form.password.value;

        let email = form.username.value;

        AuthService.login(email, password).then(
            (response) => {

                let isAdmin = false;
                response.user.authorities.map(item=>{
                   if(item.authority === "ROLE_ADMIN"){
                       isAdmin = true;
                   }
                });

                if(isAdmin){

                    ToastService.success("Login successfully");
                }else{

                    ToastService.error("This account is not administrater");
                }
               props.setCurrentUser(AuthService.getCurrentUser());

            },
            (error) => {
                ToastService.error(error.toString());
            }
        );

    };

    return(
        <>
            <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8">
                    <div className="xl:block  hidden">
                        <img
                            className="mx-auto h-24 w-auto xl:block hidden"
                            src="https://key0.cc/images/small/2096759_4ee75907d3177a55e5a1409bf28c78f1.png"
                            alt="Workflow"
                        />

                    </div>
                    <form className="mt-8 space-y-6 relative" name="loginform" onSubmit={handleLogin}>
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
                            <div className="mb-1">
                                <label htmlFor="email-address" className="sr-only">
                                    Email address
                                </label>
                                <input
                                    id="email-address"
                                    name="username"
                                    type="text"
                                    autoComplete="username"
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-4 bg-gray-300 opacity-75 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    placeholder="Email address"
                                />
                            </div>
                            <div className="mb-1">
                                <label htmlFor="password" className="sr-only">
                                    Password
                                </label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-4 bg-gray-300 opacity-75 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    placeholder="Password"
                                />
                            </div>
                        </div>



                    </form>
                </div>
            </div>
        </>
    )
}export default LoginForm;