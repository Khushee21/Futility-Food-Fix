import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Rep.css'; // Import CSS

const Rep = () => {
  const [students, setStudents] = useState([]);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:5066/api/rep/students')
      .then(response => {
        setStudents(response.data.data);
      })
      .catch(error => {
        console.error('Error fetching students: ', error);
        setError('Failed to fetch students');
      });
  }, []);

  const handleViewReport = (studentId) => {
    navigate(`/monthly-report/${studentId}`);
  };

  const handleClose = () => {
    navigate('/WDash'); // Change this path to your actual route
  };

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="rep-container">
      <div className="header-row">
        <h1 className="rep-heading">📋 Student List</h1>
        <button className="close-btn" onClick={handleClose}>✖</button>
      </div>

      <input
        type="text"
        placeholder="Search by name or ID..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />

      {error && <p className="error-message">{error}</p>}

      <table className="student-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredStudents.length > 0 ? (
            filteredStudents.map(student => (
              <tr key={student.id}>
                <td>{student.id}</td>
                <td>{student.name}</td>
                <td>
                  <button onClick={() => handleViewReport(student._id)} className="view-btn">
                    View Report
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="no-data">No students found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Rep;
