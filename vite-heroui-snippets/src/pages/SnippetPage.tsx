import { useEffect, useState } from "react";
import {
  Button,
  Input,
  Card,
  TextArea,
  Accordion,
  Modal,
} from "@heroui/react";
import { parseFn } from "@/libs";
import { FaCheckCircle } from "react-icons/fa";
import { motion } from "framer-motion";
import Layout from "@/layout/Layout";
import CreateSnippetGroup from "@/components/CreateSnippetGroup";
import CreateSnippetItem from "@/components/CreateSnippetItem";

const local_storage_key = "snippets";

export default function SnippetPage() {
  const [snippetList, setSnippetList] = useState<any[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<any>(null);
  const [selectedItemIndex, setSelectedItemIndex] = useState<number | null>(null);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem(local_storage_key) || "[]");
    setSnippetList(saved);
  }, []);

  const addSnippetItem = (item: any) => {
    if (selectedGroup) {
      const updatedGroup = {
        ...selectedGroup,
        snippets: [...selectedGroup.snippets, item],
      };
      updateGroupInLocalStorage(updatedGroup);
    }
  };

  const editSnippetItem = (item: any) => {
    if (selectedGroup && selectedItemIndex !== null) {
      const updatedSnippets = [...selectedGroup.snippets];
      updatedSnippets[selectedItemIndex] = item;
      const updatedGroup = {
        ...selectedGroup,
        snippets: updatedSnippets,
      };
      updateGroupInLocalStorage(updatedGroup);
    }
  };

  const deleteSnippetItem = (index: number) => {
    if (selectedGroup) {
      const updatedSnippets = selectedGroup.snippets.filter((_: any, i: number) => i !== index);
      const updatedGroup = {
        ...selectedGroup,
        snippets: updatedSnippets,
      };
      updateGroupInLocalStorage(updatedGroup);
    }
  };

  const updateGroupInLocalStorage = (group: any) => {
    const updatedList = snippetList.map((g) => (g.id === group.id ? group : g));
    localStorage.setItem(local_storage_key, JSON.stringify(updatedList));
    setSnippetList(updatedList);
    setSelectedGroup(group);
  };

  return (
    <Layout
      actions={[
        <CreateSnippetGroup setSnippetList={setSnippetList} />,
      ]}
    >
      <div className="flex flex-col gap-2 h-full">
        <div className="flex gap-2 h-full">
          <div className="flex gap-2 rounded-xl w-full">
            <div className="border h-full rounded-xl p-2 w-32">
              {snippetList.map((group: any, index: number) => (
                <div
                  key={group.id}
                  onClick={() => {
                    setSelectedGroup(group);
                    setSelectedItemIndex(null);
                  }}
                  className="cursor-pointer"
                >
                  <h3 className="hover:text-blue-500">{group.name}</h3>
                </div>
              ))}
            </div>
            <div className="w-full">
              {selectedGroup && (
                <>
                  <div className="flex justify-between">
                    <div>{selectedGroup.name}</div>
                    <div>
                      <Button size="sm" onClick={() => setSelectedItemIndex(null)}>
                        Create Snippet
                      </Button>
                    </div>
                  </div>
                  <div>
                    {selectedGroup.snippets.map((item: any, index: number) => (
                      <Card key={item.id} className="my-2 p-2">
                        <div className="flex justify-between">
                          <div>{item.code}</div>
                          <div>
                            <Button size="sm" onClick={() => {
                              setSelectedItemIndex(index);
                            }}>
                              Edit
                            </Button>
                            <Button size="sm" onClick={() => deleteSnippetItem(index)}>
                              Delete
                            </Button>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        {selectedGroup && (
          <CreateSnippetItem
            addSnippetItem={addSnippetItem}
            editSnippetItem={editSnippetItem}
            selectedItemIndex={selectedItemIndex}
            selectedGroup={selectedGroup}
          />
        )}
      </div>
    </Layout>
  );
}