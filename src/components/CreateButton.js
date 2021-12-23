import React from "react";
import { Button } from "@chakra-ui/react";
import axios from 'axios';

async function create(workspace){
    await axios.post('/api/workspace/' + workspace);
}

const CreateButton = ({workspace}) => {
    return <Button  colorScheme='teal' variant='outline' onClick={()=>create(workspace)}>Stop</Button>
}

export default CreateButton;