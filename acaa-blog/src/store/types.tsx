export interface BlogPost {
    id?: string;
    title: string;
    description: string;
    content: string;
    date: string;
    author: string;
  }

  export interface PostComment {
    id: string;
    author: string;
    comment: string;   
  }