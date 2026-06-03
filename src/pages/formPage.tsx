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
} from "@heroui/react";
import { parseFn } from "@/libs";
import { Editor } from "@monaco-editor/react";
import confetti from "canvas-confetti";

import { FaCheckCircle } from "react-icons/fa";
import { motion } from "framer-motion";
import Layout from "@/Layout";
import SideNav from "@/component/SideNav";
const handleClick = () => {
  confetti({
    particleCount: 400,
    spread: 200,
    //   time:3000,
    origin: { y: 0.6 },
  });
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

const CreateComp = ({
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
    const initial_data = localStorage.getItem("custom_functions");
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
      code,
      createdAt: Date.now(),
      notes,
    };

    const updated = [...functions, item];

    localStorage.setItem("custom_functions", JSON.stringify(updated));

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
    const pre_list_json: string | null =
      localStorage.getItem("custom_functions");
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
      code,
      createdAt: preItem.createdAt,
      updateAt: Date.now(),
      notes,
    };
    preList[seletedIndex] = item;

    // const updated = [...functions, item];

    localStorage.setItem("custom_functions", JSON.stringify(preList));
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
export default function FormPage({setPage}:{setPage:any}) {
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
    const saved = JSON.parse(localStorage.getItem("custom_functions") || "[]");

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
      const safeCode = `(function(${argList}) { ${fn.functionBody} })`;

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
    <Layout
    setPage={setPage}
      actions={[
        <CreateComp
          isEditMode={false}
          name={name}
          setName={setName}
          code={code}
          setCode={setCode}
          notes={notes}
          setNotes={setNotes}
          functions={functions}
          setFunctions={setFunctions}
        />,
      ]}
    >
      <div className="flex flex-col gap-2 h-[100%]  ">
        <div className="flex gap-2 h-full ">
          <div className=" flex gap-2   rounded-xl w-2/3">
            <div>
              <div className="border-r h-full  w-48 p-2">
               <SideNav clickAction={
                (fn:any,index:number) => {
                      console.log(fn);
                      setSelectedProgram(fn);
                      setSelectedIndex(index);
                    }
               } lists={functions}/>
              </div>
            </div>
            <div className="w-full">
              {/* Saved Functions */}
              {selectedProgram ? (
                <div className="w-full">
                  {/* <div>
            <h2 className="text-xl font-semibold">
              Saved Functions
            </h2>

            <p className="text-default-500 text-sm">
              {functions.length} functions stored
            </p>
          </div> */}

                  <Card
                    variant="default"
                    key={selectedProgram.id}
                    className="p-5 w-full border"
                  >
                    <div className="w-full">
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium">{selectedProgram.name}</h3>

                        <div className="gap-2 flex items-center">
                          <span className="text-xs text-default-500">
                            {new Date(
                              selectedProgram.createdAt,
                            ).toLocaleDateString()}
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
                            );
                          },
                        )}
                      </pre>
                      <div>
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
                                  <Card variant="secondary">
                                    {selectedProgram.code}
                                  </Card>
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
                          <CreateComp
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
                    </div>
                  </Card>
                </div>
              )
            :<>
             <Card variant="default" className="p-5 border">
                        <div className="text-default-500 text-sm">
                         Please Seleted any.
                        </div>
                      </Card>
            
            </>
            
            }
            </div>
          </div>
          {selectedProgram&&<div className="border w-1/3 rounded-3xl p-2 ">
            {/* <pre>{renderValue(selectedProgramResult)}</pre> */}
            <div className="flex flex-col justify-between h-full">
              <div>
                <div className="font-bold mb-2">Output</div>
                <pre className="mb-4">{renderValue(selectedProgramResult)}</pre>
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
                                [{log?.type.toUpperCase()}] {log.message}
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
          </div>}
        </div>
      </div>
    </Layout>
  );
}
