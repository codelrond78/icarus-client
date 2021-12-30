import React, { useState } from "react";
import {
  List,
  ListItem,
  Box, VStack, Checkbox
} from "@chakra-ui/react";
import WorkspaceCard from './WorkspaceCard';
import { useAllDocs } from 'use-pouchdb';

const WorkspaceList = () => {
    const [filterTemplates, setFilterTemplates] = useState(false);
    const { rows: workspaces } = useAllDocs({
        db: "localWorkspaces",
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
        if(filterTemplates){
            lista.filter(x=>x.isTemplate)
        }else{
            return lista
        }
    }

    return (
        <Box>
            <VStack>
                <Checkbox isChecked={filterTemplates} onChange={()=>setFilterTemplates(!filterTemplates)} >View only templates</Checkbox>
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