import React from "react";
import { Button } from "@chakra-ui/react";
import axios from 'axios';

async function stop(workspace){
    await axios.put('/api/workspace/' + workspace + '/stop');
}

const StopButton = ({workspace}) => {
    return <Button  colorScheme='pink' onClick={()=>stop(workspace)}>Stop</Button>
}

export default StopButton;