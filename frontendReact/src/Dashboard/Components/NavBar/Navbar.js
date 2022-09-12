
function Navbar(props) {
    return(
        <div className="h-full flex flex-col justify-center pt-8 max-h-screen ">
            <div className={(props.items.length + props.favs.length) > 0 ? "max-h-full bg-opacity-20 bg-gray-400 rounded-lg p1 flex flex-col gap-2 p-2 pb-1 border border-gray-500" : "p-6"}>
                {props.favs.map(item=>{
                    if (!props.items.map(function(x) {return x.subClass; }).includes(item.subClass)){
                        return(
                            item.createIcon(props.openWidget, false)
                        )
                    }

                })}
                {props.items.map(item=>{
                    return(
                        item.createIcon(props.openWidget, true)
                    )
                })}
            </div>
        </div>

    )
}export default Navbar;