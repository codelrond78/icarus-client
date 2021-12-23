import React, { useState } from "react";
import { Button } from "@chakra-ui/react";
import axios from 'axios';
import { HStack, VStack } from '@chakra-ui/react';
import Highlight from 'react-highlight';
import { Textarea } from '@chakra-ui/react';
import {
    useRecoilState, useRecoilValue,
} from 'recoil';
import {currentWorkspaceYaml, currentWorkspaceName} from '../store';

async function create(workspace, yaml){
    console.log('create', workspace, yaml);
    await axios.post('/api/workspace/' + workspace, yaml, {
        headers: {
           'Content-Type': 'text/plain'
        }
     });
}

async function save(workspace, yaml){
    console.log('save', workspace, yaml);
}

async function fork(workspace, forkedName){
    console.log('fork', workspace, forkedName);
    //await axios.post('/api/workspace/' + workspace + '/fork/' + forkedName);
}

const EditButton = ({onClick}) => {
    return <Button  colorScheme='teal' variant='outline' onClick={onClick}>Edit</Button>
}

const CancelEditButton = ({onClick}) => {
    return <Button  colorScheme='teal' variant='outline' onClick={onClick}>Cancel</Button>
}

const ForkButton = ({workspace, forkedName, toggleEdit}) => {
    function onClick(){
        toggleEdit();
        fork(workspace, forkedName);
    }
    return <Button  colorScheme='teal' variant='outline' onClick={onClick}>Stop</Button>
}

const CreateButton = ({workspace, yaml, toggleEdit}) => {
    function onClick(){
        toggleEdit();
        create(workspace, yaml);
    }
    return <Button  colorScheme='teal' variant='outline' onClick={onClick}>Create</Button>
}

const SaveButton = ({workspace, toggleEdit, yaml}) => {
    toggleEdit();
    return <Button  colorScheme='teal' variant='outline' onClick={()=>save(workspace, yaml)}>Save</Button>
}

//const ClearButton

const ManageYaml = () => {    
    const [edit, setEdit] = useState(false);
    const [yamlText, setYamlText] = useRecoilState(currentWorkspaceYaml);
    const workspace = useRecoilValue(currentWorkspaceName);

    const handleYamlChange = (event) => setYamlText(event.target.value);
    const toggleEdit = () => setEdit(!edit);

    return (
        <VStack>
            {edit ? 
                <VStack>
                    <Textarea value={yamlText} onChange={handleYamlChange} />
                    <HStack>
                        {
                            workspace ? 
                                <SaveButton workspace={workspace} yaml={yamlText} toggleEdit={toggleEdit} /> 
                                :
                                <CreateButton workspace="abc" yaml={yamlText} toggleEdit={toggleEdit} />                             
                        }
                        <CancelEditButton onClick={toggleEdit} />
                    </HStack>
                </VStack>
                :
                <VStack>
                    <HStack>
                        <EditButton onClick={toggleEdit} />
                        <ForkButton workspace={workspace} forkedName={"xyz"} />                        
                    </HStack>
                    <Highlight className='yaml'>{yamlText}</Highlight>
                </VStack>                
            }
        </VStack>
    )
}

export default ManageYaml;