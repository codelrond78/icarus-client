import React from "react";
import {
  Checkbox,
  Box,
  Text,
  Link,
  Stack,
  HStack,
  List,
  ListItem,
  ListIcon,
  Button
} from "@chakra-ui/react";
import { IoTrashOutline } from "react-icons/io5";
import { Icon } from '@chakra-ui/react';
import StopButton from "./StopButton";
import RunButton from "./RunButton";
import { ExternalLinkIcon, ViewIcon } from '@chakra-ui/icons';
import { useRecoilState } from "recoil";
import { activeWorkspaceName } from '../store';
import { usePouch, useDoc } from 'use-pouchdb'


function Port({port}){
    const [remote, host] = port.split(':');
    return (
        <Link href={'http://localhost:' + host} isExternal>
            Open port {remote} <ExternalLinkIcon mx='2px' />
        </Link>
    )
}

function Container({container}){
    const {name, status, ports} = container;
    let color = status === 'running' ? "green" : 'red';
    return (
    <Box
        borderColor="gray"
    >
        <div>{name}: <span style={{ color } }>{status}</span></div>
        <List>
          {ports.map(port => 
            <ListItem key={port}>
              <Port port={port} />
            </ListItem>
          )}        
        </List>
    </Box>
    )
}

function Card({workspace:  {id, description, containers, specification, isTemplate}}) {
  // eslint-disable-next-line no-unused-vars
  const [_, setActiveWorkspace] = useRecoilState(activeWorkspaceName);
  const db = usePouch('remoteWorkspaces')
  const {doc} = useDoc(id, {db: 'remoteWorkspaces'})

  async function deleteWorkspace(){
    try{
      const response = await db.put({...doc, _deleted: true}); //probar a borrar localmente y ver si salta error
      console.log(response);
      if(id === doc._id){
        setActiveWorkspace(null);
      }
    }catch(err){
      console.log(err);
    }    
  }

  return (
    <Box
      p={4}
      display={{ md: "flex" }}
      maxWidth="32rem"
      borderWidth={2}
      margin={2}
    >
      <Stack
        align={{ base: "center", md: "stretch" }}
        textAlign={{ base: "center", md: "left" }}
        mt={{ base: 4, md: 0 }}
        ml={{ md: 6 }}
      >
        <Text>{id.substring(0, 15)}</Text>
        <Link onClick={()=>setActiveWorkspace(id)}><ListIcon as={ViewIcon} color='green.500' /><Text>{description}</Text></Link>        
        <HStack>
          <RunButton workspace={id} specification={specification} />
          <StopButton workspace={id} specification={specification} />
          <Button  leftIcon={<Icon as={IoTrashOutline} />} colorScheme='pink' onClick={deleteWorkspace}></Button>
        </HStack>
        <List>
          {containers.map(container => 
            <ListItem key={container.name}>
              <Container container={container} />
            </ListItem>
          )}
        </List>
      </Stack>
    </Box>
  );
}

export default Card;
