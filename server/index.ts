import fastify from "fastify";
import { FastifyCookieOptions } from "fastify-cookie";
import cookie from "fastify-cookie";
import fastifyJwt from "fastify-jwt";
import mercurius, { IResolvers } from "mercurius";
import mercuriusCodegen, { gql } from "mercurius-codegen";
import * as uuid from "uuid";
import { model, Schema, Model, Document, connect } from "mongoose";

const mongoDBconnection = "mongodb+srv://aarsenal:adapt3rCrazy2819@cbcluster1.lit21.mongodb.net/AdapterArsenalDev?retryWrites=true&w=majority";

interface IBlogPost extends Document {
  id: string;
  title: string;
  description: string;
  content: string;
  author: string;
  date: Date;
  status: Number;
}

const BlogPostSchema: Schema = new Schema({
  id: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: String, required: true },
  date: { type: Date, required: true },
  status: { type: Number, required: true },
});

const BlogPostModel: Model<IBlogPost> = model("BlogPost", BlogPostSchema);

const server = fastify();

server.register(require("fastify-cors"), {
  // put your options here

  origin: "*",
  methods: "GET",
  credentials: true,
});

const schema = gql`
  type BlogPost {
    id: String
    title: String
    description: String
    content: String
    date: String
    author: String
    status: Int
  }

  input BlogPostInput {
    title: String
    description: String
    content: String
    author: String
  }

  input BlogPostUpdateInput {
    id: String
    title: String
    description: String
    content: String
    author: String
    status: Int
  }

  input MessageInput {
    content: String
    author: String
  }

  type Message {
    id: ID!
    content: String
    author: String
  }

  type Mutation {
    createMessage(input: MessageInput): Message
    addBlogPost(input: BlogPostInput): BlogPost
    updateBlogPost(input: BlogPostUpdateInput): BlogPost
  }

  type Query {
    posts: [BlogPost!]!
    post(id: String!): BlogPost!
    hello(name: String!): String!
  }
`;
interface Message {
  id: string;
  content: string;
  author: string;
}

interface iBlogPost {
  id?: string;
  title: string;
  description: string;
  content: string;
  date: Date;
  author: string;
  status: Number;
}

const resolvers: IResolvers = {
  Query: {
    hello(root, { name }, ctx, info) {
      // root ~ {}
      // name ~ string
      // ctx.authorization ~ string | undefined
      // info ~ GraphQLResolveInfo
      return "hello " + name;
    },
    post: async (root, { id }, ctx, info) => {
      // root ~ {}
      // name ~ string
      // ctx.authorization ~ string | undefined
      // info ~ GraphQLResolveInfo
      console.log(id);
      let foundPost: iBlogPost = await getBlogPost(id);

      return foundPost;
    },
    posts: async (root, { }, ctx, info) => {
      // root ~ {}
      // name ~ string
      // ctx.authorization ~ string | undefined
      // info ~ GraphQLResolveInfo
      
      let foundPosts: iBlogPost[] = await getBlogPosts(0);

      return foundPosts;
    },
  },
  Mutation: {
    createMessage(root, { input }, ctx, info) {
      // root ~ {}
      // name ~ string
      // ctx.authorization ~ string | undefined
      // info ~ GraphQLResolveInfo
      //return 'a  message ' + input
      console.log(input);
      let newMessage: Message = { id: "123", content: "lj", author: "chris" };
      return newMessage;
    },
    addBlogPost: async (root, { input }) => {
      //console.dir(BlogPostInput);
      //console.dir(_);
      console.dir(input);
      //console.dir(info);
      const newPost = new BlogPostModel(input);
      console.dir(newPost);
      //let newBlogPost: iBlogPost = {id: '123', title: 'title', content: 'lj', description: 'chris'}
      let addedPost: iBlogPost = await upsertBlogPost(newPost);
      return addedPost;

      throw new Error("Invalid vote id");
    }, 
    updateBlogPost: async (root, { input }) => {
      //console.dir(BlogPostInput);
      //console.dir(_);
      //const newPost = new BlogPostModel(input);
      console.dir(input);
      let addedPost: iBlogPost = await upsertBlogPost(input);
      return addedPost;

      throw new Error("Invalid vote id");
    },
  },
};


const upsertBlogPost = async (newItem: iBlogPost): Promise<iBlogPost> => {
  let newBlogPost: iBlogPost = newItem;
  if (!newItem.id) {
    console.log("new post");
    const newUUID: string = uuid.v4().toString();

    newBlogPost.id = newUUID;
    newBlogPost.date = new Date();
  } else {
    console.log("just updating: " + newBlogPost.title);
    
    newBlogPost.date = new Date();
  }

  try {
    await connect(
      mongoDBconnection,
      {}
    );

    let query = {'id': newItem.id};
    //delete newItem.id;
    console.dir(newItem);
    const user: IBlogPost = await BlogPostModel.findOneAndUpdate(query, newBlogPost, {upsert: true});

    return newBlogPost;
  } catch (error) {
    console.log("error");
    console.log(error);
  }

  return newItem;
};


const getBlogPost = async (id: string): Promise<iBlogPost> => {
  console.log('looking: ')

  await connect(
    mongoDBconnection,
    {}
  );

  const newBlogPost: any = await BlogPostModel.findOne({ id: id }).exec();
  
  console.log('found: ')
  console.dir(newBlogPost)
  
  return newBlogPost;
};

const getBlogPosts = async (page: number): Promise<iBlogPost[]> => {
  console.log('looking: ')

  await connect(
    mongoDBconnection,
    {}
  );

  const newBlogPosts: any[] = await BlogPostModel.find({status: 0}).sort({date: 'descending'}).exec();


  
  console.log('found: ')
  console.dir(newBlogPosts)
  
  return newBlogPosts;
};

server.register(mercurius, {
  schema,
  resolvers,
  graphiql: true,
});

server.get("/hellogql", async function (req, reply) {
  const query = '{ hello(name: "chris") }';
  return reply.graphql(query);
});

server.post("/hello2", async function (request, reply) {
  console.log(request.body);
  return reply.graphql(String(request.body));
  //console.dir(request)
});


server.get("/pong", async (request, reply) => {
  reply.send({ ping: "pinnnnngggg" });

  //return "pong!!! hello.\n";
});

server.get("/ping", async (request, reply) => {
  reply.send({ hello: "world" });

  //return "pong!!! hello.\n";
});

interface IQuerystring {
  username: string;
}

server.get<{
  Querystring: IQuerystring;
}>("/api/adapters", async (request, reply) => {
  const { username } = request.query;
  // do something with request data

  return "logged in! " + username;
});

server.listen(8080, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
function uuidv4() {
  throw new Error("Function not implemented.");
}
