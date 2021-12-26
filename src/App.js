import './App.css';
import { ChakraProvider, Container, Center, Input } from "@chakra-ui/react";
import Terminal from './Terminal';
import PouchDB from 'pouchdb-browser';
import { Provider } from 'use-pouchdb';
import { HStack, VStack } from '@chakra-ui/react';
import ManageYaml from './components/ManageYaml';
import WorkspaceList from './components/WorkspaceList';
import {RecoilRoot, useRecoilState, useRecoilValue} from 'recoil';
import { passwordAtom } from './store';

/*
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
*/

function Password(){
  // eslint-disable-next-line no-unused-vars
  const [password, setPassword] = useRecoilState(passwordAtom);
  return (
    <Center bg='tomato' h='100px' color='white'>
      <Input onKeyPress={e=> {
          if (e.key === 'Enter') {
            setPassword(e.value);
          }
      }}/>
    </Center>
  )
}

function MyPouchProvider({password, children}){
  const localLog = new PouchDB('localLog');
  const remoteLog = new PouchDB(`http://admin:${password}@localhost:5984/icarus_log`);

  localLog.sync(remoteLog, {
    live: true,
    retry: true,
  }).on('change', function (change) {
    console.log(change)
  }).on('error', function (err) {
    console.log('err en log:', err)
  });

  const localWorkspaces = new PouchDB('localWorkspaces')
  const remoteWorkspaces = new PouchDB(`http://admin:${password}@localhost:5984/workspaces`)

  localWorkspaces.sync(remoteWorkspaces, {
    live: true,
    retry: true,
    filter: 'example/myWorkspaces',
  }).on('change', function (change) {
    console.log(change)
  }).on('error', function (err) {
    console.log('err en log:', err)
  });
  return (
      <Provider default="localLog"
            databases={{
              localLog,
              localWorkspaces,
            }}
      >
        {children}
      </Provider>
  )
}

function App() {  
  const password = useRecoilValue(passwordAtom);
  return (
      <ChakraProvider>
        <RecoilRoot>
          {!password ? <Password /> : (
            <MyPouchProvider password={password}>
              <Container maxW="80rem" centerContent>
                <HStack>
                  <WorkspaceList />
                  <VStack style={ {maxWidth: '500px'} }>
                    <ManageYaml workspace="gorilla" />
                    <Terminal />          
                  </VStack>            
                </HStack>
              </Container>
            </MyPouchProvider>
          )}          
        </RecoilRoot>
      </ChakraProvider>
  );
}

export default App;
