import React from 'react';
import './StudentTable.css'; // Import the CSS

const StudentTable = ({ students }) => (

<div>
<h2>Student List</h2>
  <table className="student-table">
    <thead>
      <tr>
        <th>Name</th>
        <th>Email</th>
      </tr>
    </thead>
    <tbody>
      {students.map(student => (
        <tr key={student._id}>
          <td>{student.name}</td>
          <td>{student.email}</td>
        </tr>
      ))}
    </tbody>
  </table>
  </div>
);

export default StudentTable;
