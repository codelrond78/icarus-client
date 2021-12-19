import React, { useState } from "react";
import {
  Box,
  //Flex,
  AspectRatio,
  Image,
  Text,
  Link,
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
      <AspectRatio ratio={1 / 1}>
        <Image
          maxWidth="200px"
          margin="auto"
          src="https://picsum.photos/id/237/250/250"
          alt="Woman paying for a purchase"
        />
      </AspectRatio>
      <Stack
        align={{ base: "center", md: "stretch" }}
        textAlign={{ base: "center", md: "left" }}
        mt={{ base: 4, md: 0 }}
        ml={{ md: 6 }}
      >
        <Link
          my={1}
          display="block"
          fontSize="md"
          lineHeight="normal"
          fontWeight="semibold"
          href="#"
        >
          {name}, {status}, {branch}
        </Link>
        <Text my={2} color="gray.500">
          {description}
        </Text>        
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
            <AspectRatio ratio={1 / 1}>
                <Image
                maxWidth="200px"
                margin="auto"
                src="https://picsum.photos/id/237/250/250"
                alt="Woman paying for a purchase"
                />
            </AspectRatio>
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
