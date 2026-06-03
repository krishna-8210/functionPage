import { useState } from "react";
import { Button, Input, Modal } from "@heroui/react";
import { FaCheckCircle } from "react-icons/fa";
import { motion } from "framer-motion";

const local_storage_key = "snipptes";

const CreateSnippetItem = ({
  snippetGroupId,
  setSnippetGroup,
  isEditMode = false,
  preValue,
  setShowSuccess,
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

    const existingGroups = JSON.parse(localStorage.getItem(local_storage_key) || "[]");
    const updatedGroups = existingGroups.map(group => {
      if (group.id === snippetGroupId) {
        return { ...group, snippets: [...(group.snippets || []), item] };
      }
      return group;
    });

    localStorage.setItem(local_storage_key, JSON.stringify(updatedGroups));
    setSnippetGroup(updatedGroups);
    setShowSuccess(true);
    reset();
  };

  const editSnippet = () => {
    if (!name || !code) {
      alert("Please provide both a name and code for the snippet.");
      return;
    }

    const existingGroups = JSON.parse(localStorage.getItem(local_storage_key) || "[]");
    const updatedGroups = existingGroups.map(group => {
      if (group.id === snippetGroupId) {
        const updatedSnippets = group.snippets.map(snippet => 
          snippet.id === preValue.id ? { ...snippet, name, code, notes } : snippet
        );
        return { ...group, snippets: updatedSnippets };
      }
      return group;
    });

    localStorage.setItem(local_storage_key, JSON.stringify(updatedGroups));
    setSnippetGroup(updatedGroups);
    setShowSuccess(true);
    reset();
  };

  return (
    <Modal>
      <div>
        <h5 className="text-xl font-semibold">{isEditMode ? "Edit Snippet" : "Create Snippet"}</h5>
        <Input
          variant="secondary"
          placeholder="Snippet Name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <Input
          variant="secondary"
          placeholder="Snippet Code"
          value={code}
          onChange={(event) => setCode(event.target.value)}
        />
        <Input
          variant="secondary"
          placeholder="Notes"
          value={notes}
          onChange={(event) => setNotes(event.target.value)}
        />
        <Button onClick={isEditMode ? editSnippet : saveSnippet}>
          {isEditMode ? "Save Snippet" : "Create Snippet"}
        </Button>
      </div>
      {showSuccess && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          <FaCheckCircle color="green" size={50} />
        </motion.div>
      )}
    </Modal>
  );
};

export default CreateSnippetItem;