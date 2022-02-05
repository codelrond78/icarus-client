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
import axios from 'axios';

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
        <Link href={'http://' + host + process.env.REACT_APP_ICARUS + ':7999'} isExternal>
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

  async function deleteWorkspace(workspace, specification){
    try{
      const response = await db.put({...doc, _deleted: true});
      console.log(response);
      if(id === doc._id){
        setActiveWorkspace(null);
      }
      const url = `/api/workspace/${workspace}/delete`;
      console.log(url);
      response = await axios.put(url, {specification});
      console.log(response.data);
    }catch(err){
      console.log(err);
    }    
  }

function isRunning(containers){
  return containers && containers.length !== 0;
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
                {isTemplate ? <ForkButton specification={specification} /> : (<>
                    {!isRunning(containers) ? <RunButton workspace={id} specification={specification} />: null}
                    {isRunning(containers) ? <StopButton workspace={id} specification={specification} />: null}
                    <Button  leftIcon={<Icon as={IoTrashOutline} />} colorScheme='pink' onClick={()=>deleteWorkspace(id, specification)}></Button>
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
