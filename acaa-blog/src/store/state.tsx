import { atom } from "recoil";
import { BlogPost, PostComment } from "./types";



export const blogPostState = atom({
  key: "blogpost",
  default: {} as BlogPost,
});

export const postCommentState = atom({
  key: "postcomment",
  default: {} as PostComment,
});