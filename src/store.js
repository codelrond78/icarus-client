import {    
    atom
  } from 'recoil';

  /*
const yamlText = `
version: "3.9"  # optional since v1.27.0
services:
  db:
    image: mongo
    ports: ["27017"]

`

export const currentWorkspaceYaml = atom({
    key: 'currentWorkspaceYaml', 
    default: yamlText, 
});
*/

export const passwordAtom = atom({
  key: 'password', 
  default: "", 
});

export const activeWorkspaceName = atom({
  key: 'activeWorkspaceName', 
  default: "", 
});
