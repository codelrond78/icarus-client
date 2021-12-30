import './App.css';
import { ChakraProvider, Container,  
         HStack, VStack
} from "@chakra-ui/react";
//import Terminal from './components/Terminal';
import Shell from './components/Shell';
import PouchDB from 'pouchdb-browser';
import { Provider } from 'use-pouchdb';
import ManageYaml from './components/ManageYaml';
import WorkspaceList from './components/WorkspaceList';
import {RecoilRoot, useRecoilValue} from 'recoil';
import { passwordAtom } from './store';
import 'highlight.js/styles/solarized-light.css';
import Password from './components/Password';

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
    console.log('!!!!!!!!!!!! change', change)
  }).on('error', function (err) {
    console.log('err en log:', err)
  });
  return (
      <Provider default="localLog"
            databases={{
              localLog,
              localWorkspaces,
              remoteWorkspaces
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
              <ManageYaml workspace={null} />                        
            </VStack>            
            <Shell />
          </HStack>
        </Container>
      </MyPouchProvider>
    )}          
    </div>
  )
}

/*
function App() {
  return (
  <ChakraProvider>
        <RecoilRoot>
          <Shell />
        </RecoilRoot>
  </ChakraProvider>
  )
}
*/

function App() {  
  
  return (
      <ChakraProvider>
        <RecoilRoot>
          <InnerApp />
        </RecoilRoot>
      </ChakraProvider>
  );
}

export default App;
