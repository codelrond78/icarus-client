import React from "react";
import {
  Box, VStack
} from "@chakra-ui/react";
import WorkspaceCard from './WorkspaceCard';
import { useAllDocs } from 'use-pouchdb';

const WorkspaceList = () => {
    const { rows: workspaces } = useAllDocs({
        db: "localWorkspaces",
        include_docs: true, 
        descending: true
      })
    //console.log(workspaces);
    let myWorkspaces = workspaces.filter(w =>w.doc.type === 'workspace').map(w => (
            {id: w.id, description: w.doc.description, containers: w.doc.containers}
        )
    )
    console.log(myWorkspaces);
    return (
        <Box>
            <VStack>
                {myWorkspaces.map(w => <WorkspaceCard key={w.id} workspace={w} />)}
            </VStack>
        </Box>
    )
}

export default WorkspaceList;