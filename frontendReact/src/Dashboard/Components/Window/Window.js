//import Draggable from 'react-draggable';
import WindowHeader from "./WindowHeader";
import WindowBody from "./WindowBody";
import {useState} from "react";

function Window(props) {
    const [isMaxSize, setIsMaxSize] = useState(false);
    const [position, setPosition] = useState(null);

    function maxSize(){
        setIsMaxSize(!isMaxSize);
        setPosition({x: 0,y: 0})
    }
    function close() {
        setIsMaxSize(false);
        console.log(props.index);
        props.closeWidget(props.index);
    }

    return(
        <div className="block">
       {/* <Draggable
            disabled={isMaxSize}
            defaultPosition={{x: 20, y: -21}}
            bounds='parent'



        >*/}

                {isMaxSize ?
                    <div className="absolute top-0 left-0 pt-7 pl-24 h-full w-full z-50">
                        <div
                            className="flex flex-col inline-block bg-white rounded-sm shadow-ultime w-full h-full z-50">
                            <WindowHeader close={close} maxSize={maxSize}/>
                            <WindowBody isMaxSize={isMaxSize} render={props.render}/>
                        </div>
                    </div>

                    :
                    <div>
                    <div
                        className={"flex flex-col inline-block bg-white h-fit rounded shadow-ultime w-min z-1"}>
                        <WindowHeader title={props.title} close={close} maxSize={maxSize}/>
                        <WindowBody isMaxSize={isMaxSize} render={props.render}/>
                    </div>
                    </div>
                }




      {/*  </Draggable>*/}
        </div>
    );

}export default Window;