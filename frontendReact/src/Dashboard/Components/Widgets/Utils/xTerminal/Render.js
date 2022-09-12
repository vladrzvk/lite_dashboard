

import {XTerm} from 'xterm-for-react';
import {useEffect, useRef} from "react";

function Render() {
    const xtermRef = useRef(null);
    useEffect(() => {
        // You can call any method in XTerm.js by using 'xterm xtermRef.current.terminal.[What you want to call]
        xtermRef.current.terminal.writeln("Hello, World!")
        xtermRef.current.terminal.write("$>")
    }, [])
    return(
        <XTerm ref={xtermRef}/>
    )
}export default Render;