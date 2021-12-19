import './App.css';

import Card from './Card';
import { ChakraProvider, SimpleGrid, Container } from "@chakra-ui/react";

const dataList = [
  {
    id: "1",
    repo: 'icarus.py',
    instances: [{
      name: 'wipi',
      description: 'Un backend para el proyecto icarus',
      branch: 'dev',
      status: 'running'
    }, {
      name: 'yuju',
      description: 'Un backend para el proyecto icarus',
      branch: 'feature 1',
      status: 'stopped'
    }]
  },
  {
    id: "2",
    repo: null,
    instances: [{
      name: 'una demo con python',
      description: 'una demo para probar como invertir un diccionario',
      branch: null,
      status: 'running'
    }]
  }
];

function App() {
  return (
    <ChakraProvider>
      <Container maxW="80rem" centerContent>
        <SimpleGrid columns={[1, 2, 1, 2]}>
          {dataList.map(function (data) {
            const { id, repo, instances } = data;
            return (
              <Card
                key={id}
                repo={repo}
                instances={instances}
              />
            );
          })}
        </SimpleGrid>
      </Container>
    </ChakraProvider>
  );
}

export default App;
