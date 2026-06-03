import { useEffect, useState } from "react";
import { Button, Input, TextArea, Card } from "@heroui/react";
import { ModalComp } from "./ModalComp";

const local_storage_key = "snipptes";

const CreateSnippetItem = ({
  snippet,
  setSnippet,
  isEditMode = false,
  preValue,
  setShowSuccess,
}: {
  snippet: any;
  setSnippet: (value: any) => void;
  isEditMode?: boolean;
  preValue?: any;
  setShowSuccess: (value: boolean) => void;
}) => {
  const [name, setName] = useState(preValue ? preValue.name : "");
  const [code, setCode] = useState(preValue ? preValue.code : "");
  const [notes, setNotes] = useState(preValue ? preValue.notes : "");

  const reset = () => {
    setName("");
    setCode("");
    setNotes("");
    setShowSuccess(false);
  };

  const saveSnippet = () => {
    if (!name || !code) {
      alert("Please provide both a name and code for the snippet.");
      return;
    }

    const item = {
      id: crypto.randomUUID(),
      name,
      code,
      notes,
      createdAt: Date.now(),
    };

    const updatedSnippets = [...snippet.snippted, item];
    const updatedGroup = { ...snippet, snippted: updatedSnippets };

    localStorage.setItem(local_storage_key, JSON.stringify(updatedGroup));
    setSnippet(updatedGroup);
    setShowSuccess(true);
    reset();
  };

  const editSnippet = () => {
    if (!name || !code) {
      alert("Please provide both a name and code for the snippet.");
      return;
    }

    const updatedSnippets = snippet.snippted.map((item: any) =>
      item.id === preValue.id ? { ...item, name, code, notes } : item
    );

    const updatedGroup = { ...snippet, snippted: updatedSnippets };
    localStorage.setItem(local_storage_key, JSON.stringify(updatedGroup));
    setSnippet(updatedGroup);
    setShowSuccess(true);
    reset();
  };

  useEffect(() => {
    if (isEditMode && preValue) {
      setName(preValue.name);
      setCode(preValue.code);
      setNotes(preValue.notes);
    }
  }, [isEditMode, preValue]);

  return (
    <ModalComp
      button_function={reset}
      title={isEditMode ? "Edit Snippet" : "Create Snippet"}
    >
      <Card variant="transparent" className="mt-2">
        <div className="space-y-4">
          <Input
            variant="secondary"
            placeholder="Snippet Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextArea
            variant="secondary"
            placeholder="Snippet Code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
          <TextArea
            variant="secondary"
            placeholder="Notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
          <Button
            variant="primary"
            fullWidth
            onPress={isEditMode ? editSnippet : saveSnippet}
          >
            {isEditMode ? "Save Snippet" : "Create Snippet"}
          </Button>
        </div>
      </Card>
    </ModalComp>
  );
};

export default CreateSnippetItem;