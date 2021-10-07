import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { useEffect, useState } from "react";
import styles from "./BlogPosts.module.css";
import { BlogPost } from "../../store/types";
import { Card } from "@blueprintjs/core";

const BlogPosts = () => {
  const [data, updateData] = useState();

  useEffect(() => {
    const getData = async () => {
      const aclient = new ApolloClient({
        uri: "http://localhost:8080/graphql",
        cache: new InMemoryCache(),
      });

      const resp = await aclient.query({
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
        `,
      });

      updateData(resp.data.posts);
    };
    getData();
  }, []);

  function PostDate(props: any) {
    const pdate = new Date(+props.pdate).toString();
    return <div>{pdate}</div>;
  }

  function BlogPostList(props: any) {
    if (props.posts) {
      const posts = props.posts;
      const listItems = posts.map((post: BlogPost) => (
        <Card key={post.id}>
          <h2>
            <a href={"/blog/" + post.id}>{post.title}</a>
          </h2>
          <h4>
            <PostDate pdate={post.date}></PostDate>
          </h4>
          <p>{post.description}</p>
        </Card>
      ));
      return <div>{listItems}</div>;
    } else {
      return <p>Loading</p>;
    }
  }

  return (
    <div className={styles.BlogPosts}>
      <BlogPostList posts={data} />
    </div>
  );
};

export default BlogPosts;
