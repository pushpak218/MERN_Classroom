import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StudentTable from './StudentTable'; 

import './StudentDashboard.css'; // Import the CSS

const StudentDashboard = () => {
  const [students, setStudents] = useState([]);
  const [classroomTimetable, setClassroomTimetable] = useState([]);

  useEffect(() => {
    // Fetch students and classroom timetable
  //  axios.get('/api/users/classroom-students').then(res => setStudents(res.data));
  //  axios.get('/api/classrooms/timetable').then(res => setClassroomTimetable(res.data));
  }, []);

  return (
    <div className="container">
      <h1>Student Dashboard</h1>
   
      <StudentTable students={students} />
      <h2>Your Classroom Timetable</h2>
      {/* Display timetable */}
    </div>
  );
};

export default StudentDashboard;
