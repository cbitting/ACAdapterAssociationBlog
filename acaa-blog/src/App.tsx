import logo from "./logo.svg";
import React, { Suspense, lazy, useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { Divider } from "@blueprintjs/core";

const TopNavLazy = React.lazy(
  () => import("./components/TopNavMenu/TopNavMenu.lazy")
);

const AllBlogPosts = React.lazy(
  () => import("./components/BlogPosts/BlogPosts.lazy")
);

const SingleBlogPost = React.lazy(
  () => import("./components/BlogPost/BlogPost")
);

const AdminMenu = React.lazy(
  () => import("./components/AdminMenu/AdminMenu.lazy")
);

function App() {
  return (
    <BrowserRouter>
    <RecoilRoot>
    <div className="App">
      <Suspense fallback={<div>Loading...</div>}>
        <header>
          <TopNavLazy></TopNavLazy>
          <AdminMenu></AdminMenu>
        </header>
        <div id="container">
       
          <main>
            
            

            
      
      <Route component={AllBlogPosts} path="/" exact />
      <Route component={SingleBlogPost} path="/blog/:slug" />
      <Route component={SingleBlogPost} path="/sample" />
  
  <p id="cbfooter">© Chris Bitting - 2021 - Message me at chris.bitting@gmail.com</p>

          </main>
        </div>
      </Suspense>
    </div>
    </RecoilRoot>
    </BrowserRouter>
  );
}

export default App;
