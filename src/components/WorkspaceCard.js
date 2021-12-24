import React from "react";
import {
  Box,
  Text,
  Link,
  Stack
} from "@chakra-ui/react";

import { ExternalLinkIcon } from '@chakra-ui/icons';

function Port({port}){
    return (
        <Link href={'http://localhost:' + port} isExternal>
            Open port <ExternalLinkIcon mx='2px' />
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
        {ports.map(port => <Port port={port} />)}
    </Box>
    )
}

function Card({description, containers}) {

  const isRunning = containers.map(c => c.status).every(s => s === 'running');
  const isStopped = containers.map(c => c.status).every(s => s === 'stopped');

  let status = '-';

  if(isRunning){
      status = 'running';
  }else if(isStopped){
      status = 'stopped';
  }

  return (
    <Box
      p={4}
      display={{ md: "flex" }}
      maxWidth="32rem"
      borderWidth={status==="running"?4:1}
      margin={2}
      borderColor={status==="running"?"teal":(status==='stopped'?'gray':'yellow')}
    >
      <Stack
        align={{ base: "center", md: "stretch" }}
        textAlign={{ base: "center", md: "left" }}
        mt={{ base: 4, md: 0 }}
        ml={{ md: 6 }}
      >
        <Text>{description}</Text>
        {containers.map(container => <Container container={container} />)}
      </Stack>
    </Box>
  );
}

export default Card;