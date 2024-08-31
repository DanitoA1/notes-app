import React from "react";

interface Note {
  id: string;
  title: string;
  text: string;
  color: string;
  timestamp: string;
}

interface NotesGridProps {
  notes: Note[];
  onEdit: (index: number) => void;
  onDelete: (index: number) => void;
}

const NotesGrid: React.FC<NotesGridProps> = ({ notes, onEdit, onDelete }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {notes.map((note, index) => (
        <div
          key={note.id}
          className={`p-4 rounded-lg shadow-lg flex flex-col justify-between ${note.color}`}
        >
          <div className="mb-4">
            <h3 className="text-lg font-bold text-black">{note.title}</h3>
            <p className="text-black">{note.text}</p>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-500 text-sm mt-2">{note.timestamp}</span>
            <div className="flex gap-2">
              <button
                onClick={() => onEdit(index)}
                className="text-gray-600 hover:text-blue-600"
              >
                <i className="fas fa-edit"></i>
              </button>
              <button
                onClick={() => onDelete(index)}
                className="text-gray-600 hover:text-red-600"
              >
                <i className="fas fa-trash"></i>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NotesGrid;
