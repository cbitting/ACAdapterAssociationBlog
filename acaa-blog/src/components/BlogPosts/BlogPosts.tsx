import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import styles from './BlogPosts.module.css';
import { BlogPost } from "../../store/types";
import { Button, Card, Elevation } from "@blueprintjs/core";


const BlogPosts = () => {

  const [data, updateData] = useState();

  useEffect(() => {
    const getData = async () => {

      const aclient = new ApolloClient({
        uri: 'http://localhost:8080/graphql',
        cache: new InMemoryCache()
      });

      const resp = await aclient
  .query({
    query: gql`
    query {
      posts {
        id
        title
        description
        date
        content
        author
      }
    }
    `
  });
      //const json = await resp.json()
      console.dir(resp.data);
      updateData(resp.data.posts);
    }
    getData();
  }, []);

  function BlogPostList(props: any) {
    if (props.posts) {
      console.dir(props.posts)
    const posts = props.posts;
    const listItems = posts.map((post: BlogPost) =>
      // Correct! Key should be specified inside the array.
      // <ListItem key={number.toString()} value={number} />
      <Card>
    <h2><a href={"/blog/" + post.id}>{post.title}</a></h2>
    <h4>{post.date}</h4>
    <p>{post.description}</p>
    
</Card>
    );
    return (
      <ul>
        {listItems}
      </ul>
    );
    } else {
      return (
        <p>Loading</p>
      );
    }
  }
  


  return (
  <div className={styles.BlogPosts}>
   
    <BlogPostList posts={data} />,
  </div>)
}

export default BlogPosts;
