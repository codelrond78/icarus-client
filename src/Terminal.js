import React from 'react';
import Terminal, { ColorMode } from 'react-terminal-ui';

const TerminalController = ({terminalLineData}) => {
  
  return (
    <div className="container">
      <Terminal name='React Terminal Usage Example' 
        colorMode={ ColorMode.Light }  
        lineData={ terminalLineData } 
        />
    </div>
  )
};

export default TerminalController