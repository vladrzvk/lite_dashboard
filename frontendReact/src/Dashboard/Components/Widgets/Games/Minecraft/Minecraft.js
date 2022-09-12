import Render from "./Render";
import Widgets from "../../../../Models/Widgets";

class Minecraft extends Widgets{
    render() {
        return Render();
    }
    constructor() {
        super("Minecraft Launcher", "https://cdn.icon-icons.com/icons2/2699/PNG/512/minecraft_logo_icon_168974.png", Minecraft);
    }
}
export default Minecraft;