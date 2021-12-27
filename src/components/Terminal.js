import { useEffect, useRef } from 'react';
import {Terminal} from 'xterm';

function ReactTerminal({}){
    const el = useRef(null);

    useEffect(()=>{                
        const current = el.current;
        if(current){
            var term = new Terminal();    
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
    
    return <div><div ref={el}></div></div>
}

export default ReactTerminal;