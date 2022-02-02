import React from 'react';
import { useAllDocs } from 'use-pouchdb';
//import Highlight from 'react-highlight';
import { Box } from "@chakra-ui/react";

function terminalLineData(lines){
    let mappedLines = lines.map(line => line.doc.type === 'input' ? line.doc.timestamp + ' $' + line.doc.text.trim(): line.doc.text.trim());
    return mappedLines.join("\n");
}

const Shell = () => {
    const { rows: lines } = useAllDocs({
        include_docs: true, 
        //descending: true
    })
  
    return (<Box>
                <div style={{overflow: 'hidden'}}>
                    <div className='shell' style={ { backgroundColor: '#FFDFD3', overflowY: 'scroll', maxHeight: '800px', maxWidth: '800px'} } >{terminalLineData(lines)}</div>
                </div>                
            </Box>)
}

export default Shell;