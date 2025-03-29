<<<<<<< HEAD
 import React, { useEffect, useState } from "react";
=======
import React, { useEffect, useState } from "react";
>>>>>>> 73320cea2ac5a8f62bddc9736b75e39298181087
import "./StudentProfile.css";


const StudentProfile = () => {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const studentId = localStorage.getItem("studentId");// Replace with the logged-in student's ID

  useEffect(() => {
    // Fetch student data from the backend
    const fetchStudentData = async () => {
      try {
        const response = await fetch(`http://localhost:5066/api/student/${studentId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch student data");
        }
        const data = await response.json();
        if (data.success) {
          setStudent(data.data);
        } else {
          setError(data.message);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStudentData();
  }, [studentId]);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="student-profile">
      
      <div className="student-data">
        <p>
          <strong>ID:</strong> <span>{student.id}</span>
        </p>
        <p>
          <strong>Name:</strong> <span>{student.name}</span>
        </p>
        <p>
          <strong>Degree:</strong> <span>{student.degree}</span>
        </p>
        <p>
          <strong>Email:</strong> <span>{student.email}</span>
        </p>
        <p>
          <strong>Parent Email:</strong> <span>{student.parentEmail}</span>
        </p>
      </div>
    </div>
  );
};

export default StudentProfile;