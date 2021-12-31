import React, { useState } from "react";
import {
  List,
  ListItem,
  Box, VStack, Checkbox, Input
} from "@chakra-ui/react";
import WorkspaceCard from './WorkspaceCard';
import { useAllDocs } from 'use-pouchdb';

const WorkspaceList = () => {
    const [filterTemplates, setFilterTemplates] = useState(false);
    const [filterByText, setFilterByText] = useState("");
    const { rows: workspaces } = useAllDocs({
        db: "remoteWorkspaces",
        include_docs: true, 
        descending: true
      })

    let myWorkspaces = workspaces.filter(w =>w.doc.type === 'workspace').map(w => (
            {
                id: w.id, 
                description: w.doc.description, 
                containers: w.doc.containers, 
                isTemplate: w.doc.isTemplate,
                specification: w.doc.specification
            }
        )
    )
    
    function filter(lista){
        let ret = [];
        if(filterTemplates){
            ret = lista.filter(x=>x.isTemplate);
        }else{
            ret = lista;
        }
        if(filterByText === ''){
            return ret;
        }
        return ret.filter(x => x.description.includes(filterByText));
    }

    return (
        <Box>
            <VStack>
                <Checkbox isChecked={filterTemplates} onChange={()=>setFilterTemplates(!filterTemplates)} >View only templates</Checkbox>
                <Input value={filterByText} onChange={(ev)=>setFilterByText(ev.target.value)}></Input>
                <List spacing={3}>
                    {filter(myWorkspaces).map(w => 
                        <ListItem key={w.id}>
                            <WorkspaceCard workspace={w} />
                        </ListItem>
                    )}
                </List>
            </VStack>
        </Box>
    )
}

export default WorkspaceList;