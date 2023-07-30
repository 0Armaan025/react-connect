import { Routes, Route } from "react-router-dom";
import React from "react";
import Home from "./screens/home/Home";
import CreateSpace from "./screens/create-space/CreateSpace";
import Blogs from "./screens/blog/Blogs";
import AddBlog from "./screens/addblog/AddBlog";
import Forums from "./screens/forums/Forums";
import NewQuestionsList from "./components/questionlist/NewQuestionList";
import CodeEditor from "./screens/Editor/Editor";

function App() {
  return (
    <>
    <Routes>
      <Route exact path="/" element={<Home/>} />
      <Route exact path="/create-space" element={<CreateSpace/>} />
      <Route exact path="/blogs" element={<Blogs/>} />
      <Route exact path="/add-blog" element={<AddBlog/>} />
      <Route exact path="/forums" element={<NewQuestionsList/>} />
      <Route exact path="/editor" element={<CodeEditor/>} />
   </Routes>
   </>  
  );
}

export default App;
