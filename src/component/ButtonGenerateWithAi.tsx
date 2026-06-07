import { Button, Modal } from '@heroui/react';
import React, { useState } from 'react'


export const ModalComp = ({
  children,
  
}: {
  children: any;
}) => {
  return (
    <Modal>
      <Button
        // onPress={button_function}
        size="sm"
        className={" font-bold bg-gradient-to-r from-sky-500 via-blue-600 to-violet-600 bg-clip-text text-transparent"}
        variant="outline"
        
      >
         Generate Function with AI
      </Button>
      <Modal.Backdrop>
        <Modal.Container placement="top" size="lg">
          <Modal.Dialog className="">
            <Modal.CloseTrigger />
            <Modal.Header>
              {/* <Modal.Heading>Welcome to </Modal.Heading> */}
            </Modal.Header>
            <Modal.Body>{children}</Modal.Body>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
};

function ButtonGenerateWithAi() {

    const [showSteps, setShowSteps] = useState(false);
  return (
    <>
    <ModalComp>
        <>
      <section className="max-w-5xl mx-auto py-16 px-6">
  <h2 className="text-2xl font-bold mb-4">
    Generate Functions with AI
  </h2>

  <p className="text-lg text-gray-600 mb-8">
    Describe your idea in plain language and let AI generate a
    reusable function. You can then save it to your library,
    modify it, or share it with others.
  </p>

  <div className="flex flex-wrap gap-4">
    <Button
      variant="primary"
      onPress={() =>
        window.open(
          "https://chatgpt.com/g/g-6a217ca317d081918625c48861b5ede0-function-page",
          "_blank"
        )
      }
    >
      Generate Function with AI
    </Button>

    <Button
variant='ghost'
      onPress={() => setShowSteps(!showSteps)}
    >
      {showSteps ? "Hide Instructions" : "How Does It Work?"}
    </Button>
  </div>

  {showSteps && (
    <>
    
   
    <div className="mt-8 border rounded-xl p-6 bg-gray-50">
      <ol className="space-y-4 list-decimal list-inside text-gray-700">
        <li>
          Open the Function Page GPT.
        </li>

        <li>
          Describe the function you want in plain language.
        </li>

        <li>
          Copy the generated function code.
        </li>

        <li>
          Return to Function Page and click
          <strong> Create Function</strong>.
        </li>

        <li>
          Paste the generated code into the Code section.
        </li>

        <li>
          Add the function name, description, category, and tags.
        </li>

        <li>
          Save the function to your library.
        </li>

        <li>
          Execute the function whenever you need it.
        </li>
      </ol>

      <div className="mt-6 p-4 rounded-lg bg-blue-50 border">
        <p className="font-medium mb-2">
          Example
        </p>

        <p className="text-sm text-gray-700">
          Ask the GPT:
          <strong>
            {" "}
            "Create an EMI calculator"
          </strong>
          , copy the generated code, create a new function,
          paste the code, save it, and start using it immediately.
        </p>
      </div>
    </div>

    <section className="max-w-5xl mx-auto py-16 px-6">


  <div className="space-y-8">

    <div className="flex gap-4">
      <div className="h-10 w-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold shrink-0">
        1
      </div>

      <div>
        <h3 className="font-semibold text-xl mb-2">
          Open the Function Page GPT
        </h3>

        <p className="text-gray-600">
          Click the Generate Function button and describe the
          function you want in plain language.
        </p>

        <div className="mt-3 p-4 rounded-lg bg-gray-50 text-sm">
          Examples:
          <ul className="mt-2 space-y-1">
            <li>• Create a GST calculator</li>
            <li>• Generate a password generator</li>
            <li>• Create a transformer sizing calculator</li>
            <li>• Build a student GPA calculator</li>
          </ul>
        </div>
      </div>
    </div>

    <div className="flex gap-4">
      <div className="h-10 w-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold shrink-0">
        2
      </div>

      <div>
        <h3 className="font-semibold text-xl mb-2">
          Generate the Function
        </h3>

        <p className="text-gray-600">
          The AI will generate the function name, description,
          input schema, output schema, examples, and JavaScript
          implementation.
        </p>
      </div>
    </div>

    <div className="flex gap-4">
      <div className="h-10 w-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold shrink-0">
        3
      </div>

      <div>
        <h3 className="font-semibold text-xl mb-2">
          Copy the Generated Code
        </h3>

        <p className="text-gray-600 mb-3">
          Once the function is generated, copy the JavaScript
          code.
        </p>

        <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-auto text-sm">
{`(input) => {
  return {
    result: input.value * 2
  };
}`}
        </pre>
      </div>
    </div>

    <div className="flex gap-4">
      <div className="h-10 w-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold shrink-0">
        4
      </div>

      <div>
        <h3 className="font-semibold text-xl mb-2">
          Create a New Function
        </h3>

        <p className="text-gray-600">
          Return to Function Page and click
          <strong> Create Function</strong>.
        </p>
      </div>
    </div>

    <div className="flex gap-4">
      <div className="h-10 w-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold shrink-0">
        5
      </div>

      <div>
        <h3 className="font-semibold text-xl mb-2">
          Paste the Code
        </h3>

        <p className="text-gray-600">
          Paste the generated code into the Code section of the
          function editor.
        </p>
      </div>
    </div>

    <div className="flex gap-4">
      <div className="h-10 w-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold shrink-0">
        6
      </div>

      <div>
        <h3 className="font-semibold text-xl mb-2">
          Add Function Details
        </h3>

        <p className="text-gray-600">
          Enter the function name, description, category, tags,
          and any other required details.
        </p>
      </div>
    </div>

    <div className="flex gap-4">
      <div className="h-10 w-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold shrink-0">
        7
      </div>

      <div>
        <h3 className="font-semibold text-xl mb-2">
          Save the Function
        </h3>

        <p className="text-gray-600">
          Click Save Function to add it to your personal library
          or publish it for the community.
        </p>
      </div>
    </div>

    <div className="flex gap-4">
      <div className="h-10 w-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold shrink-0">
        8
      </div>

      <div>
        <h3 className="font-semibold text-xl mb-2">
          Execute and Use
        </h3>

        <p className="text-gray-600">
          Provide the required inputs and run the function
          whenever you need it.
        </p>
      </div>
    </div>

  </div>

  <div className="mt-12 p-6 rounded-xl border bg-blue-50">
    <h3 className="font-semibold text-xl mb-3">
      Example Workflow
    </h3>

    <p className="text-gray-700">
      Ask the GPT to create an EMI Calculator → Copy the
      generated code → Create a new function → Paste the code →
      Name it "EMI Calculator" → Save → Run it anytime.
    </p>
  </div>
</section>
    </>
  )}
</section>
        </>
    </ModalComp>
    
    
    </>
  )
}

export default ButtonGenerateWithAi