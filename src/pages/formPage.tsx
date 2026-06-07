import { useEffect, useState } from "react";
import {
  Button,
  Input,
  Card,
  TextArea,
  Accordion,
  //   Switch,
  //   Label,
  //   Description,
  //   Drawer,
  Modal,
  Chip,
  Label,
} from "@heroui/react";
import { parseFn, splitFunction } from "@/libs";
import { Editor } from "@monaco-editor/react";
import confetti from "canvas-confetti";

import { FaCheck, FaCheckCircle, FaCopy } from "react-icons/fa";
import { motion } from "framer-motion";
import Layout from "@/Layout";
import SideNav from "@/component/SideNav";
import { localStorageLib_for_function } from "@/localStoragelib";

import ButtonGenerateWithAi from "@/component/ButtonGenerateWithAi";
const handleClick = () => {
  confetti({
    particleCount: 400,
    spread: 200,
    //   time:3000,
    origin: { y: 0.6 },
  });
};
const CopyText = ({ item }: { item: any }) => {
  const [copied, setCopied] = useState<any | null>(null);

  const copySnippetCode = async (snippet: any) => {
    try {
      const data = renderValue(item);
      await navigator.clipboard.writeText(data);
      setCopied(snippet);
      setTimeout(() => {
        setCopied(null);
      }, 2000);
    } catch {
      alert("Could not copy this snippet.");
    }
  };

  return (
    <Button
      size="sm"
      variant="outline"
      aria-label="Copy snippet code"
      className="h-8 w-8 min-w-8 rounded-full transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-400 hover:bg-slate-100"
      onPress={() => copySnippetCode(item)}
    >
      {copied ? <FaCheck className="text-green-600" /> : <FaCopy />}
    </Button>
  );
};
export const DetailsComp = () => {
  return (
    <>
      <hr />
      <section className="max-w-5xl mx-auto py-16 px-6">
        <h1 className="text-5xl font-bold mb-6">What is Function Page?</h1>

        <p className="text-lg text-gray-600 mb-6">
          Function Page is a platform where anyone can discover, create, share,
          and execute reusable functions. A function can be as simple as
          generating a password or as complex as designing an electrical load
          schedule, analyzing financial records, generating interview questions,
          or automating business workflows.
        </p>

        <p className="text-lg text-gray-600">
          Instead of building the same logic repeatedly, Function Page allows
          knowledge, calculations, workflows, and automation to be packaged into
          reusable functions that can be executed by anyone through a simple
          interface.
        </p>
      </section>

      <section className="max-w-5xl mx-auto py-16 px-6">
        <h2 className="text-4xl font-bold mb-8">
          Applications of Function Page
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="border rounded-xl p-6">
            <h3 className="text-2xl font-semibold mb-3">
              Software Development
            </h3>
            <ul className="space-y-2 text-gray-600">
              <li>• Password generators</li>
              <li>• Data transformers</li>
              <li>• Schema generators</li>
              <li>• Validators</li>
              <li>• API utilities</li>
              <li>• Documentation tools</li>
            </ul>
          </div>

          <div className="border rounded-xl p-6">
            <h3 className="text-2xl font-semibold mb-3">Education</h3>
            <ul className="space-y-2 text-gray-600">
              <li>• Quiz generators</li>
              <li>• Question papers</li>
              <li>• Assignment creation</li>
              <li>• Grade calculations</li>
              <li>• Study planners</li>
              <li>• Research assistance</li>
            </ul>
          </div>

          <div className="border rounded-xl p-6">
            <h3 className="text-2xl font-semibold mb-3">Engineering</h3>
            <ul className="space-y-2 text-gray-600">
              <li>• Electrical calculations</li>
              <li>• Solar sizing</li>
              <li>• Cost estimation</li>
              <li>• Load schedules</li>
              <li>• Structural calculations</li>
              <li>• Design assistance</li>
            </ul>
          </div>

          <div className="border rounded-xl p-6">
            <h3 className="text-2xl font-semibold mb-3">
              Business & Operations
            </h3>
            <ul className="space-y-2 text-gray-600">
              <li>• Financial calculations</li>
              <li>• Reporting tools</li>
              <li>• Workflow automation</li>
              <li>• Invoice generation</li>
              <li>• Customer processing</li>
              <li>• Business analytics</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto py-16 px-6">
        <h2 className="text-4xl font-bold mb-8">
          How Can Function Page Help in Your Daily Work?
        </h2>

        <div className="space-y-8">
          <div>
            <h3 className="text-2xl font-semibold mb-2">Developers</h3>
            <p className="text-gray-600">
              Reuse common utilities, generate schemas, transform data, create
              documentation, validate business logic, and accelerate development
              without rebuilding the same tools repeatedly.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-semibold mb-2">
              Teachers & Professors
            </h3>
            <p className="text-gray-600">
              Generate quizzes, assignments, question papers, study plans,
              report comments, and grading tools to reduce administrative work
              and focus more on teaching.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-semibold mb-2">Engineers</h3>
            <p className="text-gray-600">
              Perform calculations, estimations, equipment sizing, design
              validation, and project planning using reusable engineering
              functions.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-semibold mb-2">Business Owners</h3>
            <p className="text-gray-600">
              Automate reports, analyze financial data, calculate commissions,
              estimate costs, and streamline repetitive business operations.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-semibold mb-2">Students</h3>
            <p className="text-gray-600">
              Access study planners, GPA calculators, interview preparation
              tools, research helpers, and educational utilities.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-semibold mb-2">
              Teams & Organizations
            </h3>
            <p className="text-gray-600">
              Create internal functions once and allow the entire team to reuse
              the same logic, ensuring consistency and reducing duplicated work.
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto py-16 px-6">
        <h2 className="text-4xl font-bold mb-6">Function Library</h2>

        <p className="text-lg text-gray-600 mb-4">
          Function Page already contains a growing library of ready-to-use
          functions across software development, education, engineering,
          business, finance, productivity, and many other domains.
        </p>

        <p className="text-lg text-gray-600">
          Before building a solution yourself, there is a good chance the
          function you need already exists and can be executed immediately.
        </p>
      </section>

      <section className="max-w-5xl mx-auto py-16 px-6">
        <h2 className="text-4xl font-bold mb-6">
          Create Your Own Functions with AI
        </h2>

        <p className="text-lg text-gray-600 mb-6">
          Can't find exactly what you need? Use the Function Page GPT to
          generate your own reusable functions. Describe your requirement in
          plain language and generate function structures, inputs, outputs,
          descriptions, and logic.
        </p>

        <div className="border rounded-xl p-6 bg-gray-50">
          <p className="font-semibold mb-3">Function Page GPT</p>

          <a
            href="https://chatgpt.com/g/g-6a217ca317d081918625c48861b5ede0-function-page"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 break-all"
          >
            https://chatgpt.com/g/g-6a217ca317d081918625c48861b5ede0-function-page
          </a>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mt-8">
          <div className="border rounded-xl p-6">
            <h3 className="font-semibold mb-3">Examples</h3>
            <ul className="space-y-2 text-gray-600">
              <li>• Transformer sizing calculator</li>
              <li>• Student grade calculator</li>
              <li>• GST calculator</li>
              <li>• Commission calculator</li>
              <li>• Password generator</li>
              <li>• Business workflow automation</li>
            </ul>
          </div>

          <div className="border rounded-xl p-6">
            <h3 className="font-semibold mb-3">Benefits</h3>
            <ul className="space-y-2 text-gray-600">
              <li>• Turn expertise into tools</li>
              <li>• Eliminate repetitive work</li>
              <li>• Share solutions with others</li>
              <li>• Create internal company tools</li>
              <li>• Build custom workflows</li>
              <li>• Contribute to the ecosystem</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto py-16 px-6">
        <h2 className="text-4xl font-bold mb-6">Need Something Specific?</h2>

        <p className="text-lg text-gray-600 mb-4">
          If you cannot find the function you need, you can submit a request.
          Many users have unique workflows, calculations, and business processes
          that are not yet available in the library.
        </p>

        <p className="text-lg text-gray-600">
          At this stage, function requests are personally reviewed and may be
          built free of charge when they provide value to the wider community.
          Your request could become the next function available for everyone to
          use.
        </p>
      </section>
      <section className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>

        <div className="space-y-6">
          <div>
            <h3 className="font-semibold">What is Function Page?</h3>
            <p className="text-gray-600">
              Function Page is a platform where users can discover, create,
              share, and execute reusable functions online.
            </p>
          </div>

          <div>
            <h3 className="font-semibold">Can I create my own functions?</h3>
            <p className="text-gray-600">
              Yes. Users can create custom functions manually or use the
              Function Page GPT to generate them.
            </p>
          </div>

          <div>
            <h3 className="font-semibold">
              What types of functions are available?
            </h3>
            <p className="text-gray-600">
              Developer tools, engineering calculators, educational utilities,
              business automation tools, financial calculators, AI-powered
              functions, and more.
            </p>
          </div>
        </div>
      </section>
      <footer className="border-t mt-20 py-12">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-xl font-semibold mb-4">
            Function Page - Function Library & Function Generator
          </h2>

          <p className="text-sm text-gray-600 leading-7">
            Function Page is a platform for discovering, creating, sharing, and
            executing reusable functions online. Browse a growing function
            library containing calculators, generators, converters, engineering
            tools, educational utilities, business automation tools, financial
            calculators, AI-powered functions, and developer utilities.
          </p>

          <p className="text-sm text-gray-600 leading-7 mt-4">
            Whether you are a developer, engineer, teacher, student, researcher,
            accountant, business owner, or professional, Function Page helps you
            solve problems faster using reusable functions. Generate passwords,
            convert data, calculate electrical loads, create quizzes, analyze
            financial records, automate workflows, and much more.
          </p>

          <p className="text-sm text-gray-600 leading-7 mt-4">
            Can't find the function you need? Create custom functions using the
            Function Page GPT or request new functions to be added to the
            library. New functions are continuously added across software
            development, education, engineering, business operations,
            productivity, finance, and artificial intelligence.
          </p>

          <div className="mt-8 text-xs text-gray-500">
            Keywords: function library, online functions, reusable functions,
            function generator, JavaScript functions, developer tools,
            engineering calculators, educational tools, business automation, AI
            functions, productivity tools, free online calculators, software
            development utilities.
          </div>
        </div>
      </footer>
    </>
  );
};

