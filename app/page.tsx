"use client";
import React, { useState } from "react";
import SideNav from "../components/SideNav";
import Header from "../components/Header";
import NoteModal from "../components/NoteModal";
import NotesGrid from "../components/NotesGrid";
import "@fortawesome/fontawesome-free/css/all.min.css";

interface Note {
  id: string;
  title: string;
  text: string;
  color: string;
  timestamp: string;
}

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [notes, setNotes] = useState<Note[]>([]);

  const handleAddNote = (note: Note) => {
    setNotes([...notes, note]);
  };

  const handleEditNote = (note: Note, index?: number) => {
    if (index !== undefined && index !== null) {
      const newNotes = [...notes];
      newNotes[index] = note;
      setNotes(newNotes);
    }
  };

  const editNote = (index: number) => {
    setEditIndex(index);
    setIsEditMode(true);
    setIsModalOpen(true);
  };

  const deleteNote = (index: number) => {
    setNotes(notes.filter((_, i) => i !== index));
  };

  const handleSave = (note: Note, index?: number) => {
    if (isEditMode && index !== undefined) {
      handleEditNote(note, index);
    } else {
      handleAddNote(note);
    }
    setIsEditMode(false);
    setEditIndex(null);
  };

  return (
    <div className="min-h-screen bg-white flex">
      <SideNav />
      <div className="flex-1 p-6">
        <Header />
        <div className="flex space-x-4 mb-6">
          <a href="#" className="text-gray-700 hover:text-black">
            Home
          </a>
          <a href="#" className="text-gray-700 hover:text-black">
            Filter by Color
          </a>
          <a href="#" className="text-gray-700 hover:text-black">
            Filter by Date
          </a>
          <a href="#" className="text-gray-700 hover:text-black">
            Archive
          </a>
        </div>
        <NotesGrid notes={notes} onEdit={editNote} onDelete={deleteNote} />
        <button
          onClick={() => {
            setIsEditMode(false);
            setIsModalOpen(true);
          }}
          className="fixed bottom-8 right-8 bg-black text-white p-4 rounded-full shadow-lg"
        >
          +
        </button>
        <NoteModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
          note={isEditMode && editIndex !== null ? notes[editIndex] : undefined}
          isEditMode={isEditMode}
          editIndex={editIndex || undefined}
        />
      </div>
    </div>
  );
}
