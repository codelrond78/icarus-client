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
    return (
        <Box>
            <VStack>
                {workspaces.map(w => <WorkspaceCard description={w.description} containers={w.containers} />)}
            </VStack>
        </Box>
    )
}

export default WorkspaceList;