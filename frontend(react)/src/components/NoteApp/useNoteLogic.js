import { useMemo, useState } from "react";
import { useLocalStorage } from "../../hooks/useLocalStorage";

export const useNoteLogic = () => {
  const [notes, setNotes] = useLocalStorage("notes", []);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingNote, setEditingNote] = useState(null);
  const [newNote, setNewNote] = useState({ title: "", content: "" });

  // Filter notes based on search term
  const filteredNotes = useMemo (() => {
    if (!searchTerm.trim()) return notes;

    return notes.filter(
      (note) =>
        note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        note.content.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [notes, searchTerm]);

  // Create a new note
  const handleCreateNote = (e) => {
    e.preventDefault();
    if (!newNote.title.trim() || !newNote.content.trim()) return;

    const note = {
      id: Date.now(),
      title: newNote.title.trim(),
      content: newNote.content.trim(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setNotes((prevNotes) => [note, ...prevNotes]);
    setNewNote({ title: "", content: "" });
  };

  // Update an existing note
  const handleUpdateNote = (e) => {
    e.preventDefault();
    if (!editingNote.title.trim() || !editingNote.content.trim()) return;

    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === editingNote.id
          ? { ...editingNote, updatedAt: new Date().toISOString() }
          : note
      )
    );
    setEditingNote(null);
  };

  // Delete a note
  const handleDeleteNote = (noteId) => {
    if (window.confirm("Are you sure you want to delete this note?")) {
      setNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteId));
    }
  };

  // Start editing a note
  const handleEditNote = (note) => {
    setEditingNote({ ...note });
  };

  // Cancel editing
  const handleCancelEdit = () => {
    setEditingNote(null);
  };

  // Format date for display
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return {
    notes,
    searchTerm,
    setSearchTerm,
    editingNote,
    setEditingNote,
    newNote,
    setNewNote,
    filteredNotes,
    handleCreateNote,
    handleUpdateNote,
    handleDeleteNote,
    handleEditNote,
    handleCancelEdit,
    formatDate,
  };
};
