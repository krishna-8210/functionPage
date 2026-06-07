import { useEffect, useState } from "react";
import { Button, Card, Input, Modal, TextArea } from "@heroui/react";
import { Editor } from "@monaco-editor/react";
import { motion } from "framer-motion";
import { FaCheck, FaCheckCircle, FaCopy, FaEdit, FaTrash } from "react-icons/fa";
import Layout from "@/Layout";

const localStorageKey = "snipptes";

type SnippetItem = {
  id: string;
  name: string;
  code: string;
  notes: string;
  createdAt: number;
  updatedAt?: number;
};

type SnippetGroup = {
  id: string;
  name: string;
  snippet: SnippetItem[];
  createdAt: number;
  updatedAt?: number;
};

const createEmptySnippet = () => ({
  name: "",
  code: "",
  notes: "",
});

const normalizeGroup = (group: any): SnippetGroup => ({
  id: group.id || crypto.randomUUID(),
  name: group.name || "Untitled group",
  snippet: Array.isArray(group.snippet)
    ? group.snippet
    : Array.isArray(group.snippted)
      ? group.snippted
      : [],
  createdAt: group.createdAt || group.createAt || Date.now(),
  updatedAt: group.updatedAt,
});

const saveSnippetGroups = (groups: SnippetGroup[]) => {
  localStorage.setItem(localStorageKey, JSON.stringify(groups));
};

export const ModalComp = ({
  children,
  title,
  buttonFunction,
  icon,
  ariaLabel,
  buttonClassName,
}: {
  children: any;
  title: string;
  buttonFunction: () => void;
  icon?: any;
  ariaLabel?: string;
  buttonClassName?: string;
}) => {
  return (
    <Modal>
      <Button
        onPress={buttonFunction}
        size="sm"
        variant="outline"
        aria-label={ariaLabel || title}
        className={buttonClassName}
      >
        {icon || title}
      </Button>
      <Modal.Backdrop>
        <Modal.Container placement="top" size="lg">
          <Modal.Dialog>
            <Modal.CloseTrigger />
            <Modal.Header />
            <Modal.Body>{children}</Modal.Body>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
};

const CreateSnippetGroup = ({
  setSnippetList,
}: {
  setSnippetList: (updater: (groups: SnippetGroup[]) => SnippetGroup[]) => void;
}) => {
  const [name, setName] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const reset = () => {
    setName("");
    setShowSuccess(false);
  };

  const saveGroup = () => {
    if (!name.trim()) {
      alert("Please provide a snippet group name.");
      return;
    }

    const item: SnippetGroup = {
      id: crypto.randomUUID(),
      name: name.trim(),
      snippet: [],
      createdAt: Date.now(),
    };

    setSnippetList((currentGroups) => {
      const updated = [...currentGroups, item];
      saveSnippetGroups(updated);
      return updated;
    });

    setShowSuccess(true);
    setName("");
  };

  return (
    <ModalComp buttonFunction={reset} title="Create Snippet group">
      {showSuccess ? (
        <div className="flex flex-col items-center justify-center gap-4">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 200,
            }}
          >
            <FaCheckCircle color="green" size={160} />
          </motion.div>
          <Button onPress={() => setShowSuccess(false)} variant="secondary">
            Create Another Group
          </Button>
        </div>
      ) : (
        <div className="p-2 mt-2 flex items-center gap-3 flex-col">
          <Input
            className="w-full"
            autoFocus
            variant="secondary"
            placeholder="Snippet Group Name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          <Button onPress={saveGroup} variant="primary" fullWidth>
            Create
          </Button>
        </div>
      )}
    </ModalComp>
  );
};

