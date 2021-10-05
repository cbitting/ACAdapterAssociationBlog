import { atom, selector, useRecoilState, useRecoilValue } from "recoil";
import { BlogPost } from "./types";
import axios from "axios";


export const blogPostState = atom({
  key: "blogpost",
  default: {} as BlogPost,
});