export const ModalComp = ({
  children,
  title,
  button_function,
}: {
  children: any;
  title: string;
  button_function: () => void;
}) => {
  return (
    <Modal>
      <Button
        onPress={button_function}
        size="sm"
        className={""}
        variant="outline"
      >
        {title}
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

const CreateFunctionForm = ({
  functions,
  setFunctions,
  name,
  setName,
  code,
  setCode,
  notes,
  setNotes,
  isEditMode = false,
  seletedIndex,
  preValue,
  setSelectedProgram,
}: {
  functions: any[];
  setFunctions: any;
  isEditMode: boolean;
  name: string;
  setName: (value: string) => void;
  code: string;
  setCode: (value: string) => void;
  notes: string;
  setNotes: (value: string) => void;
  seletedIndex?: number;
  preValue?: any;
  setSelectedProgram?: any;
}) => {
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const reset = () => {
    setName("");
    setCode("");
    setNotes("");
    setShowSuccess(false);
  };
  const preSet = () => {
    if (preValue) {
      setName(preValue.name), setCode(preValue.code), setNotes(preValue.notes);
      setShowSuccess(false);
    }
  };

  const saveFunction = () => {
    const initial_data = localStorageLib_for_function.get();
    if (!name || !code) {
      alert("Please provide both a name and code for the function.");
      return;
    }
    console.log(code);
    const parsed = parseFn(`${code}`);
    console.log(parsed);
    if (!parsed) return;

    const item = {
      id: crypto.randomUUID(),
      name,
      functionArgs: parsed.args,
      functionBody: parsed.body,
      code: `${code}`,
      createdAt: Date.now(),
      notes,
    };

    const updated = [...functions, item];

    localStorageLib_for_function.set(JSON.stringify(updated));

    setFunctions(updated);
    setShowSuccess(true);
    setName("");
    setCode("");

    if (!initial_data) {
      handleClick();
      alert("Hurray, You create your first Function :)");
    }
  };
  const editFunction = () => {
    if (!name || !code) {
      alert("Please provide both a name and code for the function.");
      return;
    }
    console.log(code);
    const parsed = parseFn(`${code}`);
    console.log(parsed);
    if (!parsed) return;

    // update part
    const pre_list_json: string | null = localStorageLib_for_function.get();
    if (!pre_list_json) {
      return;
    }
    console.log("seletedIndex :", seletedIndex);
    if (seletedIndex === undefined || seletedIndex === null) {
      return;
    }
    const preList: any[] = JSON.parse(pre_list_json);
    const preItem = preList[seletedIndex];
    const item = {
      id: preItem.id,
      name,
      functionArgs: parsed.args,
      functionBody: parsed.body,
      code: `${code}`,
      createdAt: preItem.createdAt,
      updateAt: Date.now(),
      notes,
    };
    preList[seletedIndex] = item;

    // const updated = [...functions, item];

    localStorageLib_for_function.set(JSON.stringify(preList));
    setSelectedProgram?.(item);
    setFunctions(preList);

    setName("");
    setCode("");
    setNotes("");
    setShowSuccess(true);
  };

  useEffect(() => {
    setShowSuccess(false);
  }, []);

  return (
    <ModalComp
      button_function={isEditMode ? preSet : reset}
      title={isEditMode ? "Edit Function" : "Create Function"}
    >
      <div>
        {/* Builder */}
        {showSuccess ? (
          <div className="flex flex-col items-center justify-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 200,
              }}
            >
              <FaCheckCircle color="green" size={200} />
            </motion.div>
            {isEditMode ? (
              <div className="flex  flex-col items-center justify-center gap-2">
                <Button
                  className={"w-full"}
                  onClick={() => {
                    preSet();
                    setShowSuccess(false);
                  }}
                  variant="secondary"
                >
                  Edit Function Again
                </Button>
              </div>
            ) : (
              <div>
                <Button
                  onClick={() => setShowSuccess(false)}
                  className={"w-full"}
                  variant="secondary"
                >
                  Create New Function
                </Button>
              </div>
            )}
          </div>
        ) : (
          <Card variant="transparent" className=" mt-2 ">
            <div className="space-y-6">
              <div>
                <h5 className="text-xl font-semibold">Function Builder</h5>

                <p className="text-default-500 text-sm mt-1">
                  Save reusable JavaScript functions locally.
                </p>
              </div>
              <div className="flex flex-col gap-4 ">
                <Input
                  variant="secondary"
                  placeholder="Function Name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                />

                <div className="rounded-xl overflow-hidden">
                  <Editor
                    height="300px"
                    width={"100%"}
                    theme="vs-dark"
                    defaultLanguage="javascript"
                    defaultValue={code}
                    onChange={(value: string | undefined) =>
                      setCode(value || "")
                    }
                    className=""
                  />
                </div>

                <TextArea
                  variant="secondary"
                  value={notes}
                  onChange={(event) => setNotes(event.target.value)}
                  placeholder={`why create or notes for this function`}
                  className={""}
                />
                <div></div>
              </div>
              {isEditMode ? (
                <Button variant="primary" fullWidth onPress={editFunction}>
                  Save Function
                </Button>
              ) : (
                <Button variant="primary" fullWidth onPress={saveFunction}>
                  Create Function
                </Button>
              )}
            </div>
          </Card>
        )}
      </div>
    </ModalComp>
  );
};

