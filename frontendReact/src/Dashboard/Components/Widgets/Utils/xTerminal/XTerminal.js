import Render from "./Render";
import Widgets from "../../../../Models/Widgets";

class XTerminal extends Widgets{


    render() {
        return Render();
    }
    constructor() {
        super("XTerm ~ NotWorking", "https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/GNOME_Terminal_icon_2019.svg/1200px-GNOME_Terminal_icon_2019.svg.png", XTerminal);
    }

}
export default XTerminal;