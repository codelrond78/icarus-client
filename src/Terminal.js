import React from 'react';
import Terminal, { ColorMode } from 'react-terminal-ui';
import { useAllDocs } from 'use-pouchdb';
import { LineType } from 'react-terminal-ui';

function terminalLineData(docs){
    return docs.map(doc => ({
        type: doc.doc.line.type === 'input' ? LineType.Input: LineType.Output, value: doc.doc.line.text
    }))
}

const TerminalController = () => {
  const { rows: lines } = useAllDocs({
    include_docs: true, 
  })
    
  return (
    <div className="container">
      <Terminal name='React Terminal Usage Example' 
        colorMode={ ColorMode.Light }  
        lineData={ terminalLineData(lines) } 
        />
    </div>
  )
};

export default TerminalController