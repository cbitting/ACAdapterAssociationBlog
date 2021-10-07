import { FormGroup, TextArea, InputGroup, Button } from "@blueprintjs/core";
import { useState } from "react";
import styles from "./CommentAdd.module.css";
import { postCommentState } from "../../store/state";
import { useRecoilState } from "recoil";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import gql from "graphql-tag";

const CommentAdd = ({ postId }: { postId: string }) => {
  const [postAdded, setPostAdded] = useState(false);
  const [postcomment, setPostComment] = useRecoilState(postCommentState);

  const addBlogPost = () => {
    const aclient = new ApolloClient({
      uri: "http://localhost:8080/graphql",
      cache: new InMemoryCache(),
    });

    aclient
      .mutate({
        mutation: gql`
          mutation addNewComment(
            $postId: String!
            $comment: String!
            $author: String!
          ) {
            addComment(
              input: {
                postId: $postId
                comment: $comment
                author: $author
                status: 0
              }
            ) {
              comment
              author
              date
              postId
              id
            }
          }
        `,
        variables: {
          postId: postId,
          comment: postcomment.comment,
          author: postcomment.author,
        },
      })
      .then((result) => {
        setPostAdded(true);
      });
  };

  if (postAdded)
    return (
      <div>
        <h3>Comment Added!</h3>
      </div>
    );
  if (!postAdded)
    return (
      <div className={styles.CommentAdd}>
        <h3>Add a Comment:</h3>
        <FormGroup
          helperText="Comment..."
          label="Comment"
          labelFor="Comment-input"
          labelInfo="(required)"
        >
          <TextArea
            id="Comment-input"
            growVertically={true}
            large={true}
            className="bp3-fill"
            placeholder="Comment"
            value={postcomment.comment || ""}
            onChange={(e) => {
              setPostComment({ ...postcomment, comment: e.target.value });
            }}
          />
        </FormGroup>
        <FormGroup
          helperText="Author..."
          label="Author"
          labelFor="CommentAuthor-input"
          labelInfo="(required)"
        >
          <InputGroup
            id="CommentAuthor-input"
            type="text"
            placeholder="Author"
            value={postcomment.author || ""}
            onChange={(e) => {
              setPostComment({ ...postcomment, author: e.target.value });
            }}
          />
        </FormGroup>
        <Button
          intent="success"
          text="Add Comment"
          className="btn btn-primary"
          onClick={(_) => {
            addBlogPost();
          }}
        />
      </div>
    );

  return (
    <div>
      <h3>Loading...</h3>
    </div>
  );
};

export default CommentAdd;
