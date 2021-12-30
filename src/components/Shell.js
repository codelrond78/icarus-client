import React from 'react';
import { useAllDocs } from 'use-pouchdb';
import Highlight from 'react-highlight';
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
  
    return (<Box style={ {maxWidth: '500px'} } >
                <Highlight className='shell'>{terminalLineData(lines)}</Highlight>
            </Box>)
}

export default Shell;