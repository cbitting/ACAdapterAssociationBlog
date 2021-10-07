import { Button, Collapse, Divider, FormGroup, InputGroup, TextArea } from "@blueprintjs/core";
import { useRecoilState } from "recoil";
import React, { useEffect, useState } from "react";
import { BlogPost } from "../../store/types";
import { blogPostState } from "../../store/state";
import {
  ApolloClient,
  InMemoryCache,
  gql,
} from "@apollo/client";
import { useParams } from "react-router-dom";

const CommentAdd = React.lazy(
  () => import("../CommentAdd/CommentAdd.lazy")
);

const Comments = React.lazy(
  () => import("../Comments/Comments.lazy")
);

type Slug = {
  slug: string;
};

const BlogPostSingle = () => {
 
  const { slug } = useParams<Slug>();

  
  const [editorOpen, setEditorOpen] = useState(false);
  const [blogpost, setBlogPost] = useRecoilState(blogPostState);

  useEffect(() => {
    let blogPost: BlogPost;

    const aclient = new ApolloClient({
      uri: "http://localhost:8080/graphql",
      cache: new InMemoryCache(),
    });

    aclient
      .query({
        query: gql`
          query BlogPost($slug: String!) {
            post(id: $slug) {
              id
              title
              content
              description
              author
              date
            }
          }
        `,
        variables: { slug: slug },
      })
      .then((result) => {
      
        blogPost = result.data.post;
        setBlogPost(result.data.post);
      });
  }, []);

  let newBlogPost = false;
  if (!blogpost.id) {
    newBlogPost = true;
  }
  //check if blank:
  if (newBlogPost) {
    
    setBlogPost({
      id: "loading",
      title: "loading",
      description: "loading",
      content: "loading",
      date: "loading",
      author: "loading"
    });
  }

  const updateBlogPost = (statCode: Number) => {
  
    const aclient = new ApolloClient({
      uri: "http://localhost:8080/graphql",
      cache: new InMemoryCache(),
    });

    aclient
        .mutate({
          mutation: gql`
          mutation updatePost($id: String!, $title: String!, $description: String!, $status: Int, $content: String!, $author: String!) {
            updateBlogPost(
              input: {id: $id, title: $title, description: $description, content: $content, author: $author, status: $status}
            ) {
              title
              id
            }
          }          
          `,
          variables: { title: blogpost.title, description: blogpost.description, id: slug, status: statCode, author: blogpost.author, content: blogpost.content},
        })
        .then((result) => {
        ;
          alert('Updated Blog Post!');
         
        });
    
  }

  const expandEdit = () => {
   
    if (editorOpen) {
      setEditorOpen(false);
    } else {
      setEditorOpen(true);
    }
  };

  return (
    <div>
     
     <article>
              <h2>{blogpost.title}</h2>
              <h5>{ new Date(+blogpost.date).toString()}</h5>
              <p>{blogpost.content}</p>
              <Divider></Divider>
<Comments postId={slug}></Comments>
              <CommentAdd postId={slug}></CommentAdd>
            </article>

     
      <Button onClick={expandEdit}>
        {editorOpen ? "Hide" : "Show"} Editor
      </Button>
      <Collapse isOpen={editorOpen}>
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
            value={blogpost.title || ""}
            onChange={(e) => {
             
              setBlogPost({ ...blogpost, title: e.target.value });
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
            placeholder="Description"
            value={blogpost.description || ""}
            onChange={(e) => {
           
              setBlogPost({ ...blogpost, description: e.target.value });
            
            }}
          />
        </FormGroup>
        <FormGroup
          helperText="Post Content..."
          label="Post Content"
          labelFor="Content-input"
          labelInfo="(required)"
        >
          <TextArea
            id="Content-input"
            growVertically={true}
            large={true}
            className="bp3-fill"
            placeholder="Content"
            value={blogpost.content || ""}
            onChange={(e) => {
           
              setBlogPost({ ...blogpost, content: e.target.value });
            
            }}
          />
        </FormGroup>
        <FormGroup
          helperText="Post Author..."
          label="Post Author"
          labelFor="Author-input"
          labelInfo="(required)"
        >
          <InputGroup
            id="Author-input"
            type="text"
            placeholder="Author"
            value={blogpost.author || ""}
            onChange={(e) => {
           
              setBlogPost({ ...blogpost, author: e.target.value });
            
            }}
          />
        </FormGroup>
        <Button
          intent="success"
          text="Update / Add Post"
          className="btn btn-primary"
          onClick={(_) => {
            
            updateBlogPost(0);
          }}
        />

<Button
          intent="danger"
          text="Delete Post"
          className="btn btn-primary"
          onClick={(_) => {
            
            updateBlogPost(2);
          }}
        />
      </Collapse>
    </div>
  );
};

export default BlogPostSingle;
