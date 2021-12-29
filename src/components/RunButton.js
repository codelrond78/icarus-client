import React from "react";
import { Button } from "@chakra-ui/react";
import axios from 'axios';
import { VscPlay } from "react-icons/vsc";
import { Icon } from '@chakra-ui/react';

async function start(workspace, specification){
    const url = `/api/workspace/${workspace}/run`;
    console.log(url);
    await axios.put(url, {specification});
}

const StartButton = ({workspace, specification}) => {
    return <Button leftIcon={<Icon as={VscPlay} />} colorScheme='teal' variant='outline' onClick={()=>start(workspace, specification)}>Run</Button>
}

export default StartButton;