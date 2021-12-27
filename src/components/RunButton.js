import React from "react";
import { Button } from "@chakra-ui/react";
//import axios from 'axios';

async function start(workspace){
    const url = `/api/workspace/${workspace}/start`;
    console.log(url);
    //await axios.put('/api/workspace/' + workspace + '/start');
}

const StopButton = ({workspace}) => {
    return <Button  colorScheme='teal' variant='outline' onClick={()=>start(workspace)}>Stop</Button>
}

export default StopButton;