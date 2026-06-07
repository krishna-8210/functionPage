import FormPage, { DetailsComp } from "./pages/formPage";
import FunctionLib from "./pages/FunctionLib";
import IntroPage from "./pages/IntroPage";
import SnippetPage from "./pages/SnippetPage";

import { useEffect, useState } from "react";
import { useOverlayState } from "@heroui/react";

import { Button, Modal } from "@heroui/react";
import CompilePage from "./pages/CompilePage";

export function ModalOption() {
 const [open,setOpen]=useState<boolean>(false)
  return (
    <Modal>
      {/* <Button variant="secondary">Open Modal</Button> */}
      <Modal.Backdrop isOpen={open}>
        <Modal.Container>
          <Modal.Dialog className="sm:max-w-[360px]">
            <Modal.CloseTrigger />
            <Modal.Header>
              <Modal.Icon className="bg-default text-foreground"></Modal.Icon>
              <Modal.Heading>Welcome to HeroUI</Modal.Heading>
            </Modal.Header>
            <Modal.Body>
              <p>
                A beautiful, fast, and modern React UI library for building
                accessible and customizable web applications with ease.
              </p>
            </Modal.Body>
            <Modal.Footer>
              <Button
                onPress={() => {
               setOpen(false)
                }}
                className="w-full"
                slot="close"
              >
                Continue
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}

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
      {selectedPage == "functionLib" && (
        <FunctionLib setPage={setSelectedPage} page={selectedPage} />
      )}
      {selectedPage == "home" && (
        <FormPage setPage={setSelectedPage} page={selectedPage} />
      )}
      {selectedPage == "snippet" && (
        <SnippetPage setPage={setSelectedPage} page={selectedPage} />
      )}
      {selectedPage == "about" && (
        <IntroPage setPage={setSelectedPage} page={selectedPage} />
      )}
      {selectedPage == "compiler" && (
        <CompilePage setPage={setSelectedPage} page={selectedPage} />
      )}
      <ModalOption />
    
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
