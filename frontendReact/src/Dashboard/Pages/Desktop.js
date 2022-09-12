import Navbar from "../Components/NavBar/Navbar";
import Header from "../Components/Header";
import {useEffect, useState} from "react";
import Widgets from "../Pages/Widgets";
import image_BG from "../../Assets/bg.jpg";

import FavoriteWidgetService from "../Services/favorite_widget.service";
import SessionService from "../Services/session.service";
import {useNavigate} from "react-router-dom";

function Desktop() {

    const [currentUser, setCurrentUser] = useState(SessionService.getCurrentUser());
    const history = useNavigate();

    const [isWidgetMenuOpen, setIsWidgetMenuOpen] = useState(false);
    const [navList, setNavList] = useState([]);
    const [favList, setFavList] = useState(FavoriteWidgetService.getFav());
    const [windowList, setWindowList] = useState([]);
    const [boolrefresh, setBoolrefresh] = useState(false);

    useEffect(() => {

            if(!currentUser){
                history("/login")
            }

    }, []);



    function openWidget(widget){
        if(!windowList.includes(widget)){
            console.log(widget.title +      " opened")
            windowList.push(widget);
            navList.push(widget);
            setWindowList(windowList);
            setBoolrefresh(!boolrefresh);

        }

    }
    function fav(widget){
        if (!favList.map(function(x) {return x.subClass; }).includes(widget.subClass)){
            FavoriteWidgetService.saveFav(widget);
            favList.push(widget);
            setFavList(favList);

        }else{
            const index = favList.map(function(x) {return x.subClass; }).indexOf(widget.subClass);
            favList.splice(index,1);
            FavoriteWidgetService.removeFav(widget);
            setFavList(favList);
        }
        setIsWidgetMenuOpen(false);
    }
    function closeWidget(id) {

        const index = windowList.map(function(x) {return x.getID(); }).indexOf(id);


        navList.splice(index,1);
        setWindowList(navList);
        const item = windowList[index];
        item.closeFunctions();
        windowList.splice(index,1);
        setWindowList(windowList);
        setBoolrefresh(!boolrefresh)

    }

    useEffect(() => {
        return () => {

        };
    }, [boolrefresh]);


    return(
        <>

            <div className="flex flex-col max-h-screen h-screen between" style={{
                backgroundImage : `url(${image_BG})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundRepeat: 'no-repeat',
            }}>
                {isWidgetMenuOpen?
                    <Widgets openWidget={openWidget}
                             setIsWidgetMenuOpen={setIsWidgetMenuOpen}
                             favChange={fav}
                    /> : null}
                <Header setIsWidgetMenuOpen={setIsWidgetMenuOpen}/>
                <div className="flex flex-row h-full">
                    <Navbar openWidget={openWidget} items={navList} favs={favList}/>
                    <div className="flex-grow h-full max-h-full overflow-scroll pt-5 pl-15">
                        <div className="w-full flex flex-wrap min-h-screen gap-3 p-1 pt-10 pl-10 pb-12">
                            {windowList.map((item)=>{
                                return(
                                    item.createWindows(closeWidget)

                                );
                            })}
                        </div>
                    </div>

                </div>


            </div>

        </>
    )
}export default  Desktop;