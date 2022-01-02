import React, { useState } from "react";
import {
  List,
  ListItem,
  Box, VStack, Input, HStack
} from "@chakra-ui/react";
import WorkspaceCard from './WorkspaceCard';
import { useAllDocs } from 'use-pouchdb';
import FilterSelect from "./FilterSelect";

const WorkspaceList = () => {
    const [filterOption, setFilterOption] = useState("ALL");
    const [filterByText, setFilterByText] = useState("");
    const { rows: workspaces } = useAllDocs({
        db: "remoteWorkspaces",
        include_docs: true, 
        descending: true
      });

    let myWorkspaces = workspaces.filter(w =>w.doc.type === 'workspace' || w.doc.type === 'template').map(w => (
            {
                id: w.id, 
                description: w.doc.description, 
                containers: w.doc.containers, 
                isTemplate: w.doc.type === 'template',
                specification: w.doc.specification,
                icon: w.doc.icon
            }
        )
    )
    
    console.log('my workspaces', myWorkspaces);

    function filter(lista){
        console.log('entro a filter', filterOption);
        let ret = [];
        if(filterOption === 'ALL'){
            ret = lista;
        }else if(filterOption === 'TEMPLATE'){
            ret = lista.filter(x => x.isTemplate);
        }else{
            ret = lista.filter(x => x.containers.length !== 0)
        }

        if(filterByText === ''){
            return ret;
        }
        return ret.filter(x => x.description.includes(filterByText));
    }

    return (
        <Box>
            <VStack>
                <HStack>
                    <FilterSelect onChange={(ev) => setFilterOption(ev.target.value)} value={filterOption}/>
                    <Input value={filterByText} onChange={(ev)=>setFilterByText(ev.target.value)}></Input>
                </HStack>
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