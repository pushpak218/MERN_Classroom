import React, { useState } from 'react';
import './ClassroomForm.css'; // Import the CSS

const ClassroomForm = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [days, setDays] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, startTime, endTime, days: days.split(',') });
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Classroom Name"
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
        placeholder="End Time (e.g., 18:00)"
        required
      />
      <input
        type="text"
        value={days}
        onChange={(e) => setDays(e.target.value)}
        placeholder="Days (comma separated, e.g., Monday, Tuesday)"
        required
      />
      <button type="submit">Create Classroom</button>
    </form>
  );
};

export default ClassroomForm;
