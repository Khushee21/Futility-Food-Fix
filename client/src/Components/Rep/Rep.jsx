import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Rep = () => {
  const [students, setStudents] = useState([]);
  const [error, setError] = useState(null);
  const navigate= useNavigate();

  useEffect(() => {
    // Adjust the URL to match your backend API
    axios.get('http://localhost:5066/api/rep/students')  // Use your backend port here
      .then(response => {
        setStudents(response.data.data);  // Assuming data contains the list of students
      })
      .catch(error => {
        console.error('Error fetching students: ', error);
        setError('Failed to fetch students');
      });
  }, []);

  const handleViewReport = (studentId)=>{
    navigate(`/monthly-report/${studentId}`)
  }

  return (
    <div>
      <h1>Student List</h1>
      {error && <p>{error}</p>}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {students.map(student => (
            <tr key={student.id}>
              <td>{student.id}</td>
              <td>{student.name}</td>
              <td>
                <button onClick={()=> handleViewReport(student.id)} >View Report</button>  {/* Add your logic here */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Rep;