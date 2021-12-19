import './App.css';

import Card from './Card';
import { ChakraProvider, SimpleGrid, Container } from "@chakra-ui/react";

/*
const data = [{
  name: 'wipi',
  description: '......', // from file description.txt for example
  is_repo: true,
  url_repo: '...',
  branch: 'dev',
  has_container: true,
  container_status: 'running'
}];

const cocinado = [{
  repo: '...',
  //url_repo: '...',
  instances: [{
    name: 'wipi',
    description: '......',
    branch: 'dev',
    status: 'running'
  }]
}];
*/

const dataList = [
  {
    id: "1",
    repo: 'icarus.py',
    //url_repo: '...',
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
