import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ClassroomForm from './ClassroomForm';
import StudentTable from './StudentTable';
import TeacherList from './TeacherList';
import './PrincipalDashboard.css'; // Import the CSS

const PrincipalDashboard = () => {
  const [teachers, setTeachers] = useState([]);
  const [students, setStudents] = useState([]);
  const [classrooms, setClassrooms] = useState([]);

  useEffect(() => {
    // Fetch teachers, students, and classrooms
  // axios.get('/api/teachers/teacher').then(res => setTeachers(res.data));
  // axios.get('/api/students/student').then(res => setStudents(res.data));
 //axios.get('/api/classrooms/classroom').then(res => setClassrooms(res.data));
  }, []);

  const handleCreateClassroom = async (classroomData) => {
    await axios.post('/api/classrooms/create', classroomData);
    // Refresh classroom list
    const res = await axios.get('/api/classrooms');
    setClassrooms(res.data);
  };

  return (
    <div className="container">
      <h1>Principal Dashboard</h1>
      <ClassroomForm onSubmit={handleCreateClassroom} />
      <StudentTable students={students} />
      <TeacherList teachers={teachers} />
      
      {/* Add functionality for managing teachers and classrooms */}
    </div>
  );
};

export default PrincipalDashboard;
