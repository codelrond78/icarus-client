import React, {useState} from 'react';
import { Box, Button } from "@chakra-ui/react";
import { useRecoilValue} from 'recoil';
import { passwordAtom } from '../store';
import PouchDBChanges from 'react-pouchdb-changes';

function terminalLineData(lines){
    let mappedLines = lines.map(line => line.type === 'input' ? line.timestamp + ' $' + line.text.trim(): line.text.trim());
    return mappedLines.join("\n");
}

const Shell = () => {    
   const password = useRecoilValue(passwordAtom);
   const [lines, setLines] = useState([]);

    function clear(){
        setLines(lines => []);
    }

   return (
        <PouchDBChanges
            dbUrl={`https://admin:${password}@${process.env.REACT_APP_COUCHDB}/icarus_log`}
            changesOpts={{
                since: 'now',
                live: true,
                include_docs: true
            }}
            onChange={change => {
                setLines(lines => [...lines, change.doc])
                }
            }
            onError={err => console.log(err)}
        >
            <Box>
                <Button onClick={clear}>Clear</Button>
                <div style={{overflow: 'hidden'}}>
                    <pre className='shell' style={ { whiteSpace: 'pre-wrap', backgroundColor: '#FFDFD3', maxWidth: '800px'} } >{terminalLineData(lines)}</pre>
                </div>                
            </Box>
        </PouchDBChanges>   
    )
}

export default Shell;