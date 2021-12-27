import React from 'react';
import { useAllDocs } from 'use-pouchdb';
import Highlight from 'react-highlight';

function terminalLineData(docs){
    return docs.map(doc => doc.doc.line.type === 'input' ? '$' + doc.doc.line.text: doc.doc.line.text)
}

const Shell = () => {

    const { rows: lines } = useAllDocs({
        include_docs: true, 
        descending: true
    })
  
    return <Highlight  className='shell'>{terminalLineData(lines)}</Highlight>
}

export default Shell;