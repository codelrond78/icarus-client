import React from "react";
import { Button } from "@chakra-ui/react";
//import axios from 'axios';
import { VscPlay } from "react-icons/vsc";
import { Icon } from '@chakra-ui/react';

async function start(workspace){
    const url = `/api/workspace/${workspace}/start`;
    console.log(url);
    //await axios.put('/api/workspace/' + workspace + '/start');
}

const StartButton = ({workspace}) => {
    return <Button leftIcon={<Icon as={VscPlay} />} colorScheme='teal' variant='outline' onClick={()=>start(workspace)}>Stop</Button>
}

export default StartButton;