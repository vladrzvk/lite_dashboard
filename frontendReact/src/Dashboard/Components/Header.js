import {FaApple} from "react-icons/all";
import {useState, useEffect} from "react";
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import {Link, useNavigate} from "react-router-dom";
import SessionService from "../Services/session.service";
import ToastService from "../Services/toast.service";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

function Header(props) {

    const [timeNow, setTimeNow] = useState(getTimeNow);
    const [currentUser, setCurrentUser] = useState(SessionService.getCurrentUser());
    const history = useNavigate();

    function logout(){
        SessionService.logout();
        ToastService.info("You have been logout")
        history("/login")
    }

    function getTimeNow() {
        let d = new Date();
        return ( d.toLocaleString())
    }
    useEffect(() => {
        const interval = setInterval(() => {
            setTimeNow(getTimeNow())
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return(
      <div className="w-full fixed h-7 bg-gray-700  shadow flex flex-warp between text-white z-30" >
          <Menu as="div" className="relative inline-block text-left">
              <div className="pl-4">
                  <Menu.Button className="inline-flex justify-center w-full rounded-md  shadow-sm text-sm font-medium ">

                      <FaApple size={25} color={"white"}/>
                  </Menu.Button>
              </div>

              <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
              >
                  <Menu.Items className="origin-top-left absolute left-3 w-64 shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none">
                      <div className="py-1">
                          <Menu.Item>
                              {({ active }) => (
                                  <button

                                      onClick={()=>{props.setIsWidgetMenuOpen(true)}}
                                      className={classNames(
                                          active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                          'block px-4 py-2 text-sm'
                                      )}
                                  >
                                      Open widget Menu
                                  </button>
                              )}
                          </Menu.Item>

                      </div>
                      <div className="py-1">
                          <Menu.Item>
                              {({ active }) => (
                                  <a
                                      href="#"
                                      onClick={logout}
                                      className={classNames(
                                          active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                          'block px-4 py-2 text-sm'
                                      )}
                                  >
                                      Logout
                                  </a>
                              )}
                          </Menu.Item>
                          <Menu.Item>
                              {({ active }) => (
                                  <Link
                                      to="/shutdown"
                                      className={classNames(
                                          active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                          'block px-4 py-2 text-sm'
                                      )}
                                  >
                                      Shutdown
                                  </Link>
                              )}
                          </Menu.Item>
                      </div>

                      <div className="py-1">
                          <Menu.Item>
                              {({ active }) => (
                                  <a
                                      href="#"
                                      className={classNames(
                                          active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                          'block px-4 py-2 text-sm'
                                      )}
                                  >
                                      <div className="flex items-center">
                                          <div className="flex-shrink-0 h-10 w-10">
                                              <img
                                                  className="h-10 w-10 rounded-full"
                                                  src={"https://eu.ui-avatars.com/api/?name="+currentUser.user.username}
                                                   alt=""
                                              />
                                          </div>
                                          <div className="ml-4">
                                              <div className="text-sm font-medium text-gray-900">
                                                  {currentUser.user.firstName} {currentUser.user.lastName}
                                              </div>
                                              <div className="text-sm text-gray-500">
                                                  {currentUser.user.username}
                                              </div>
                                          </div>
                                      </div>
                                  </a>
                              )}
                          </Menu.Item>
                      </div>
                  </Menu.Items>
              </Transition>
          </Menu>

          <div className="flex-grow flex justify-end pr-3 gap-4">
              <div>{timeNow}</div>
          </div>
      </div>
    );
}export default Header;