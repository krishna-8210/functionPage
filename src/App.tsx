import { Route, Routes } from "react-router-dom";
import FormPage from "./pages/formPage";
import IntroPage from "./pages/IntroPage";
import SnippetPage from "./pages/SnippetPage";
import Layout2 from "./Layout2";



function App() {




  return (
    <>
    <Routes >
 
      <Route element={<Layout2 />}>
        <Route path="/" element={<FormPage />} />
        <Route path="/snippet" element={<SnippetPage />} />
        <Route path="/about" element={<IntroPage />} />
      </Route>
 
    </Routes>
  
      {/* <RouteCmp /> */}
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