const SnippetItemForm = ({
  groupIndex,
  snippetIndex,
  preValue,
  setSnippetList,
  icon,
  buttonClassName,
}: {
  groupIndex: number;
  snippetIndex?: number;
  preValue?: SnippetItem;
  setSnippetList: (updater: (groups: SnippetGroup[]) => SnippetGroup[]) => void;
  icon?: any;
  buttonClassName?: string;
}) => {
  const [form, setForm] = useState(createEmptySnippet);
  const [showSuccess, setShowSuccess] = useState(false);
  const isEditMode = snippetIndex !== undefined && Boolean(preValue);

  const reset = () => {
    setForm(createEmptySnippet());
    setShowSuccess(false);
  };

  const preSet = () => {
    setForm({
      name: preValue?.name || "",
      code: preValue?.code || "",
      notes: preValue?.notes || "",
    });
    setShowSuccess(false);
  };

  const saveSnippet = () => {
    if (!form.name.trim() || !form.code.trim()) {
      alert("Please provide both a name and code for the snippet.");
      return;
    }

    setSnippetList((currentGroups) => {
      const updated = currentGroups.map((group, index) => {
        if (index !== groupIndex) return group;

        const item: SnippetItem = {
          id: preValue?.id || crypto.randomUUID(),
          name: form.name.trim(),
          code: form.code,
          notes: form.notes,
          createdAt: preValue?.createdAt || Date.now(),
          updatedAt: isEditMode ? Date.now() : undefined,
        };

        const nextSnippets = [...group.snippet];

        if (isEditMode && snippetIndex !== undefined) {
          nextSnippets[snippetIndex] = item;
        } else {
          nextSnippets.push(item);
        }

        return {
          ...group,
          snippet: nextSnippets,
          updatedAt: Date.now(),
        };
      });

      saveSnippetGroups(updated);
      return updated;
    });

    setShowSuccess(true);

    if (!isEditMode) {
      setForm(createEmptySnippet());
    }
  };

  return (
    <ModalComp
      buttonFunction={isEditMode ? preSet : reset}
      title={isEditMode ? "Edit" : "Create Snippet"}
      icon={icon}
      ariaLabel={isEditMode ? "Edit snippet" : "Create snippet"}
      buttonClassName={buttonClassName}
    >
      {showSuccess ? (
        <div className="flex flex-col items-center justify-center gap-4">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 200,
            }}
          >
            <FaCheckCircle color="green" size={160} />
          </motion.div>
          <Button
            onPress={() => {
              if (isEditMode) preSet();
              setShowSuccess(false);
            }}
            variant="secondary"
          >
            {isEditMode ? "Edit Again" : "Create Another Snippet"}
          </Button>
        </div>
      ) : (
        <Card variant="transparent" className="mt-2">
          <div className="space-y-6">
            <div>
              <h5 className="text-xl font-semibold">
                {isEditMode ? "Edit Snippet" : "Snippet Builder"}
              </h5>
              <p className="text-default-500 text-sm mt-1">
                Save reusable code inside this snippet group.
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <Input
                variant="secondary"
                placeholder="Snippet Name"
                value={form.name}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    name: event.target.value,
                  }))
                }
              />
              <div className="rounded-xl overflow-hidden">
                <Editor
                  height="300px"
                  width="100%"
                  theme="vs-dark"
                  defaultLanguage="javascript"
                  value={form.code}
                  onChange={(value: string | undefined) =>
                    setForm((current) => ({
                      ...current,
                      code: value || "",
                    }))
                  }
                />
              </div>
              <TextArea
                variant="secondary"
                value={form.notes}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    notes: event.target.value,
                  }))
                }
                placeholder="Notes for this snippet"
              />
            </div>
            <Button variant="primary" fullWidth onPress={saveSnippet}>
              {isEditMode ? "Save Snippet" : "Create Snippet"}
            </Button>
          </div>
        </Card>
      )}
    </ModalComp>
  );
};

