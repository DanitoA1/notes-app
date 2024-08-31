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
  const [editNoteId, setEditNoteId] = useState<string | null>(null);
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedColor, setSelectedColor] = useState<string>("");

  const handleAddNote = (note: Note) => {
    setNotes([...notes, note]);
  };

  const handleEditNote = (note: Note) => {
    setNotes(notes.map((n) => (n.id === note.id ? note : n)));
  };

  const editNote = (id: string) => {
    setEditNoteId(id);
    setIsEditMode(true);
    setIsModalOpen(true);
  };

  const deleteNote = (id: string) => {
    setNotes(notes.filter((n) => n.id !== id));
  };

  const handleSave = (note: Note) => {
    if (isEditMode && editNoteId) {
      handleEditNote(note);
    } else {
      handleAddNote(note);
    }
    setIsEditMode(false);
    setEditNoteId(null);
  };

  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
  };

  const filteredNotes = selectedColor
    ? notes.filter((note) => note.color === selectedColor)
    : notes;

  return (
    <div className="min-h-screen bg-white flex">
      <SideNav onColorSelect={handleColorSelect} />
      <div className="flex-1 p-6">
        <Header />
        <div className="flex space-x-4 mb-6">
          <a href="#" className="text-gray-700 hover:text-black">
            Filter by Date
          </a>
          <a href="#" className="text-gray-700 hover:text-black">
            Archive
          </a>
        </div>
        <NotesGrid
          notes={filteredNotes}
          onEdit={editNote}
          onDelete={deleteNote}
        />
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
          note={
            isEditMode && editNoteId
              ? notes.find((n) => n.id === editNoteId)
              : undefined
          }
          isEditMode={isEditMode}
          editIndex={editNoteId || undefined}
        />
      </div>
    </div>
  );
}
