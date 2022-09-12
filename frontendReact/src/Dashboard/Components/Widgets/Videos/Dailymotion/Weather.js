import Render from "./Render";
import Widgets from "../../../../Models/Widgets";
import Icon from "./dailymotion.png";

class Dailymotion extends Widgets{

    render() {
        return Render();
    }


    closeFunctions() {
        //call delete function
        //WeatherService.deletePref();
        super.closeFunctions();
    }

    constructor() {
        super("Dailymotion", Icon, Dailymotion);
    }

}
export default Dailymotion;