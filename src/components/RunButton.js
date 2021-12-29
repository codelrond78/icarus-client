import React from "react";
import { Button } from "@chakra-ui/react";
import axios from 'axios';
import { VscPlay } from "react-icons/vsc";
import { Icon } from '@chakra-ui/react';

async function start(workspace){
    const url = `/api/workspace/${workspace}/run`;
    console.log(url);
    await axios.put(url);
}

const StartButton = ({workspace}) => {
    return <Button leftIcon={<Icon as={VscPlay} />} colorScheme='teal' variant='outline' onClick={()=>start(workspace)}>Run</Button>
}

export default StartButton;