import React, { useState } from "react";
import {
  Box,
  Text,
  Button,
  Stack
} from "@chakra-ui/react";

function Card({name, description, branch, status}) {

  return (
    <Box
      p={4}
      display={{ md: "flex" }}
      maxWidth="32rem"
      borderWidth={1}
      margin={2}
    >
      <Stack
        align={{ base: "center", md: "stretch" }}
        textAlign={{ base: "center", md: "left" }}
        mt={{ base: 4, md: 0 }}
        ml={{ md: 6 }}
      >
        <Text>{name}</Text>
        <Text>branch: {branch}</Text>
        <Text my={2} color="gray.500">
          {description}
        </Text>        
        {status === 'running' ? <Button colorScheme='teal' variant='outline'>Editar</Button>:null}
        {status === 'running' ? <Button colorScheme='red'>Parar</Button> : <Button colorScheme='teal'>Levantar</Button>}
      </Stack>
    </Box>
  );
}

function RepoCard({repo, instances}){
    const [more, setMore] = useState(false);
    return (
    <div>
        <Box
            p={4}
            display={{ md: "flex" }}
            maxWidth="32rem"
            borderWidth={1}
            margin={2}
            >
            <Stack
                align={{ base: "center", md: "stretch" }}
                textAlign={{ base: "center", md: "left" }}
                mt={{ base: 4, md: 0 }}
                ml={{ md: 6 }}
            >    
                <div>{repo}</div>
                <Button maxWidth="100px" my={2} onClick={()=>setMore(!more)} >
                &hellip;
                </Button>
                {more ? 
                    instances.map(({name, description, branch, status}) => <Card 
                        key={name} 
                        name={name} 
                        description={description} 
                        branch={branch} 
                        status={status} 
                    />)
                    :
                    null
                }
            </Stack>
        </Box>
    </div>
    )
}

export default RepoCard;
