import { Route, Routes } from "react-router-dom";

import IndexPage from "@/pages/index";
import DocsPage from "@/pages/docs";
import PricingPage from "@/pages/pricing";
import BlogPage from "@/pages/blog";
import AboutPage from "@/pages/about";
import { LoginSignupForm } from "./components/forms/LoginSignupForm";
import { useDispatch, useSelector } from "react-redux";
import RouteCmp from "./route/RouteCmp";
import { useEffect } from "react";
import { tokenLib } from "./libs/localStorageDb";
import { makelogin } from "./redux/AuthSlice";

function App() {
  const isLogin=useSelector((state:any)=>state.authslice.isLogin);
  const dispatch=useDispatch();

  useEffect(()=>{
 const token=tokenLib.getToken();
 
 if(token){
  dispatch(makelogin(true));
 }


  },[])
  return (
    <>
    {isLogin ? (
      <RouteCmp />
    ) : (
      <Routes>
        <Route element={<LoginSignupForm type={'login'} />} path="/" />
        <Route element={<LoginSignupForm type={'signup'} />} path="/signup" />
      </Routes>
    )}
    </>
  
    // <Routes>
    //   <Route element={<LoginSignupForm type={'login'} />} path="/" />
    //   <Route element={<LoginSignupForm type={'signup'} />} path="/signup" />
    //   <Route element={<PricingPage />} path="/pricing" />
    //   <Route element={<BlogPage />} path="/blog" />
    //   <Route element={<AboutPage />} path="/about" />
    // </Routes>
    
  );
}

export default App;
