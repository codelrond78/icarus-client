import './App.css';
import { ChakraProvider, Container } from "@chakra-ui/react";
import Terminal from './Terminal';
import PouchDB from 'pouchdb-browser';
import { Provider } from 'use-pouchdb';
import { HStack, VStack } from '@chakra-ui/react';
import ManageYaml from './components/ManageYaml';
import WorkspaceList from './components/WorkspaceList';

const localLog = new PouchDB('localLog');
const remoteLog = new PouchDB('http://admin:123@localhost:5984/icarus_log');

localLog.sync(remoteLog, {
  live: true,
  retry: true,
}).on('change', function (change) {
  console.log(change)
}).on('error', function (err) {
  console.log('err en log:', err)
});

const localWorkspaces = new PouchDB('localWorkspaces')
const remoteWorkspaces = new PouchDB('http://admin:123@localhost:5984/workspaces')

localWorkspaces.sync(remoteWorkspaces, {
  live: true,
  retry: true,
  filter: 'example/myWorkspaces',
}).on('change', function (change) {
  console.log(change)
}).on('error', function (err) {
  console.log('err en log:', err)
});


function App() {  
  return (
    <Provider default="localLog"
      databases={{
        localLog,
        localWorkspaces,
      }}
    >
      <ChakraProvider>
        <Container maxW="80rem" centerContent>
          <HStack>
            <WorkspaceList />
            {/*<VStack>
              <ManageYaml workspace="abc" />
              <HStack>
                <RunButton workspace="abc"/>
                <StopButton workspace="abc"/>
              </HStack>
              <Terminal />          
            </VStack>            
            */}
          </HStack>
        </Container>
      </ChakraProvider>
    </Provider>
  );
}

export default App;
