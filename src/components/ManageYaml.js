import React, { useEffect, useState } from "react";
import { Button, VStack, HStack } from "@chakra-ui/react";
import { useDoc, usePouch } from 'use-pouchdb';
import { useRecoilState } from 'recoil';
import { activeWorkspaceName} from '../store';
import generateRandomAnimalName from 'random-animal-name-generator';
import CodeEditor from '@uiw/react-textarea-code-editor';
import { VscRepoForked } from "react-icons/vsc";
import { Icon, useToast } from '@chakra-ui/react'
import { v4 as uuidv4 } from 'uuid';


function getNameWorkspace(){
    let name = generateRandomAnimalName();
    console.log('animal random', name)
    name = name.split(' ')[1] + '-' + uuidv4();
    return name;
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

//const ClearButton
//const ValidateButton

const ManageYaml = () => {    
    const [workspace, setActiveWorkspace] = useRecoilState(activeWorkspaceName);
    const { doc } = useDoc(workspace, {db: 'localWorkspaces'}); 
    const db = usePouch('localWorkspaces');
    const toast = useToast();    
    const [yamlText, setYamlText] = useState('#here comes a description\n"version": "3"');

    useEffect(() => {
        if(doc){
            setYamlText(doc.specification);
        }        
    }, [workspace, doc]); 
    
    async function handleCreate(isTemplate=true){
        try{
            const description = getDescriptionFromYaml(yamlText);
            const workspace = getNameWorkspace();
            const response = await db.post({_id: workspace, 
                            description, 
                            specification: yamlText, 
                            type: isTemplate ? 'template': 'workspace',
                            pinned: false,
                            containers: []});
            console.log(response);
            toast({
                title: 'Workspace POST.',
                description: `We've created a workspace: ${workspace}`,
                status: 'success',
                duration: 9000,
                isClosable: true,
              });
            return workspace;
        }catch(err){
            console.log(err);
            toast({
                title: 'Workspace POST.',
                description: `${err}`,
                status: 'error',
                duration: 9000,
                isClosable: true,
              })
        }        
    }

    async function handleSave(){
        try{
            const description = getDescriptionFromYaml(yamlText);
            const doc = await db.get(workspace);
            const response = await db.put({...doc, specification: yamlText, description});
            console.log(response);
            toast({
                title: 'Workspace PUT.',
                description: "We've update a workspace.",
                status: 'success',
                duration: 9000,
                isClosable: true,
              })
        }catch(err){
            console.log(err);
            toast({
                title: 'Workspace PUT.',
                description: `${err}`,
                status: 'error',
                duration: 9000,
                isClosable: true,
              })
        }
    }

    async function handleFork(){
        const workspace = await handleCreate(false);
        setActiveWorkspace(workspace);
    }

    async function handleCreateTemplate(){
        const workspace = getNameWorkspace();
        const response = await db.post({_id: workspace, 
                        description: "#Template", 
                        specification: "#Template", 
                        type: 'template',
                        pinned: false,
                        containers: []
                    });
        console.log(response);
        setActiveWorkspace(workspace);
    }

    return (
        <VStack>
            <VStack>
                <span>{workspace || 'without name'}</span>
                <HStack>
                    <Button onClick={handleFork} leftIcon={<Icon as={VscRepoForked} />} colorScheme='teal' variant='outline'>
                        Fork
                    </Button>
                    <Button onClick={handleCreateTemplate} colorScheme='teal' variant='outline'>Create template</Button>
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
                    <Button colorScheme='teal' variant='outline' onClick={handleSave}>Save</Button>
                    :
                    <Button colorScheme='teal' variant='outline' onClick={handleCreate}>Create</Button>
                }
            </VStack>
        </VStack>
    )
}

export default ManageYaml;