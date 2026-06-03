
import FormPage from "./pages/formPage";
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
 
    </Routes> */}
      {selectedPage == "home" && <FormPage setPage={setSelectedPage} />}
      {selectedPage == "snippet" && <SnippetPage setPage={setSelectedPage}/>}
      {selectedPage == "about" && <IntroPage setPage={setSelectedPage}/>}

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
