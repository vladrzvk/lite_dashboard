import Window from "../Components/Window/Window";
import ItemNavBar from "../Components/NavBar/ItemNavBar";
import MenuCard from "../Components/MenuCard";


class Widgets {
    id; windowTitle; imgIcon; subClass;
    static idCount = 0;

    getID(){
        return this.id;
    }
    closeFunctions(){

    }
    constructor(windowTitle, imgIcon, subClass)  {
        this.windowTitle = windowTitle;
        this.imgIcon = imgIcon;
        this.subClass = subClass;
        Widgets.idCount++;
        this.id = Widgets.idCount+"."+Date.now();

    }

    createWindows(closeWidget) {
        return(
            <Window
                key={this.id}
                title={this.windowTitle}
                index={this.id}
                closeWidget={closeWidget}
                render={this.render}
            />
        )
    }
    createIcon(openWidget, isOpen){
        return(
            <ItemNavBar
                openWidget={openWidget}
                img={this.imgIcon}
                widget={this.subClass}
                open={isOpen}
            />
        )
    }

    createCardMenu(openWidget, closeMenu,favChanges){
        return(
            <MenuCard title={this.windowTitle} openWidget={openWidget}
                      closeMenu={closeMenu}
                      favChanges={favChanges}
                      widget={this} icon={this.imgIcon} key={this.id}/>
        )
    }



    render(openWidget){}
}export default Widgets;
