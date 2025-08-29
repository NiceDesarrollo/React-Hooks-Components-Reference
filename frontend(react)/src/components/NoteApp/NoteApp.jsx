import React, {createContext, useContext } from "react";
import "./NoteApp.css";
import { useNoteLogic } from "./useNoteLogic";

// Create context for note-related state and handlers
const NoteContext = createContext();

// Custom hook to use note context
const useNoteContext = () => {
  const context = useContext(NoteContext);
  if (!context) {
    throw new Error('useNoteContext must be used within a NoteProvider');
  }
  return context;
};

const HeaderNote = () => {
  return (
    <header className="note-app-header">
      <h1>📝 Note App</h1>
      <p>Create, edit, and organize your notes with local storage</p>
    </header>
  );
};

const SearchBar = () => {
  const { searchTerm, setSearchTerm, filteredNotes } = useNoteContext();
  
  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Search notes..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />
      {searchTerm && (
        <span className="search-results">
          Found {filteredNotes.length} note
          {filteredNotes.length !== 1 ? "s" : ""}
        </span>
      )}
    </div>
  );
};

const CreateNoteForm = () => {
  const { newNote, setNewNote, handleCreateNote } = useNoteContext();
  
  return (
    <div className="create-note-section">
      <h2>Create New Note</h2>
      <form onSubmit={handleCreateNote} className="note-form">
        <input
          type="text"
          placeholder="Note title..."
          value={newNote.title}
          onChange={(e) =>
            setNewNote((prev) => ({ ...prev, title: e.target.value }))
          }
          className="note-title-input"
          maxLength={100}
        />
        <textarea
          placeholder="Write your note content here..."
          value={newNote.content}
          onChange={(e) =>
            setNewNote((prev) => ({ ...prev, content: e.target.value }))
          }
          className="note-content-input"
          rows={4}
          maxLength={1000}
        />
        <button type="submit" className="create-btn">
          Create Note
        </button>
      </form>
    </div>
  );
};

const NoteEditForm = () => {
  const { editingNote, setEditingNote, handleUpdateNote, handleCancelEdit } = useNoteContext();
  
  return (
    <form onSubmit={handleUpdateNote} className="edit-form">
      <input
        type="text"
        value={editingNote.title}
        onChange={(e) =>
          setEditingNote((prev) => ({
            ...prev,
            title: e.target.value,
          }))
        }
        className="edit-title-input"
        maxLength={100}
      />
      <textarea
        value={editingNote.content}
        onChange={(e) =>
          setEditingNote((prev) => ({
            ...prev,
            content: e.target.value,
          }))
        }
        className="edit-content-input"
        rows={4}
        maxLength={1000}
      />
      <div className="edit-actions">
        <button type="submit" className="save-btn">
          Save
        </button>
        <button
          type="button"
          onClick={handleCancelEdit}
          className="cancel-btn"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

const NoteDisplay = ({ note }) => {
  const { handleEditNote, handleDeleteNote, formatDate } = useNoteContext();
  
  return (
    <>
      <div className="note-header">
        <h3 className="note-title">{note.title}</h3>
        <div className="note-actions">
          <button
            onClick={() => handleEditNote(note)}
            className="edit-btn"
            title="Edit note"
          >
            ✏️
          </button>
          <button
            onClick={() => handleDeleteNote(note.id)}
            className="delete-btn"
            title="Delete note"
          >
            🗑️
          </button>
        </div>
      </div>
      <p className="note-content">{note.content}</p>
      <div className="note-footer">
        <small>Created: {formatDate(note.createdAt)}</small>
        {note.updatedAt !== note.createdAt && (
          <small>Updated: {formatDate(note.updatedAt)}</small>
        )}
      </div>
    </>
  );
};

const NoteCard = ({ note }) => {
  const { editingNote } = useNoteContext();
  
  return (
    <div className="note-card">
      {editingNote?.id === note.id ? (
        <NoteEditForm />
      ) : (
        <NoteDisplay note={note} />
      )}
    </div>
  );
};

const NotesList = () => {
  const { notes, filteredNotes, searchTerm } = useNoteContext();
  
  return (
    <div className="notes-section">
      <h2>Your Notes ({notes.length})</h2>
      {filteredNotes.length === 0 ? (
        <div className="no-notes">
          {searchTerm
            ? "No notes found matching your search."
            : "No notes yet. Create your first note!"}
        </div>
      ) : (
        <div className="notes-grid">
          {filteredNotes.map((note) => (
            <NoteCard key={note.id} note={note} />
          ))}
        </div>
      )}
    </div>
  );
};



const NoteApp = () => {
  const noteLogic = useNoteLogic();

  return (
    <NoteContext.Provider value={noteLogic}>
      <div className="note-app">
        <HeaderNote />
        <SearchBar />
        <CreateNoteForm />
        <NotesList />
      </div>
    </NoteContext.Provider>
  );
};

export default NoteApp;
