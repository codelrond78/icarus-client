import './App.css';
import { ChakraProvider, Container } from "@chakra-ui/react";
import Terminal from './Terminal';
import PouchDB from 'pouchdb-browser';
import { Provider } from 'use-pouchdb';
import StopButton from './components/StopButton';
import RunButton from './components/RunButton';
import { HStack, VStack } from '@chakra-ui/react'
import Highlight from 'react-highlight'

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

const yamlText = `
version: "3.9"  # optional since v1.27.0
services:
  db:
    image: mongo
    ports: ["27017"]

`

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
            <Highlight className='yaml'>
              {yamlText}
            </Highlight>
          </HStack>
        </Container>
      </ChakraProvider>
    </Provider>
  );
}

export default App;
