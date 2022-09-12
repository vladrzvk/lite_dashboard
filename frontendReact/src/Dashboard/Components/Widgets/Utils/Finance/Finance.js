import Render from "./Render";
import Icon from "./finance.png";
import Widgets from "../../../../Models/Widgets";
class Finance extends Widgets{

    render() {
        return Render();
    }


    closeFunctions() {
        //call delete function
        super.closeFunctions();
    }

    constructor() {
        super("Finance", Icon, Finance);
    }

}
export default Finance;