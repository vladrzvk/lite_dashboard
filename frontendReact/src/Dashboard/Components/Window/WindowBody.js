
function WindowBody(props) {
    return(
        <div className="p-2 justify-center flex items-center">
            {props.render()}
        </div>
    );
}export default WindowBody;