export default function SnippetPage({setPage,page}:{setPage:any,page:string}) {
  const [snippetList, setSnippetList] = useState<SnippetGroup[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number>();
  const [copiedSnippetId, setCopiedSnippetId] = useState<string | null>(null);
  const selectedGroup =
    selectedIndex !== undefined ? snippetList[selectedIndex] : null;

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem(localStorageKey) || "[]");
    const normalized = saved.map(normalizeGroup);

    setSnippetList(normalized);

    if (saved.length !== normalized.length || saved.some((group: any) => group.snippted)) {
      saveSnippetGroups(normalized);
    }
  }, []);

  const deleteGroup = (groupIndex: number) => {
    const choice = confirm("Are you sure you want to delete this snippet group?");

    if (!choice) return;

    setSnippetList((currentGroups) => {
      const updated = currentGroups.filter((_, index) => index !== groupIndex);
      saveSnippetGroups(updated);
      return updated;
    });

    setSelectedIndex(undefined);
  };

  const deleteSnippet = (snippetIndex: number) => {
    if (selectedIndex === undefined) return;

    const choice = confirm("Are you sure you want to delete this snippet?");

    if (!choice) return;

    setSnippetList((currentGroups) => {
      const updated = currentGroups.map((group, groupIndex) => {
        if (groupIndex !== selectedIndex) return group;

        return {
          ...group,
          snippet: group.snippet.filter((_, index) => index !== snippetIndex),
          updatedAt: Date.now(),
        };
      });

      saveSnippetGroups(updated);
      return updated;
    });
  };

  const copySnippetCode = async (snippet: SnippetItem) => {
    
    try {
      await navigator.clipboard.writeText(snippet.code);
      setCopiedSnippetId(snippet.id);
      setTimeout(() => {
        setCopiedSnippetId((currentId) =>
          currentId === snippet.id ? null : currentId,
        );
      }, 2000);
    } catch {
      alert("Could not copy this snippet.");
    }
  };

  return (
    <Layout
    page={page}
    setPage={setPage}
      actions={[
      
      ]}
    >
      <div className="flex flex-col gap-2 h-[100%]">
        <div className="flex gap-2 h-full">
          <div className="flex gap-2 rounded-xl w-full ">
            <div className="border-r h-full p-2 w-48 shrink-0 ">
              {snippetList.length === 0 ? (
                <div className="text-sm text-default-500 p-2">
                  No groups yet.
                </div>
              ) : (
                snippetList.map((item, index) => (
                  <div
                    key={item.id}
                    onClick={() => setSelectedIndex(index)}
                    className="space-y-3 cursor-pointer"
                  >
                    <div className="flex justify-between items-center  gap-2 py-1">
                      <h3
                        className={`capitalize hover:text-blue-500 transition truncate ${
                          selectedIndex === index ? "text-blue-500" : ""
                        }`}
                      >
                        {item.name}
                      </h3>
                      <span className="text-xs text-default-500">
                        {item.snippet.length}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
            <div className="w-full ">
              {selectedGroup ? (
                <div className="flex flex-col gap-3 ">
                  <div className="flex justify-between items-center gap-2">
                    <div>
                      <div className="font-semibold">{selectedGroup.name}</div>
                      <div className="text-xs text-default-500">
                        {selectedGroup.snippet.length} snippets
                      </div>
                    </div>
                    <div className="flex gap-2">
                         <CreateSnippetGroup key="create-group" setSnippetList={setSnippetList} />
                      <SnippetItemForm
                        groupIndex={selectedIndex as number}
                        setSnippetList={setSnippetList}
                      />
                      <Button
                        size="sm"
                        variant="outline"
                        onPress={() => deleteGroup(selectedIndex as number)}
                      >
                        Delete Group
                      </Button>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3 overflow-y-scroll ">
                    {selectedGroup.snippet.length === 0 ? (
                      <Card variant="default" className="p-5 border">
                        <div className="text-default-500 text-sm">
                          This group does not have snippets yet.
                        </div>
                      </Card>
                    ) : (
                        <div className="w-full grid gap-2 grid-cols-3">
                            {
                      selectedGroup.snippet.map((item, snippetIndex) => (
                        <Card
                          variant="default"
                          key={item.id}
                          className="p-3 w-full border "
                        >
                          <div className="w-full h-full flex flex-col">
                            <div className="flex justify-between items-start gap-3">
                              <div>
                                <h3 className="font-medium">{item.name}</h3>
                                <span className="text-xs text-default-500">
                                  {new Date(item.createdAt).toLocaleDateString()}
                                </span>
                              </div>
                              <Button
                                size="sm"
                                variant="outline"
                                aria-label="Copy snippet code"
                                className="h-8 w-8 min-w-8 rounded-full transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-400 hover:bg-slate-100"
                                onPress={() => copySnippetCode(item)}
                              >
                                {copiedSnippetId === item.id ? (
                                  <FaCheck className="text-green-600" />
                                ) : (
                                  <FaCopy />
                                )}
                              </Button>
                            </div>

                            <div className="mt-3 flex flex-1 flex-col gap-3">
                                <TextArea
                                value={item.code}
                                readOnly
                                variant="secondary"
                                className={'h-16 border-none'}
                                style={{outline:'none',border:'0px'}}
                                />
                            
                              <div className="rounded-xl bg-default-100 p-4 text-sm whitespace-pre-wrap">
                                {item.notes || "No notes provided."}
                              </div>
                            </div>
                            <div className="mt  flex justify-end gap-2 rounded-xl bg-default-50 p-2">
                              
                              <SnippetItemForm
                                groupIndex={selectedIndex as number}
                                snippetIndex={snippetIndex}
                                preValue={item}
                                setSnippetList={setSnippetList}
                                icon={<FaEdit />}
                                buttonClassName="h-8 w-8 min-w-8 rounded-full transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-500 hover:bg-blue-50 hover:text-blue-600"
                              />
                              <Button
                                size="sm"
                                variant="outline"
                                aria-label="Delete snippet"
                                className="h-8 w-8 min-w-8 rounded-full transition-all duration-200 hover:-translate-y-0.5 hover:border-red-500 hover:bg-red-50 hover:text-red-600"
                                onPress={() => deleteSnippet(snippetIndex)}
                              >
                                <FaTrash />
                              </Button>

                            </div>
                          </div>
                        </Card>
                      ))
                     } </div>
                    )
                  
                    }
                  </div>
                </div>
              ) : (
                <div className="flex flex-col ">
                  <div className="w-full flex justify-end">
                    <CreateSnippetGroup key="create-group" setSnippetList={setSnippetList} />

                  </div>
          
                <Card  variant="transparent" className="p-5 border mt-3">
                 
                  <div className="flex flex-col gap-3">
                    
                    <div>
                      <h3 className="font-medium">Select a snippet group</h3>
                      <p className="text-default-500 text-sm mt-1">
                        Create or choose a group to manage snippets.
                      </p>
                    </div>
                  </div>
                </Card>
                      </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
