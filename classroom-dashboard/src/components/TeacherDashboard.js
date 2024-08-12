import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TimetableForm from './TimetableForm';
import StudentTable from './StudentTable';
import './TeacherDashboard.css'; // Import the CSS

const TeacherDashboard = () => {
  const [students, setStudents] = useState([]);
  const [classroom, setClassroom] = useState(null);

  useEffect(() => {
    // Fetch students and classroom info
    axios.get('/api/users/students').then(res => setStudents(res.data));
    axios.get('/api/classrooms/teacher-classroom').then(res => setClassroom(res.data));
  }, []);

  const handleCreateTimetable = async (timetableData) => {
  //  await axios.post('/api/classrooms/timetable', timetableData);
    // Refresh timetable info
  //  const res = await axios.get('/api/classrooms/teacher-classroom');
   // setClassroom(res.data);
  };

  return (
    <div className="container">
      <h1>Teacher Dashboard</h1>
      <h2>Students in your classroom</h2>
      <StudentTable students={students} />
      <TimetableForm onSubmit={handleCreateTimetable} />
    </div>
  );
};

export default TeacherDashboard;
