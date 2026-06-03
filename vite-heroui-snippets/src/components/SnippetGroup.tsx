import { useState } from "react";
import { Button, Card, Input } from "@heroui/react";
import { ModalComp } from "./ModalComp";
import { CreateSnippetItem } from "./CreateSnippetItem";

const local_storage_key = "snipptes";

const SnippetItem = ({ item, onEdit, onDelete }) => {
  return (
    <Card variant="default" className="p-4 mb-2">
      <div className="flex justify-between">
        <div>
          <h4 className="font-medium">{item.name}</h4>
          <pre className="overflow-auto rounded-xl bg-default-100 p-2 text-sm font-mono">
            {item.code}
          </pre>
          <p className="text-sm text-gray-500">{item.notes}</p>
        </div>
        <div className="flex flex-col">
          <Button size="sm" variant="outline" onPress={() => onEdit(item)}>
            Edit
          </Button>
          <Button size="sm" variant="outline" onPress={() => onDelete(item.id)}>
            Delete
          </Button>
        </div>
      </div>
    </Card>
  );
};

const SnippetGroup = ({ group, onDeleteGroup }) => {
  const [showCreateItemModal, setShowCreateItemModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleEditItem = (item) => {
    setSelectedItem(item);
    setShowCreateItemModal(true);
  };

  const handleDeleteItem = (id) => {
    const updatedSnippets = group.snippted.filter((item) => item.id !== id);
    localStorage.setItem(local_storage_key, JSON.stringify(updatedSnippets));
    // Trigger a re-render or state update in the parent component
  };

  return (
    <div className="mb-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">{group.name}</h3>
        <Button size="sm" variant="outline" onPress={onDeleteGroup}>
          Delete Group
        </Button>
      </div>
      <Button
        size="sm"
        variant="primary"
        onPress={() => setShowCreateItemModal(true)}
      >
        Add Snippet
      </Button>
      <div className="mt-2">
        {group.snippted.map((item) => (
          <SnippetItem
            key={item.id}
            item={item}
            onEdit={handleEditItem}
            onDelete={handleDeleteItem}
          />
        ))}
      </div>
      {showCreateItemModal && (
        <ModalComp
          button_function={() => setShowCreateItemModal(false)}
          title={selectedItem ? "Edit Snippet" : "Create Snippet"}
        >
          <CreateSnippetItem
            item={selectedItem}
            onClose={() => setShowCreateItemModal(false)}
            onSave={(newItem) => {
              // Save the new or edited item to local storage
              const updatedSnippets = selectedItem
                ? group.snippted.map((i) => (i.id === newItem.id ? newItem : i))
                : [...group.snippted, newItem];
              localStorage.setItem(local_storage_key, JSON.stringify(updatedSnippets));
              // Trigger a re-render or state update in the parent component
              setShowCreateItemModal(false);
            }}
          />
        </ModalComp>
      )}
    </div>
  );
};

export default SnippetGroup;