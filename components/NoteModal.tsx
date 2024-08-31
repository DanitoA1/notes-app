import React, { useState, useEffect } from "react";

interface NoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (
    note: {
      id: string;
      title: string;
      text: string;
      color: string;
      timestamp: string;
    },
    index?: string
  ) => void;
  note?: {
    id: string;
    title: string;
    text: string;
    color: string;
    timestamp: string;
  };
  isEditMode?: boolean;
  editIndex?: string;
}

const NoteModal: React.FC<NoteModalProps> = ({
  isOpen,
  onClose,
  onSave,
  note,
  isEditMode = false,
  editIndex,
}) => {
  const [noteTitle, setNoteTitle] = useState<string>("");
  const [noteText, setNoteText] = useState<string>("");
  const [noteColor, setNoteColor] = useState<string>("bg-orange-400");

  useEffect(() => {
    if (note && isEditMode) {
      setNoteTitle(note.title);
      setNoteText(note.text);
      setNoteColor(note.color);
    }
  }, [note, isEditMode]);

  const handleSave = () => {
    if (noteTitle.trim() && noteText.trim()) {
      const timestamp = new Date().toLocaleString();
      onSave(
        {
          id: note?.id || Date.now().toString(),
          title: noteTitle,
          text: noteText,
          color: noteColor,
          timestamp,
        },
        editIndex
      );
      setNoteTitle("");
      setNoteText("");
      setNoteColor("bg-orange-400");
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-semibold mb-4">
          {isEditMode ? "Edit Note" : "Create a Note"}
        </h2>
        <input
          className="w-full text-black p-2 border rounded mb-4"
          placeholder="Enter note title"
          value={noteTitle}
          onChange={(e) => setNoteTitle(e.target.value)}
        />
        <textarea
          className="w-full text-black p-2 border rounded mb-4"
          rows={4}
          placeholder="Enter your note here..."
          value={noteText}
          onChange={(e) => setNoteText(e.target.value)}
        ></textarea>
        <div className="flex space-x-2 mb-4">
          <button
            className={`w-6 h-6 rounded-full bg-orange-400 ${
              noteColor === "bg-orange-400" ? "ring-2 ring-black" : ""
            }`}
            onClick={() => setNoteColor("bg-orange-400")}
          ></button>
          <button
            className={`w-6 h-6 rounded-full bg-purple-400 ${
              noteColor === "bg-purple-400" ? "ring-2 ring-black" : ""
            }`}
            onClick={() => setNoteColor("bg-purple-400")}
          ></button>
          <button
            className={`w-6 h-6 rounded-full bg-blue-400 ${
              noteColor === "bg-blue-400" ? "ring-2 ring-black" : ""
            }`}
            onClick={() => setNoteColor("bg-blue-400")}
          ></button>
          <button
            className={`w-6 h-6 rounded-full bg-green-400 ${
              noteColor === "bg-green-400" ? "ring-2 ring-black" : ""
            }`}
            onClick={() => setNoteColor("bg-green-400")}
          ></button>
          <button
            className={`w-6 h-6 rounded-full bg-yellow-400 ${
              noteColor === "bg-yellow-400" ? "ring-2 ring-black" : ""
            }`}
            onClick={() => setNoteColor("bg-yellow-400")}
          ></button>
        </div>
        <div className="flex justify-end space-x-2">
          <button className="px-4 py-2 bg-gray-400 rounded" onClick={onClose}>
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoteModal;
