import {NavLink} from "react-router-dom";
import {IoMdSettings} from "react-icons/all";




const AdminNav = (props) => {
  return(
      <aside className="flex-none">

          <ul className="p-2">
              <NavLink
                  activeClassName="bg-gray-800 rounded text-white"
                  className="block"
                  to="/admin/"
                  exact
              >
                  <li className="my-2 p-3 flex items-center justify-between">

                      <IoMdSettings size={20}/>
                      <div className="ml-3" >Dashboard Admin</div>

                  </li>

              </NavLink>
              <hr className="my-5"/>
          {Object.values(props.data).map(route =>{
              return(
                  <>

                      <NavLink
                          activeClassName="bg-gray-800 rounded text-white"
                          className="block"
                          to={route.link}
                          exact
                      >
                          <li className="my-2 p-3 flex items-center justify-between">

                              {route.icon}
                              <div className="ml-3" >{route.link_text}</div>

                          </li>
                      </NavLink>
                  </>

              )
          })}
          </ul>

      </aside>
  )
}
export default AdminNav;