
function ItemNavBar(props) {
    return(
        <div
            onClick={async () => {
                if(!props.open){
                    await props.openWidget(new props.widget)
                }


            }}
            className="h-16 w-16">
            <div className="h-full w-full relative rounded-lg hover:bg-gray-300 hover:opacity-70 flex justify-end items-center" style={{
                backgroundImage : " url(\""+props.img+"\")",
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundRepeat: 'no-repeat',
            }}>
                {props.open ?   <div className="h-8 w-1 bg-white bg-opacity-80 relative rounded -right-2"> </div>
                    : null}

            </div>
        </div>
    )
}export default  ItemNavBar;