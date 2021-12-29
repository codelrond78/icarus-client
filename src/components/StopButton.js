import React from "react";
import { Button } from "@chakra-ui/react";
import axios from 'axios';
import { VscDebugStop } from "react-icons/vsc";
import { Icon } from '@chakra-ui/react';

async function stop(workspace, specification){
    const url = `/api/workspace/${workspace}/stop`;
    console.log(url);
    await axios.put(url, {specification});
}

const StopButton = ({workspace, specification}) => {
    return <Button leftIcon={<Icon as={VscDebugStop} />} colorScheme='pink' onClick={()=>stop(workspace, specification)}>Stop</Button>
}

export default StopButton;