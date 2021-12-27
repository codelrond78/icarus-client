import './App.css';
import { ChakraProvider, Container, Center, Input, Text, HStack, VStack, Box } from "@chakra-ui/react";
import Terminal from './components/Terminal';
import PouchDB from 'pouchdb-browser';
import { Provider } from 'use-pouchdb';
import ManageYaml from './components/ManageYaml';
import WorkspaceList from './components/WorkspaceList';
import {RecoilRoot, useRecoilState, useRecoilValue} from 'recoil';
import { passwordAtom } from './store';
import { useState } from 'react';
import Highlight from 'react-highlight';
import 'xterm/css/xterm.css';
import 'highlight.js/styles/solarized-light.css';

function Password(){
  // eslint-disable-next-line no-unused-vars
  const [password, setPassword] = useRecoilState(passwordAtom);
  const [text, setText] = useState('');
  return (
    <Box position="relative">
      <Box
        height="100vh"
        width="100%"
        position="absolute"
        top="0"
        left="0"
        transform="translateY(-50%, -50%)"
      >
        <Center bg='tomato' h='100%' w='100%' color='white'>
          <VStack>
            <Text>Icarus</Text>
            <Input onChange={(ev) => setText(ev.target.value)} onKeyPress={e=> {
                if (e.key === 'Enter') {
                  setPassword(text);
                }
            }}/>
          </VStack>
        </Center>
      </Box>
    </Box>
  )
}

function MyPouchProvider({password, children}){
  console.log('entramos en my pouch provider')
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

function InnerApp(){
  const password = useRecoilValue(passwordAtom);
  return (
    <div>
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
    </div>
  )
}

const Shell = () => {
  const text = `
$ docker-compose up -d
starting containers...  
`;

  return <Highlight  className='shell'>{text}</Highlight>
}

function App() {
  return (
  <ChakraProvider>
        <RecoilRoot>
          <Shell />
        </RecoilRoot>
  </ChakraProvider>
  )
}

function _App() {  
  
  return (
      <ChakraProvider>
        <RecoilRoot>
          <InnerApp />
        </RecoilRoot>
      </ChakraProvider>
  );
}

export default App;
