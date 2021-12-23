import './App.css';
import { ChakraProvider, Container } from "@chakra-ui/react";
import Terminal from './Terminal';
import PouchDB from 'pouchdb-browser';
import { Provider } from 'use-pouchdb';
import StopButton from './components/StopButton';
import RunButton from './components/RunButton';
import { HStack, VStack } from '@chakra-ui/react';
import ManageYaml from './components/ManageYaml';

const db = new PouchDB('local')
const remoteLog = new PouchDB('http://admin:123@localhost:5984/icarus_log')

db.sync(remoteLog, {
  live: true,
  //retry: true,
}).on('change', function (change) {
  console.log(change)
}).on('error', function (err) {
  console.log('err en log:', err)
});

function App() {  
  return (
    <Provider pouchdb={db}>
      <ChakraProvider>
        <Container maxW="80rem" centerContent>
          <HStack>
            <VStack>
              <HStack>
                <RunButton workspace="abc"/>
                <StopButton workspace="abc"/>
              </HStack>
              <Terminal />          
            </VStack>
            <ManageYaml workspace="abc" />
          </HStack>
        </Container>
      </ChakraProvider>
    </Provider>
  );
}

export default App;
