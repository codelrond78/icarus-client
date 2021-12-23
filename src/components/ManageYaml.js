import React, { useState } from "react";
import { Button } from "@chakra-ui/react";
import axios from 'axios';
import { HStack, VStack } from '@chakra-ui/react';
import Highlight from 'react-highlight';
import { TextArea } from '@chakra-ui/react';

async function create(workspace){
    await axios.post('/api/workspace/' + workspace);
}

async function fork(workspace, forkedName){
    await axios.post('/api/workspace/' + workspace + '/fork/' + forkedName);
}

const EditButton = ({toggleEdit, title}) => {
    return <Button  colorScheme='teal' variant='outline' onClick={toggleEdit}>{title}</Button>
}

const ForkButton = ({workspace, forkedName}) => {
    return <Button  colorScheme='teal' variant='outline' onClick={()=>fork(workspace, forkedName)}>Stop</Button>
}

const CreateButton = ({workspace}) => {
    return <Button  colorScheme='teal' variant='outline' onClick={()=>create(workspace)}>Stop</Button>
}

const ManageYaml = ({workspace=null, yamlText=''}) => {    
    const [edit, setEdit] = useState(false);
    const [text, setText] = useState(yamlText);

    const handleYamlChange = (event) => setText(event.target.value);
    const toggleEdit = () => setEdit(!edit);

    return (
        <VStack>
            <HStack>
                <ForkButton />
            </HStack>
            {edit ? 
                <VStack>
                    <TextArea value={text} onChange={handleYamlChange} />
                    <EditButton toggleEdit={toggleEdit} title="Done editing." />
                </VStack>
                :
                <VStack>
                    <HStack>
                        {
                            workspace === null 
                            ? 
                            <CreateButton workspace="abc" /> 
                            : 
                            <ForkButton workspace={workspace} forkedName={"xyz"} />
                        }
                        <EditButton toggleEdit={toggleEdit} title="Edit" />
                    </HStack>
                    <Highlight className='yaml'>{yamlText}</Highlight>
                </VStack>                
            }
        </VStack>
    )
}

export default ManageYaml;