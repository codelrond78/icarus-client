import React, {useState} from 'react';
import { Box } from "@chakra-ui/react";
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

   return (
        <PouchDBChanges
            dbUrl={`https://admin:${password}@${process.env.REACT_APP_COUCHDB}/icarus_log`}
            changesOpts={{
                since: 'now',
                live: true,
                include_docs: true
            }}
            onChange={change => setLines([...lines, change.doc])}
            onError={err => console.log(err)}
        >
            <Box>
                <div style={{overflow: 'hidden'}}>
                    <div className='shell' style={ { backgroundColor: '#FFDFD3', overflowY: 'scroll', maxHeight: '800px', maxWidth: '800px'} } >{terminalLineData(lines)}</div>
                </div>                
            </Box>
        </PouchDBChanges>   
    )
}

export default Shell;