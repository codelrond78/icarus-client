import { useEffect, useRef, useState } from 'react';
import {Terminal} from 'xterm';
import { HStack } from "@chakra-ui/react";

function ReactTerminal({lines}){
    const [linesWritten, setLinesWritten] = useState(0);
    const el = useRef(null);
    var term = null;

    if(term){
        for(let line of lines.slice(linesWritten)){
            term.writeln(line);
        }
        setLinesWritten(lines.length);
    }

    useEffect(()=>{                
        const current = el.current;
        if(current){
            term = new Terminal();    
            //term.open(document.getElementById('terminal'));
            term.open(current);
            var shellprompt = '$ ';
        
            term.prompt = function () {
                term.write('\r\n' + shellprompt);
            };
        
            term.writeln('Welcome to xterm.js');
            term.writeln('This is a local terminal emulation, without a real terminal in the back-end.');
            term.writeln('Hello from \x1B[1;3;32mxterm.js\x1B[0m $ ')
            term.prompt();
        }
        return () => term.dispose
    }, [])
    
    return (<HStack>
            <span>Terminal</span>
            <span ref={el}></span>
        </HStack>)
}

export default ReactTerminal;