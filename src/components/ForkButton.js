import React from "react";
import { Button } from "@chakra-ui/react";
import axios from 'axios';

async function fork(workspace, forkedName){
    await axios.post('/api/workspace/' + workspace + '/fork/' + forkedName);
}

const ForkButton = ({workspace, forkedName}) => {
    return <Button  colorScheme='teal' variant='outline' onClick={()=>fork(workspace, forkedName)}>Stop</Button>
}

export default ForkButton;