function renderValue(value: any) {
  if (value === null) return "null";

  if (value === undefined) return "undefined";

  if (typeof value === "string") {
    return value;
  }

  if (typeof value === "number" || typeof value === "boolean") {
    return String(value);
  }

  if (typeof value === "function") {
    return value.toString();
  }

  return JSON.stringify(value, null, 2);
}

export default function FormPage({
  setPage,
  page,
}: {
  setPage: any;
  page: string;
}) {
  const [consoleLogs, setConsoleLogs] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [notes, setNotes] = useState("");
  const [seletedIndex, setSelectedIndex] = useState<number>();
  const [functions, setFunctions] = useState<any[]>([]);
  const [args, setArgs] = useState<any[]>([]);
  const [selectedProgram, setSelectedProgram] = useState<any>(null);
  const [selectedProgramResult, setSelectedProgramResult] = useState<any>(null);
  useEffect(() => {
    const saved = JSON.parse(localStorageLib_for_function.get() || "[]");

    setFunctions(saved);
  }, []);

  // const serveFunction2= (fn: any) => {
  //   try {
  //     // Rebuild a clean anonymous function from parsed parts
  //     const argList = fn.functionArgs.join(', ');
  //     const safeCode = `(function(${argList}) { ${fn.functionBody} })`;

  //     const fnc = eval(safeCode);

  //     // Use the `args` state values, falling back to empty string
  //     const callArgs = fn.functionArgs.map((_: any, i: number) => args[i] ?? '');

  //     const result = fnc(...callArgs);
  //     console.log('Result:', result);
  //     setSelectedProgramResult(result);
  //   } catch (err) {
  //     alert('Error executing function. Please check the console for details.');
  //     console.error('Function execution error:', err);
  //   }

  // };

  const serveFunction = (fn: any) => {
    const logs = [];

    const originalLog = console.log;
    const originalError = console.error;

    console.log = (...args) => {
      logs.push({
        type: "log",
        message: args
          .map((a) =>
            typeof a === "object" ? JSON.stringify(a, null, 2) : String(a),
          )
          .join(" "),
      });

      originalLog(...args);
    };

    console.error = (...args) => {
      logs.push({
        type: "error",
        message: args
          .map((a) =>
            typeof a === "object" ? JSON.stringify(a, null, 2) : String(a),
          )
          .join(" "),
      });

      originalError(...args);
    };

    try {
      const argList = fn.functionArgs.join(", ");
      const parseFnss = splitFunction(fn.code);
      const safeCode = `(function(${argList}) { ${parseFnss.body} })`;

      const fnc = eval(safeCode);

      const callArgs = fn.functionArgs.map(
        (_: any, i: number) => args[i] ?? "",
      );

      const result = fnc(...callArgs);

      setSelectedProgramResult(result);
    } catch (err: any) {
      logs.push({
        type: "error",
        message: err.stack || err.message,
      });
    }

    console.log = originalLog;
    console.error = originalError;

    setConsoleLogs(logs);
  };

  const deleteFunction = (id: string) => {
    const choice = confirm("Are you sure you want to delete this function?");

    if (!choice) return;

    const updated = functions.filter((fn: any) => fn.id !== id);
    localStorage.setItem("custom_functions", JSON.stringify(updated));
    setFunctions(updated);
  };

  useEffect(() => {
    if (selectedProgram) {
      setArgs([]);
      setSelectedProgramResult(null);
    }
  }, [selectedProgram]);
  return (
    <Layout setPage={setPage} page={page} actions={[]}>
      <div className="flex flex-col gap-2 h-[100%]  ">
        <div className="flex gap-2 h-full ">
          <div className=" flex gap-2   rounded-xl w-full">
            {/* sidenav */}
            <div className="border-r h-full  w-48 p-2">
              <SideNav
                clickAction={(fn: any, index: number) => {
                  console.log(fn);
                  setSelectedProgram(fn);
                  setSelectedIndex(index);
                }}
                lists={functions}
              />
            </div>
            <div className="w-full  ">
              {/* top nav */}
              <div className="h-[35px] mb-2  w-full flex justify-between">
                <div className=" flex items-center gap-2">
                  {selectedProgram && (
                    <>
                      <h2 className="font-medium text-xl">
                        {selectedProgram?.name}
                      </h2>
                      <Chip>Functions</Chip>
                    </>
                  )}
                </div>
                <div className="flex gap-2">
                  <ButtonGenerateWithAi />
                  <CreateFunctionForm
                    isEditMode={false}
                    name={name}
                    setName={setName}
                    code={code}
                    setCode={setCode}
                    notes={notes}
                    setNotes={setNotes}
                    functions={functions}
                    setFunctions={setFunctions}
                  />
                </div>
              </div>

              {/* Saved Functions */}

              {selectedProgram ? (
                // main comp
                <div className="w-full  flex gap-2 h-[calc(100%-35px)]">
                  {/* inpput box */}
                  <div className="w-2/3  h-full">
                    {/* <div>
            <h2 className="text-xl font-semibold">
              Saved Functions
            </h2>

            <p className="text-default-500 text-sm">
              {functions.length} functions stored
            </p>
          </div> */}

                    <Card
                      variant="transparent"
                      key={selectedProgram.id}
                      className="p-5 w-full h-full border"
                    >
                      <div className="w-full">
                        <div className="flex justify-between items-center">
                          <div className="gap-2 flex items-center">
                            <span className="text-xs text-default-500">
                              {/* {new Date(
                                selectedProgram.createdAt,
                              ).toLocaleDateString()} */}
                            </span>
                            {/* <Button onPress={()=>{
                    setArgs([]);
                  }} size="sm">
                    Clear
                  </Button> */}
                          </div>
                        </div>

                        <pre className="overflow-auto rounded-xl bg-default-100 p-4 text-sm font-mono flex flex-col">
                          {selectedProgram.functionArgs.map(
                            (arg: any, index: number) => {
                              return (
                                <>
                                  <Label className="capitalize font-sans mt-2 mb-1">
                                    {arg}
                                  </Label>
                                  <TextArea
                                    onChange={(event) => {
                                      setArgs((prevArgs) => {
                                        const newArgs = [...prevArgs];
                                        newArgs[index] = event.target.value;
                                        return newArgs;
                                      });
                                    }}
                                    variant="secondary"
                                    placeholder={`${arg}`}
                                    className="mb-2 h-6"
                                  />
                                </>
                              );
                            },
                          )}
                        </pre>

                        <div className="flex gap-2 justify-between mt-2">
                          <Button
                            onPress={() => {
                              serveFunction(selectedProgram);
                            }}
                            size="sm"
                            className="w-48"
                            variant="primary"
                          >
                            Run
                          </Button>

                          <div className="flex gap-2">
                            <CreateFunctionForm
                              name={name}
                              setName={setName}
                              code={code}
                              setCode={setCode}
                              notes={notes}
                              setNotes={setNotes}
                              functions={functions}
                              setFunctions={setFunctions}
                              isEditMode={true}
                              seletedIndex={seletedIndex}
                              preValue={selectedProgram}
                              setSelectedProgram={setSelectedProgram}
                            />
                            <Button
                              size="sm"
                              variant="outline"
                              onPress={() => deleteFunction(selectedProgram.id)}
                            >
                              Delete
                            </Button>
                          </div>
                        </div>
                        <div className="mt-4">
                          <Accordion variant="surface">
                            <Accordion.Item>
                              <Accordion.Heading className={"h-9"}>
                                <Accordion.Trigger>
                                  <div>View Code</div>
                                  <Accordion.Indicator />
                                </Accordion.Trigger>
                              </Accordion.Heading>
                              <Accordion.Panel>
                                <Accordion.Body className="p-2 ">
                                  <div>
                                    <div></div>
                                  </div>
                                  <div>
                                    <TextArea
                                      className={"w-full h-42 text-gray-500"}
                                      readOnly
                                      value={selectedProgram.code}
                                    />
                                  </div>
                                  {/* <pre className="overflow-auto rounded-xl bg-default-100 p-4 text-sm font-mono">
            {selectedProgram.code}
          </pre> */}
                                </Accordion.Body>
                              </Accordion.Panel>
                            </Accordion.Item>
                          </Accordion>
                          <Accordion variant="surface">
                            <Accordion.Item>
                              <Accordion.Heading className={"h-9"}>
                                <Accordion.Trigger>
                                  <div>View Notes</div>
                                  <Accordion.Indicator />
                                </Accordion.Trigger>
                              </Accordion.Heading>
                              <Accordion.Panel>
                                <Accordion.Body>
                                  <pre className="overflow-auto rounded-xl bg-default-100 p-4 text-sm font-mono">
                                    {selectedProgram.notes ||
                                      "No notes provided."}
                                  </pre>
                                </Accordion.Body>
                              </Accordion.Panel>
                            </Accordion.Item>
                          </Accordion>
                        </div>
                      </div>
                    </Card>
                    <div>
                      <DetailsComp />
                    </div>
                  </div>
                  {/* output box */}
                  <div className="border w-1/3 rounded-3xl p-2 ">
                    {/* <pre>{renderValue(selectedProgramResult)}</pre> */}
                    <div className="flex flex-col justify-between h-full overflow-y-auto">
                      <div>
                        <div className="flex justify-between mt-1">
                          <div className="font-bold mb-2">Output</div>
                          <div>
                            <CopyText item={selectedProgramResult} />
                          </div>
                        </div>

                        <pre className="mb-4">
                          {renderValue(selectedProgramResult)}
                        </pre>
                      </div>

                      <div>
                        <Accordion variant="surface">
                          <Accordion.Item>
                            <Accordion.Heading className={"h-9"}>
                              <Accordion.Trigger>
                                <div>Console</div>
                                <Accordion.Indicator />
                              </Accordion.Trigger>
                            </Accordion.Heading>
                            <Accordion.Panel>
                              <Accordion.Body>
                                <div className="bg-black text-white rounded-2xl p-3 h-[300px] overflow-auto font-mono">
                                  {consoleLogs.length === 0 ? (
                                    <div>No logs</div>
                                  ) : (
                                    consoleLogs.map((log: any, index) => (
                                      <div
                                        key={index}
                                        className={
                                          log.type === "error"
                                            ? "text-red-400"
                                            : "text-green-400"
                                        }
                                      >
                                        [{log?.type.toUpperCase()}]{" "}
                                        {log.message}
                                      </div>
                                    ))
                                  )}
                                </div>
                              </Accordion.Body>
                            </Accordion.Panel>
                          </Accordion.Item>
                        </Accordion>
                        <div className="font-bold mb-2"></div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <Card variant="transparent" className="p-5 border">
                    <div className="flex flex-col gap-3">
                      <div>
                        <h3 className="font-medium"> Select a Function</h3>
                        <p className="text-default-500 text-sm mt-1">
                          Create or choose a Function.
                        </p>
                      </div>
                      <DetailsComp />
                    </div>
                  </Card>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
