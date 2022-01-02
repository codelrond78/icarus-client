import { Center, 
    Input, Text, VStack, Box,
    InputGroup, InputRightElement, Button
} from "@chakra-ui/react";
import { useRecoilState} from 'recoil';
import { useState } from 'react';
import { passwordAtom } from '../store';

function Password(){
    // eslint-disable-next-line no-unused-vars
    const [password, setPassword] = useRecoilState(passwordAtom);
    const [text, setText] = useState('');
    const [show, setShow] = useState(false);
    const handleClick = () => setShow(!show)
  
    return (
      <Box position="relative">
        <Box
          height="100vh"
          width="100%"
          position="absolute"
          top="0"
          left="0"
          transform="translateY(-50%, -50%)"
        >
          <Center h='100vh'>
            <VStack>
              <div style={{maxWidth: "250px", background: "linear-gradient(to right, red, purple)", padding: "3px"}}>
                <div style={{padding: "2rem"}}>
                  <Box>
                    <Box color="white" ml='20px' mr='20px' mt='20px' mb='20px'>
                      <Text align='center'>Icarus</Text>
                      <InputGroup size='md'>
                        <Input  type={show ? 'text' : 'password'} 
                                onChange={(ev) => setText(ev.target.value)} 
                                onKeyPress={e=> {
                                    if (e.key === 'Enter') {
                                        setPassword(text);
                                    }
                                }
                        }/>
                        <InputRightElement width='4.5rem'>
                          <Button color="magenta" h='1.75rem' size='sm' onClick={handleClick}>
                            {show ? 'Hide' : 'Show'}
                          </Button>
                        </InputRightElement>
                      </InputGroup>
                    </Box>  
                  </Box>
                </div>
              </div>
            </VStack>
          </Center>
        </Box>
      </Box>
    )
  }

export default Password;