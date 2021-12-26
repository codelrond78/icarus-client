import React, { useEffect, useState } from "react";
import { Button } from "@chakra-ui/react";
import axios from 'axios';
import { HStack, VStack } from '@chakra-ui/react';
import Highlight from 'react-highlight';
import { Textarea } from '@chakra-ui/react';
import { useDoc } from 'use-pouchdb';
import { useRecoilState } from 'recoil';
import { activeWorkspaceName} from '../store';
import yaml from 'js-yaml';
import generateRandomAnimalName from 'random-animal-name-generator';
  
function getNameWorkspace(){
    return generateRandomAnimalName().split(' ')[1];
}

async function create(yaml){
    const workspace = getNameWorkspace();
    const url = `/api/workspace/${workspace}`;
    console.log('POST', url, yaml);
    await axios.post(url, yaml, {
        headers: {
           'Content-Type': 'text/plain'
        }
     });
}

async function save(workspace, yaml){
    console.log('save', workspace, yaml);
}

/*
async function fork(workspace){
    const forkedName = getNameWorkspace();
    const url = `/api/workspace/${workspace}/fork/${forkedName}`;
    console.log('POST', url);
    //await axios.post('/api/workspace/' + workspace + '/fork/' + forkedName);
}
*/

const EditButton = ({onClick}) => {
    return <Button colorScheme='teal' variant='outline' onClick={onClick}>Edit</Button>
}

const CancelEditButton = ({onClick}) => {
    return <Button colorScheme='teal' variant='outline' onClick={onClick}>Cancel</Button>
}

const ForkButton = ({workspace, toggleEdit, setActiveWorkspace}) => {
    function onClick(){
        toggleEdit();
        //fork(workspace);
        setActiveWorkspace(null);
    }
    return <Button colorScheme='teal' variant='outline' onClick={onClick}>Fork</Button>
}

const CreateButton = ({yaml, toggleEdit}) => {
    function onClick(){
        toggleEdit();
        create(yaml);
    }
    return <Button colorScheme='teal' variant='outline' onClick={onClick}>Create</Button>
}

const SaveButton = ({workspace, toggleEdit, yaml}) => {
    toggleEdit();
    return <Button colorScheme='teal' variant='outline' onClick={()=>save(workspace, yaml)}>Save</Button>
}

//const ClearButton
//const ValidateButton

const ManageYaml = () => {    
    const [workspace, setActiveWorkspace] = useRecoilState(activeWorkspaceName);
    const { doc, loading, state, error } = useDoc(workspace, {db: 'localWorkspaces'});
    console.log(loading, state, error)
    const [isValid, setValid] = useState(true);
    const [edit, setEdit] = useState(false);
    const [yamlText, setYamlText] = useState('"version": ";)"');

    useEffect(() => {
        if(doc){
            setYamlText(yaml.dump(doc.specification));
        }        
    }, [workspace, doc]); 
    
    const handleYamlChange = (event) => {
        setValid(false);
        setYamlText(event.target.value);
    }
    const toggleEdit = () => setEdit(!edit);

    return (
        <VStack>
            {edit ? 
                <VStack>
                    <Textarea value={yamlText} onChange={handleYamlChange} />
                    <HStack>
                        {   !isValid ? (<Button>Validate</Button>) :
                            (workspace ? 
                                <SaveButton workspace={workspace} yaml={yamlText} toggleEdit={toggleEdit} /> 
                                :
                                <CreateButton yaml={yamlText} toggleEdit={toggleEdit} />
                            )
                        }
                        <CancelEditButton onClick={toggleEdit} />
                    </HStack>
                </VStack>
                :
                <VStack>
                    <HStack>
                        <EditButton onClick={toggleEdit} />
                        <ForkButton workspace={workspace} toggleEdit={toggleEdit} setActiveWorkspace={setActiveWorkspace} />                        
                    </HStack>
                    <Highlight className='yaml'>{yamlText}</Highlight>
                </VStack>                
            }
        </VStack>
    )
}

export default ManageYaml;