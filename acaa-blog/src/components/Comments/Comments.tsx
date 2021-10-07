import { ApolloClient, InMemoryCache } from "@apollo/client";
import { Card } from "@blueprintjs/core";
import gql from "graphql-tag";
import { useEffect, useState } from "react";
import styles from "./Comments.module.css";
import { PostComment } from "../../store/types";

const Comments = ({ postId }: { postId: string }) => {
  const [data, updateData] = useState();

  useEffect(() => {
    const getData = async () => {
      const aclient = new ApolloClient({
        uri: "http://localhost:8080/graphql",
        cache: new InMemoryCache(),
      });

      const resp = await aclient.query({
        query: gql`
          query postComments($postId: String!) {
            comments(postId: $postId) {
              comment
              author
              id
            }
          }
        `,
        variables: { postId: postId },
      });
      
      updateData(resp.data.comments);
    };
    getData();
  }, []);

  function CommentsList(props: any) {
    if (props.comments) {
     
      const comments = props.comments;
      const listItems = comments.map((comment: PostComment) => (
       
        <Card key={comment.id}>
          <h5>{comment.author}</h5>
          <p>{comment.comment}</p>
        </Card>
      ));
      return <div>{listItems}</div>;
    } else {
      return <p>Loading</p>;
    }
  }

  return (
    <div className={styles.Comments}>
      <h3>Comments</h3>
      <CommentsList comments={data} />
    </div>
  );
};

export default Comments;
