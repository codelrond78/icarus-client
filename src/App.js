import './App.css';
import { ChakraProvider, Container, Button } from "@chakra-ui/react";
import Terminal from './Terminal';
import { LineType } from 'react-terminal-ui';
import { useState } from 'react';

const lines = [
  {type: LineType.Output, value: 'Welcome to the React Terminal UI Demo!'},
  {type: LineType.Input, value: 'Some previous input received'},
];

function App() {
  const [lineData, setLineData] = useState(lines);
  return (
    <ChakraProvider>
      <Container maxW="80rem" centerContent>
        <Terminal terminalLineData={lineData} />
        <Button onClick={()=>setLineData(
            [...lineData, 
              {type: LineType.Input, 
              value: 'Otra línea'
              }
            ])}>Otra línea</Button>
      </Container>
    </ChakraProvider>
  );
}

export default App;
