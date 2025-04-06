import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";
import "./Attendance.css";
import Logo from "./logo.png";

const socket = io("http://localhost:5066"); // Socket.IO connection

const Attendance = () => {
  const [students, setStudents] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const rowRefs = useRef([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  // ✅ Fetch student submission data from backend
  const fetchStudentData = async () => {
    try {
      const res = await fetch("http://localhost:5066/api/daily/today");
      const data = await res.json();

      const formattedData = data.map((submission) => {
        const meals = submission.meals || {};
        return {
          name: submission.studentName,
          id: submission.studentId,
          meals: [
            meals.breakfast ?? null,
            meals.lunch ?? null,
            meals.highTea ?? null,
            meals.dinner ?? null,
          ],
        };
      });

      setStudents(formattedData);
    } catch (error) {
      console.error("Error fetching student submissions:", error);
    }
  };

  useEffect(() => {
    fetchStudentData(); // Initial fetch

    // ✅ Listen for real-time form submission updates
    socket.on("formSubmitted", () => {
      console.log("📡 New form submitted, updating table...");
      fetchStudentData();
    });

    return () => {
      socket.off("formSubmitted");
    };
  }, []);

  const toggleMeal = (studentIndex, mealIndex) => {
    if (!isEditing) return;

    setStudents((prevStudents) =>
      prevStudents.map((student, index) => {
        if (index === studentIndex) {
          let newMeals = [...student.meals];

          if (newMeals[mealIndex] === true) {
            newMeals[mealIndex] = false;
          } else if (newMeals[mealIndex] === null) {
            newMeals[mealIndex] = "late";
          } else if (newMeals[mealIndex] === "late") {
            newMeals[mealIndex] = null;
          } else {
            newMeals[mealIndex] = true;
          }

          const crossCount = newMeals.filter((meal) => meal === false).length;
          if (crossCount === 3) {
            alert(`⚠️ Warning: ${student.name} has missed 3 meals!`);
          }

          return { ...student, meals: newMeals };
        }
        return student;
      })
    );
  };

  const handleSearch = () => {
    const index = students.findIndex(
      (student) =>
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.id.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (index !== -1) {
      rowRefs.current[index]?.scrollIntoView({ behavior: "smooth", block: "center" });

      setTimeout(() => {
        rowRefs.current[index]?.classList.add("Att_highlight");
        setTimeout(() => {
          rowRefs.current[index]?.classList.remove("Att_highlight");
        }, 2000);
      }, 200);
    } else {
      alert("No matching student found!");
    }

    setSearchTerm("");
  };

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const navigateTo = (path) => {
    navigate(path);
    setMenuOpen(false);
  };


  const saveUpdatedDataToBackend = async () => {
    console.log("🔧 Save function triggered"); // Add this
  
    const presentStudents = students.filter((student) =>
      student.meals.some((meal) => meal === true || meal === "late")
    );
  
    console.log("🧑‍🎓 Students to update:", presentStudents); // Check this too
  
    try {
      const response = await fetch("http://localhost:5066/api/attendance/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ students: presentStudents }),
      });
  
      const result = await response.json();
  
      if (response.ok) {
        alert("✅ Attendance saved successfully!");
      } else {
        alert(`❌ Failed to save: ${result.message}`);
      }
    } catch (error) {
      console.error("Error saving attendance:", error);
      alert("⚠️ Something went wrong while saving attendance!");
    }
  };
  
  return (
    <div className="Att_container">
      <div className="Att_menu-container">
      <button
  className="Att_edit-btn"
  onClick={() => {
    if (isEditing) {
      // If already editing and user clicks "Save"
      saveUpdatedDataToBackend(); // ✅ Call the save function
    }
    setIsEditing((prev) => !prev); // Toggle editing state
  }}
>
  {isEditing ? "Save" : "Edit"}
</button>

      </div>

      <div className={`Att_menu-overlay ${menuOpen ? "open" : ""}`}>
        <button onClick={() => navigateTo("/dashboard")}>Dashboard</button>
        <button onClick={() => navigateTo("/monthly_report")}>Monthly Report</button>
        <button onClick={() => navigateTo("/occupational_meal")}>Occupational Meal</button>
        <button onClick={() => navigateTo("/form")}>Form</button>
        <button onClick={() => navigateTo("/logout")}>Logout</button>
        <button onClick={() => navigateTo("/my_profile")}>My Profile</button>
        <button onClick={() => navigateTo("/why_fff")}>Why FFF</button>
      </div>

      <div className="Att_Main_Header">
        <div className={`Att_fixed-header ${menuOpen ? "hidden" : ""}`}>
          <div className="Att_shape">
            <svg className="svg1" viewBox="0 0 100 50" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0,0 H100 V35 L50,50 L0,35 Z" fill="rgba(26,25,25,1)" />
            </svg>
          </div>
          <div className="Att_header-content">
            <img src={Logo} alt="FFF Logo" className="Att_logo" />
            <h1 className="Att_header-text">Futility Food Fix</h1>
          </div>
        </div>
      </div>

      <div className="Att_header-container">
        <div className="Att_header-content-column">
          <h2 className="Att_h2">Hostel Meal Attendance</h2>
          <div className="Att_edit-search-container">
            <button className="Att_edit-btn" onClick={() => {
               if (isEditing) {
                saveUpdatedDataToBackend(); // ✅ Call the save function
                }
                setIsEditing((prev) => !prev); // Toggle editing state
               }}
                >
             {isEditing ? "Save" : "Edit"}
            </button>
            
            <input
              type="text"
              style={{ fontSize: "14px", width: "190px" }}
              placeholder="Search by Name or ID"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="Att_search-input"
            />
          </div>
        </div>
      </div>

      <div className="Att_table-container">
        <table className="Att_table">
          <thead>
            <tr>
              <th>Name</th>
              <th>ID</th>
              <th>Breakfast</th>
              <th>Lunch</th>
              <th>High Tea</th>
              <th>Dinner</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr key={student.id} ref={(el) => (rowRefs.current[index] = el)}>
                <td>{student.name}</td>
                <td>{student.id}</td>
                {student.meals.map((meal, mealIndex) => (
                  <td
                    key={mealIndex}
                    className="Att_meal-cell"
                    onClick={() => toggleMeal(index, mealIndex)}
                  >
                    {meal === true ? "✅" : meal === false ? "❌" : meal === "late" ? "🔴" : ""}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Attendance;
