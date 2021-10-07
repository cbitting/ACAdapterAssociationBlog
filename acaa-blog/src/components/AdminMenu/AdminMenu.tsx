import { Menu, MenuItem, Button } from '@blueprintjs/core';
import { Popover2 } from '@blueprintjs/popover2';
import {useHistory} from 'react-router-dom';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import gql from 'graphql-tag';

const AdminMenu = () => {

  const history = useHistory();


  const addNewBlogPost = () => {
      
      const aclient = new ApolloClient({
        uri: "http://localhost:8080/graphql",
        cache: new InMemoryCache(),
      });
  
      aclient
        .mutate({
          mutation: gql`
          mutation addNewPost {
            addBlogPost(
              input: {title: "New Post", description: "Needs a short description", content: "Add the main content", author: "Your Name", status: 1}
            ) {
              title
              id
            }
          }          
          `
        })
        .then((result) => {
         
          history.push('/blog/' + result.data.addBlogPost.id)
     
        });
  }

  const exampleMenu = (
    <Menu>
        <MenuItem icon="add" onClick={addNewBlogPost} text="New Blog Post" />
       
    </Menu>
);
return (
   
        <Popover2 content={exampleMenu} placement="right-end">
            <Button icon="edit" text="Blog Admin..." />
        </Popover2>

);
}

export default AdminMenu;
