import React, { useState } from "react";
import {
  Box,
  Text,
  Button,
  Stack
} from "@chakra-ui/react";

function InstanceCard({name, branch, status}) {
    console.log(name, branch, status)
  return (
    <Box
      p={4}
      display={{ md: "flex" }}
      maxWidth="32rem"
      borderWidth={status==="running"?4:1}
      margin={2}
      borderColor={status==="running"?"teal":"gray"}
    >
      <Stack
        align={{ base: "center", md: "stretch" }}
        textAlign={{ base: "center", md: "left" }}
        mt={{ base: 4, md: 0 }}
        ml={{ md: 6 }}
      >
        <Text>{name}</Text>
        {branch?<Text>branch: {branch}</Text>:null}
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
                <Text my={2} color="gray.500">
                    {instances[0].description}
                </Text>        
                <Button maxWidth="100px" my={2} onClick={()=>setMore(!more)} >
                &hellip;
                </Button>
                {more ? 
                    instances.map(({name, description, branch, status}) => <InstanceCard 
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

function Card({repo, instances}){
    const {name, description, branch, status} = instances[0];
    if(instances.length === 1) return <InstanceCard 
        key={name} 
        name={name} 
        description={description} 
        branch={branch} 
        status={status} 
    />
    return <RepoCard repo={repo} instances={instances}/>

}

export default Card;
