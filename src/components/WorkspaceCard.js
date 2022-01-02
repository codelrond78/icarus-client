import React from "react";
import { Transition } from 'react-transition-group';
import {
  Box,
  Text,
  Link,
  Stack,
  HStack,
  List,
  ListItem,
  ListIcon,
  Button,
  Image
} from "@chakra-ui/react";
import { IoTrashOutline } from "react-icons/io5";
import { Icon } from '@chakra-ui/react';
import StopButton from "./StopButton";
import RunButton from "./RunButton";
import { ExternalLinkIcon, ViewIcon } from '@chakra-ui/icons';
import { useRecoilState } from "recoil";
import { activeWorkspaceName } from '../store';
import { usePouch, useDoc } from 'use-pouchdb'
import ForkButton from "./ForkButton";

const duration = 300;

const defaultStyle = {
  transition: `opacity ${duration}ms ease-in-out`,
  opacity: 0,
}

const transitionStyles = {
  entering: { opacity: 1 },
  entered:  { opacity: 1 },
  exiting:  { opacity: 0 },
  exited:  { opacity: 0 },
};

function Port({port}){
    const [_, host] = port.split(':');
    return (
        <Link href={'http://localhost:' + host} isExternal>
            Open port {port} <ExternalLinkIcon mx='2px' />
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

function Card({workspace:  {id, description, containers, specification, isTemplate, icon}}) {  
  
  const [activeWorkspace, setActiveWorkspace] = useRecoilState(activeWorkspaceName);
  const db = usePouch('remoteWorkspaces')
  const {doc} = useDoc(id, {db: 'remoteWorkspaces'})

  async function deleteWorkspace(){
    try{
      const response = await db.put({...doc, _deleted: true});
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
            backgroundColor={activeWorkspace === id ? '#FDFD96': 'white'}
          >
            <Stack
              align={{ base: "center", md: "stretch" }}
              textAlign={{ base: "center", md: "left" }}
              mt={{ base: 4, md: 0 }}
              ml={{ md: 6 }}
            >
              <HStack>
                {icon?<Image w="100px" h="100px" src={icon} />:<></>}
                <Text>{id.substring(0, 15)}</Text>
              </HStack>              
              <Link onClick={()=>setActiveWorkspace(id)}><ListIcon as={ViewIcon} color='green.500' /><Text>{description}</Text></Link>        
              <HStack>
                {isTemplate ? <ForkButton yamlText={specification} /> : (<>
                    <RunButton workspace={id} specification={specification} />
                    <StopButton workspace={id} specification={specification} />
                    <Button  leftIcon={<Icon as={IoTrashOutline} />} colorScheme='pink' onClick={deleteWorkspace}></Button>
                  </>
                )}
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
  )
}

export default Card;
