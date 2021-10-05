import { Button, FormGroup, InputGroup } from "@blueprintjs/core";
import styles from "./BlogPost.module.css";
import { atom, useRecoilState, useRecoilValue } from "recoil";
import { v4 } from "uuid";
import React, { useState } from "react";
import { BlogPost } from "../../store/types";
import { blogPostState } from "../../store/state";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql
} from "@apollo/client";


const BlogPostSingle = () => {
  let postTitle = "";
  const [title, setTitle] = useState("");
  const [blogpost, setBlogPost] = useRecoilState(blogPostState);

  const aclient = new ApolloClient({
    uri: 'http://localhost:8080/graphql',
    cache: new InMemoryCache()
  });

  aclient
  .query({
    query: gql`
      query { 
        post(id: "chris") 
      {
        id
      title
      
      }
      }
    `
  })
  .then(result => console.log(result));

  let newBlogPost = false;
if (!blogpost.id) {
  newBlogPost = true;
}
  //check if blank:
  if (newBlogPost) {
    console.log('blank:')
    setBlogPost({ id: '123', title: 'new title', description: 'new descrip', content: 'new content' });
  }
  const updatePost = (target: string) => {
    console.log()
  }

  return (
    
    <div>
      <p>{blogpost.title}</p>
      <p>{blogpost.description}</p>
    <FormGroup
      helperText="Post Title..."
      label="Post Title"
      labelFor="Title-input"
      labelInfo="(required)"
    >
      <InputGroup
        id="Title-input"
        type="text"
        placeholder="Post Title"
        value={blogpost.title || ''}
        onChange={(e) => {
          //setTitle(e.target.value)
          setBlogPost({...blogpost, title: e.target.value});
          //setBlogPost(Object.assign({}, blogpost, {title: e.target.value}));
        }}
      />
    </FormGroup>
    <FormGroup
      helperText="Post Description..."
      label="Post Description"
      labelFor="Description-input"
      labelInfo="(required)"
    >
      <InputGroup
        id="Description-input"
        type="text"
        placeholder="Description Title"
        value={blogpost.description || ''}
        onChange={(e) => {
          //setTitle(e.target.value)
          setBlogPost({...blogpost, description: e.target.value});
          //setBlogPost(Object.assign({}, blogpost, {title: e.target.value}));
        }}
      />
    </FormGroup>
    <Button intent="success" text="Add Adapter"  className="btn btn-primary"
          onClick={(_) => {
            //setBlogPost({ id: '123', title: 'lakjsdf', description: 'lf', content: '' });
           console.log(title);
           console.dir(blogpost);
          }}/>
    </div>
  );
};

export default BlogPostSingle;
