"use client";
import React, { useState, useEffect } from "react";
import SideNav from "../components/SideNav";
import Header from "../components/Header";
import NoteModal from "../components/NoteModal";
import NotesGrid from "../components/NotesGrid";
import {
  getNotes,
  createNote,
  updateNote,
  deleteNote,
} from "../utils/api/notes";

import "@fortawesome/fontawesome-free/css/all.min.css";
import { Note } from "@/types/notes";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [editId, setEditId] = useState<string | undefined>(undefined);
  const [notes, setNotes] = useState<
    {
      id: string;
      title: string;
      text: string;
      color: string;
      timestamp: string;
    }[]
  >([]);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  useEffect(() => {
    async function fetchNotes() {
      try {
        const notes = await getNotes();
        setNotes(notes);
      } catch (error) {
        console.error("Failed to fetch notes:", error);
      }
    }
    fetchNotes();
  }, []);

  const handleAddNote = async (note: {
    title: string;
    text: string;
    color: string;
  }) => {
    try {
      const newNote = await createNote(note);
      setNotes([...notes, newNote]);
    } catch (error) {
      console.error("Failed to create note:", error);
    }
  };

  const handleEditNote = async (
    note: { title: string; text: string; color: string },
    id: string
  ) => {
    try {
      const updatedNote = await updateNote(id, note);
      setNotes(notes.map((n) => (n.id === id ? updatedNote : n)));
    } catch (error) {
      console.error("Failed to update note:", error);
    }
  };

  const handleDeleteNote = async (id: string) => {
    try {
      await deleteNote(id);
      setNotes(notes.filter((n) => n.id !== id));
    } catch (error) {
      console.error("Failed to delete note:", error);
    }
  };

  const editNote = (id: string) => {
    setEditId(id);
    setIsEditMode(true);
    setIsModalOpen(true);
  };

  const filterNotesByColor = (color: string | null) => {
    setSelectedColor(color);
  };

  const filteredNotes = selectedColor
    ? notes.filter((note) => note.color === selectedColor)
    : notes;

  const handleSearch = (searchedNotes: Note[]) => {
    setNotes(searchedNotes);
  };

  return (
    <div className="min-h-screen bg-white flex">
      <SideNav filterNotesByColor={filterNotesByColor} />
      <div className="flex-1 p-6">
        <Header onSearch={handleSearch} />
        <NotesGrid
          notes={filteredNotes}
          onEdit={editNote}
          onDelete={handleDeleteNote}
        />
        <button
          onClick={() => {
            setIsEditMode(false);
            setEditId(undefined);
            setIsModalOpen(true);
          }}
          className="fixed bottom-8 right-8 bg-black text-white p-4 rounded-full shadow-lg"
        >
          +
        </button>
        <NoteModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={(note) => {
            if (isEditMode && editId) {
              handleEditNote(note, editId);
            } else {
              handleAddNote(note);
            }
            setIsEditMode(false);
            setEditId(undefined);
          }}
          note={
            isEditMode && editId
              ? notes.find((n) => n.id === editId)
              : undefined
          }
          isEditMode={isEditMode}
          editId={editId}
        />
      </div>
    </div>
  );
}
