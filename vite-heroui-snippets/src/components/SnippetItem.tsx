import { useState } from "react";
import { Button, Card, TextArea } from "@heroui/react";
import { FaEdit, FaTrash } from "react-icons/fa";

const SnippetItem = ({
  snippet,
  onEdit,
  onDelete,
}: {
  snippet: {
    id: string;
    code: string;
    notes: string;
  };
  onEdit: (snippet: any) => void;
  onDelete: (id: string) => void;
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedCode, setEditedCode] = useState(snippet.code);
  const [editedNotes, setEditedNotes] = useState(snippet.notes);

  const handleEdit = () => {
    onEdit({ ...snippet, code: editedCode, notes: editedNotes });
    setIsEditing(false);
  };

  return (
    <Card variant="default" className="p-4 mb-2">
      {isEditing ? (
        <div>
          <TextArea
            value={editedCode}
            onChange={(e) => setEditedCode(e.target.value)}
            placeholder="Edit snippet code"
            className="mb-2"
          />
          <TextArea
            value={editedNotes}
            onChange={(e) => setEditedNotes(e.target.value)}
            placeholder="Edit notes"
            className="mb-2"
          />
          <div className="flex justify-between">
            <Button onPress={handleEdit} variant="primary">
              Save
            </Button>
            <Button onPress={() => setIsEditing(false)} variant="outline">
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <div>
          <pre className="overflow-auto rounded-xl bg-default-100 p-4 text-sm font-mono">
            {snippet.code}
          </pre>
          <p className="text-sm text-gray-500">{snippet.notes}</p>
          <div className="flex justify-between mt-2">
            <Button onPress={() => setIsEditing(true)} variant="outline">
              <FaEdit /> Edit
            </Button>
            <Button onPress={() => onDelete(snippet.id)} variant="outline">
              <FaTrash /> Delete
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
};

export default SnippetItem;