import React from "react";
import {
  Box,
  Text,
  Link,
  Stack,
  HStack,
  List,
  ListItem,
  ListIcon
} from "@chakra-ui/react";
import StopButton from "./StopButton";
import RunButton from "./RunButton";
import { ExternalLinkIcon, ViewIcon } from '@chakra-ui/icons';
import { useRecoilState } from "recoil";
import { activeWorkspaceName } from '../store';

function Port({port}){
    return (
        <Link href={'http://localhost:' + port} isExternal>
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

function Card({workspace:  {id, description, containers}}) {
  // eslint-disable-next-line no-unused-vars
  const [_, setActiveWorkspace] = useRecoilState(activeWorkspaceName);

  return (
    <Box
      p={4}
      display={{ md: "flex" }}
      maxWidth="32rem"
      borderWidth={4}
      margin={2}
      borderColor={'gray'}
    >
      <Stack
        align={{ base: "center", md: "stretch" }}
        textAlign={{ base: "center", md: "left" }}
        mt={{ base: 4, md: 0 }}
        ml={{ md: 6 }}
      >
        <Link onClick={()=>setActiveWorkspace(id)}><ListIcon as={ViewIcon} color='green.500' /><Text>{description}</Text></Link>        
        <HStack>
          <RunButton workspace={id} />
          <StopButton workspace={id} />
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
