
import FormPage from "./pages/formPage";
import FunctionLib from "./pages/FunctionLib";
import IntroPage from "./pages/IntroPage";
import SnippetPage from "./pages/SnippetPage";

import { useState } from "react";

function App() {
  const [selectedPage, setSelectedPage] = useState("home");

  return (
    <>
      {/* <Routes >
 
      <Route element={<Layout2 />}>
        <Route path="/" element={} />
        <Route path="/snippet" element={<SnippetPage />} />
        <Route path="/about" element={<IntroPage />} />
      </Route>
 selectedPage={selectedPage}
 
    </Routes> */}
      {selectedPage == "functionLib" && <FunctionLib setPage={setSelectedPage}  page={selectedPage}/>}
      {selectedPage == "home" && <FormPage setPage={setSelectedPage}  page={selectedPage}/>}
      {selectedPage == "snippet" && <SnippetPage setPage={setSelectedPage}  page={selectedPage}/>}
      {selectedPage == "about" && <IntroPage setPage={setSelectedPage}  page={selectedPage}/>}

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
