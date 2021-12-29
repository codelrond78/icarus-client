import React, { useEffect, useState } from "react";
import { Button, VStack, HStack } from "@chakra-ui/react";
import axios from 'axios';
import { useDoc } from 'use-pouchdb';
import { useRecoilState } from 'recoil';
import { activeWorkspaceName} from '../store';
import generateRandomAnimalName from 'random-animal-name-generator';
import CodeEditor from '@uiw/react-textarea-code-editor';
import { VscRepoForked } from "react-icons/vsc";
import { Icon } from '@chakra-ui/react'
  
function getNameWorkspace(){
    const name = generateRandomAnimalName();
    console.log('animal random', name)
    return name.split(' ')[1];
}

async function create(yaml, description){
    const workspace = getNameWorkspace();
    const url = `/api/workspace/${workspace}`;
    console.log('POST', url);
    console.log(yaml);
    console.log(description);
    await axios.post(url, {yaml, description});
}

async function save(workspace, yaml, description){
    const url = `/api/workspace/${workspace}`;
    console.log('PUT', url);
    console.log(yaml);
    console.log(description);
    await axios.put(url, {yaml, description})
}

const ForkButton = ({setActiveWorkspace}) => {
    return <Button onClick={()=>setActiveWorkspace(null)} leftIcon={<Icon as={VscRepoForked} />} colorScheme='teal' variant='outline'>
        Fork
    </Button>
}

const CreateButton = ({yaml}) => {
    const description = getDescriptionFromYaml(yaml);
    function onClick(){
        create(yaml, description);
    }
    return <Button colorScheme='teal' variant='outline' onClick={onClick}>Create</Button>
}

function getDescriptionFromYaml(yaml){
    const lines = yaml.split('\n');
    let ret = [];
    for(let line of lines){
        if(!line.startsWith('#')) 
            break;
        ret.push(line)
    }
    return ret.join('\n')
}

const SaveButton = ({workspace, yaml}) => {
    const description = getDescriptionFromYaml(yaml);
    return <Button colorScheme='teal' variant='outline' onClick={()=>save(workspace, yaml, description)}>Save</Button>
}

//const ClearButton
//const ValidateButton

const ManageYaml = () => {    
    const [workspace, setActiveWorkspace] = useRecoilState(activeWorkspaceName);
    const { doc } = useDoc(workspace, {db: 'localWorkspaces'});
    
    const [yamlText, setYamlText] = useState('#here comes a description\n"version": "3"');

    useEffect(() => {
        if(doc){
            setYamlText(doc.specification);
        }        
    }, [workspace, doc]); 
    

    return (
        <VStack>
            <VStack>
                <span>{workspace || 'without name'}</span>
                <HStack>
                    <ForkButton setActiveWorkspace={setActiveWorkspace} />
                </HStack>
                <CodeEditor
                    value={yamlText}
                    minHeight="500px"                    
                    language="yaml"
                    placeholder="Please enter JS code."
                    onChange={(evn) => setYamlText(evn.target.value)}
                    padding={15}
                    style={{
                        fontSize: 12,
                        backgroundColor: "#f5f5f5",
                        fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
                    }}
                    />
                {workspace ? 
                    <SaveButton workspace={workspace} yaml={yamlText} /> 
                    :
                    <CreateButton yaml={yamlText} />
                }
            </VStack>
        </VStack>
    )
}

export default ManageYaml;