import React from "react";
import { Button } from "@chakra-ui/react";
import { usePouch } from 'use-pouchdb';
import { useRecoilState } from 'recoil';
import { activeWorkspaceName} from '../store';
import generateRandomAnimalName from 'random-animal-name-generator';
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

async function handleCreate({db, specification, isTemplate=true}){
    const description = getDescriptionFromYaml(specification);
    const workspace = getNameWorkspace();
    const response = await db.post({_id: workspace, 
                    description, 
                    specification, 
                    type: isTemplate ? 'template': 'workspace',
                    pinned: false,
                    containers: []});
    console.log(response);
    return workspace;
}

const ForkButton = ({specification}) => {
    const [_, setActiveWorkspace] = useRecoilState(activeWorkspaceName);
    const db = usePouch('remoteWorkspaces');
    const toast = useToast();    

    async function handleFork(){
        try{
            const workspace = await handleCreate({db, specification, isTemplate: false});
            setActiveWorkspace(workspace);
            toast({
                title: 'Workspace POST.',
                description: `We've created a workspace: ${workspace}`,
                status: 'success',
                duration: 9000,
                isClosable: true,
            });
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

    return (
        <Button onClick={handleFork} leftIcon={<Icon as={VscRepoForked} />} colorScheme='teal' variant='outline'>
            Fork
        </Button>
    )
}

export default ForkButton;