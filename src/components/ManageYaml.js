import React, { useEffect, useState } from "react";
import { Button, VStack, HStack } from "@chakra-ui/react";
import { useDoc, usePouch } from 'use-pouchdb';
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

const ForkButton = ({setActiveWorkspace}) => {
    return <Button onClick={()=>setActiveWorkspace(null)} leftIcon={<Icon as={VscRepoForked} />} colorScheme='teal' variant='outline'>
        Fork
    </Button>
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
    const db = usePouch('localWorkspaces')
    
    const [yamlText, setYamlText] = useState('#here comes a description\n"version": "3"');

    useEffect(() => {
        if(doc){
            setYamlText(doc.specification);
        }        
    }, [workspace, doc]); 
    
    async function handleCreate(){
        const description = getDescriptionFromYaml(yamlText);
        const workspace = getNameWorkspace();
        await db.post({id: workspace, description, specification: yamlText});
    }

    async function handleSave(){
        const description = getDescriptionFromYaml(yamlText);
        const doc = await db.get(workspace);
        await db.put({...doc, specification: yamlText, description});
    }

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
                    <Button colorScheme='teal' variant='outline' onClick={handleSave}>Save</Button>
                    :
                    <Button colorScheme='teal' variant='outline' onClick={handleCreate}>Create</Button>
                }
            </VStack>
        </VStack>
    )
}

export default ManageYaml;