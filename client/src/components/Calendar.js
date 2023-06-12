import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const containerStyles =
  'bg-gradient-to-r from-green-900 to-teal-200 min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8';
const calendarContainerStyles = 'mb-4 rounded-lg overflow-hidden';
const inputStyles =
  'px-2 py-1 mr-2 border border-gray-300 rounded';
const buttonStyles =
  'px-4 py-2 text-white bg-green-800 rounded hover:bg-blue-600';

const calendarTileStyles = {
  background: 'none',
  color: '#FFF',
};

const calendarActiveTileStyles = {
  background: 'none',
  color: '#FFF',
  boxShadow: 'none',
};

const MyCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [note, setNote] = useState('');
  const [notes, setNotes] = useState({});
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [selectedNoteIndex, setSelectedNoteIndex] = useState(null);
  const [selectedNoteDate, setSelectedNoteDate] = useState('');

  useEffect(() => {
    // Retrieve notes from local storage on component mount
    const storedNotes = localStorage.getItem('notes');
    if (storedNotes) {
      setNotes(JSON.parse(storedNotes));
    }
  }, []);

  useEffect(() => {
    // Update local storage whenever notes change
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setSelectedNoteDate(date.toISOString().split('T')[0]); // Update selectedNoteDate
  };

  const handleNoteChange = (event) => {
    setNote(event.target.value);
  };

  const handleAddNote = () => {
    // Create a copy of the notes object
    const newNotes = { ...notes };

    // Create a copy of the notes array for the selected date
    const selectedDateNotes = newNotes[selectedNoteDate] || [];

    // Add the new note to the array
    selectedDateNotes.push(note);

    // Update the notes object with the updated array
    newNotes[selectedNoteDate] = selectedDateNotes;

    // Update the notes state
    setNotes(newNotes);

    // Reset the note input
    setNote('');
  };

  const handleDeleteNote = () => {
    // Create a copy of the notes object
    const newNotes = { ...notes };

    // Get the note array for the selected date
    const selectedDateNotes = newNotes[selectedNoteDate];

    // Check if the note array exists and if the note index is valid
    if (selectedDateNotes && selectedNoteIndex !== null && selectedNoteIndex < selectedDateNotes.length) {
      // Remove the note from the array
      selectedDateNotes.splice(selectedNoteIndex, 1);

      // Update the notes object with the updated array
      newNotes[selectedNoteDate] = selectedDateNotes;

      // Delete the entire card if there are no more notes for the date
      if (selectedDateNotes.length === 0) {
        delete newNotes[selectedNoteDate];
      }

      // Update the notes state
      setNotes(newNotes);

      // Reset the selected note index and date
      setSelectedNoteIndex(null);
      setSelectedNoteDate('');

      // Close the delete confirmation popup
      setShowDeleteConfirmation(false);

      // Remove the notes from localStorage
      localStorage.removeItem('notes');
    }
  };

  const handleDeleteConfirmation = (date, noteIndex) => {
    setSelectedNoteIndex(noteIndex);
    setSelectedNoteDate(date);
    setShowDeleteConfirmation(true);
  };

  const handleCancelDelete = () => {
    setSelectedNoteIndex(null);
    setSelectedNoteDate('');
    setShowDeleteConfirmation(false);
  };

  const tileContent = ({ date }) => {
    const formattedDate = date.toISOString().split('T')[0];
    return notes[formattedDate] ? <span>{notes[formattedDate].join(', ')}</span> : null;
  };

  return (
    <div className={containerStyles}>
      <div className="flex flex-col items-center">
        <div className={calendarContainerStyles}>
          <Calendar
            onChange={handleDateChange}
            value={selectedDate}
            calendarType="US"
            tileClassName={() => 'rounded-lg'}
            tileContent={tileContent}
            tileStyle={calendarTileStyles}
            activeStartDate={selectedDate}
            activeTileClassName={() => 'rounded-lg bg-green-500'}
            activeTileStyle={calendarActiveTileStyles}
          />
        </div>
        <div className="flex">
          <input
            type="text"
            value={note}
            onChange={handleNoteChange}
            placeholder="Enter note"
            className={inputStyles}
          />
          <button onClick={handleAddNote} className={buttonStyles}>
            Add Note
          </button>
        </div>
        <div className="mt-4">
          <div className="space-y-4">
            {Object.entries(notes).map(([date, noteList]) => (
              <div key={date} className="border border-gray-300 rounded p-4 bg-white">
                <h3 className="text-lg font-semibold">{date}</h3>
                <ul>
                  {noteList.map((note, index) => (
                    <li key={index}>
                      {note}
                      <button
                        onClick={() => handleDeleteConfirmation(date, index)}
                        className={buttonStyles + ' ml-2'}
                      >
                        Delete
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
      {showDeleteConfirmation && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white rounded-lg p-4">
            <p className="mb-2">Are you sure you want to delete this note?</p>
            <div className="flex justify-end">
              <button onClick={handleDeleteNote} className={buttonStyles}>
                Delete
              </button>
              <button onClick={handleCancelDelete} className="px-4 py-2 text-gray-700 rounded ml-2">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyCalendar;
