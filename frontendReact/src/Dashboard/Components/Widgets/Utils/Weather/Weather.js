import Render from "./Render";
import Widgets from "../../../../Models/Widgets";

class Weather extends Widgets{

    render() {
        return Render();
    }


    closeFunctions() {
        //call delete function
        //WeatherService.deletePref();
        super.closeFunctions();
    }

    constructor() {
        super("Weather", "https://png.clipart.me/previews/6e8/weather-icon-psd-45670.jpg", Weather);
    }

}
export default Weather;