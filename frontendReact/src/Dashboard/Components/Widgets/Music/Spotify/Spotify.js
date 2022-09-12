import Render from "./Render";
import Widgets from "../../../../Models/Widgets";
class Spotify extends Widgets{

    render() {
        return Render();
    }


    closeFunctions() {
        //call delete function
        super.closeFunctions();
    }

    constructor() {
        super("Spotify", "https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Spotify_logo_without_text.svg/768px-Spotify_logo_without_text.svg.png", Spotify);
    }

}
export default Spotify;