import './App.css';
import { Box, ChakraProvider, Container,  
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
//import pouchdbDebug from "pouchdb-debug";

//PouchDB.plugin(pouchdbDebug);
//PouchDB.debug.enable('*');


function MyPouchProvider({password, children}){
  console.log('entramos en my pouch provider')
  const remoteLog = new PouchDB(`https://admin:${password}@${process.env.REACT_APP_COUCHDB}/icarus_log`);
  const remoteWorkspaces = new PouchDB(`https://admin:${password}@${process.env.REACT_APP_COUCHDB}/workspaces`)

  return (
      <Provider default="remoteLog"
            databases={{
              remoteLog,
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
        <Container maxW="80rem">
          <HStack>
            <Box w="33%">
              <WorkspaceList />
            </Box>
            <Box w="33%">
              <VStack style={ {maxWidth: '500px'} }>
                <ManageYaml workspace={null} />                        
              </VStack>            
            </Box>
            <Box w="33%">
              <Shell />
            </Box>        
          </HStack>
        </Container>
      </MyPouchProvider>
    )}          
    </div>
  )
}

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
