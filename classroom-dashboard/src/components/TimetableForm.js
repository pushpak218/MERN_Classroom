import React, { useState } from 'react';
import './TimetableForm.css'; // Import the CSS

const TimetableForm = ({ onSubmit }) => {
  const [subject, setSubject] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ subject, startTime, endTime });
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <input
        type="text"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        placeholder="Subject"
        required
      />
      <input
        type="text"
        value={startTime}
        onChange={(e) => setStartTime(e.target.value)}
        placeholder="Start Time (e.g., 12:00)"
        required
      />
      <input
        type="text"
        value={endTime}
        onChange={(e) => setEndTime(e.target.value)}
        placeholder="End Time (e.g., 14:00)"
        required
      />
      <button type="submit">Create Timetable</button>
    </form>
  );
};

export default TimetableForm;
