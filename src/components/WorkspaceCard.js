import React from "react";
import {
  Box,
  Text,
  Link,
  Stack,
  HStack,
  List,
  ListItem
} from "@chakra-ui/react";
import StopButton from "./StopButton";
import RunButton from "./RunButton";
import { ExternalLinkIcon } from '@chakra-ui/icons';

function Port({port}){
    return (
        <Link href={'http://localhost:' + port} isExternal>
            Open port {port} <ExternalLinkIcon mx='2px' />
        </Link>
    )
}

function Container({container}){
    const {name, status, ports} = container;

    return (
    <Box
        borderColor="gray"
    >
        <div>{name}: {status}</div>
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
        <Text>{description}</Text>
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
