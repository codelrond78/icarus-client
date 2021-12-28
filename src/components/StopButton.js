import React from "react";
import { Button } from "@chakra-ui/react";
//import axios from 'axios';
import { VscDebugStop } from "react-icons/vsc";
import { Icon } from '@chakra-ui/react';

async function stop(workspace){
    const url = `/api/workspace/${workspace}/stop`;
    console.log(url);
    //await axios.put(url);
}

const StopButton = ({workspace}) => {
    return <Button leftIcon={<Icon as={VscDebugStop} />} colorScheme='pink' onClick={()=>stop(workspace)}>Stop</Button>
}

export default StopButton;