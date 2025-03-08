import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./Attendance.css";
import Logo from "./logo.png"; // Ensure the logo path is correct

const Attendance = () => {
  const [students, setStudents] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const rowRefs = useRef([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchedData = [];
    for (let room = 101; room <= 105; room++) {
      for (let i = 1; i <= 4; i++) {
        fetchedData.push({
          roomNo: room,
          name: `Student ${room}-${i}`,
          id: `S${room}${i}`,
          meals: [
            Math.random() > 0.5 ? true : null,
            Math.random() > 0.5 ? true : null,
            Math.random() > 0.5 ? true : null,
            Math.random() > 0.5 ? true : null,
          ],
        });
      }
    }
    setStudents(fetchedData);
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
        rowRefs.current[index]?.classList.add("highlight");
        setTimeout(() => {
          rowRefs.current[index]?.classList.remove("highlight");
        }, 2000);
      }, 200);
    } else {
      alert("No matching student found!");
    }
  
    // Clear the search bar
    setSearchTerm("");
  };

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);

  };

  const navigateTo = (path) => {
    navigate(path);
    setMenuOpen(false); // Close menu after navigation
  };

  return (
    <div className="container">
      {/* Menu Section */}
      <div className="menu-container">
        <button className="menu-button" onClick={toggleMenu}>
          &#9776;
        </button>
      </div>

      <div className={`menu-overlay ${menuOpen ? "open" : ""}`}>
        <button onClick={() => navigateTo("/dashboard")}>Dashboard</button>
        <button onClick={() => navigateTo("/monthly_report")}>Monthly Report</button>
        <button onClick={() => navigateTo("/occupational_meal")}>Occupational Meal</button>
        <button onClick={() => navigateTo("/form")}>Form</button>
        <button onClick={() => navigateTo("/logout")}>Logout</button>
        <button onClick={() => navigateTo("/my_profile")}>My Profile</button>
        <button onClick={() => navigateTo("/why_fff")}>Why FFF</button>
      </div>


      {/* Header Section */}
      <div className="Main_Header">
        <div className={`fixed-header ${menuOpen ? "hidden" : ""}`}>
          <div className="shape">
            <svg viewBox="0 0 100 50" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0,0 H100 V35 L50,50 L0,35 Z" fill="rgba(26,25,25,1)" />
            </svg>
          </div>
          <div className="header-content">
            <img src={Logo} alt="FFF Logo" className="logo" />
            <h1 className="header-text">Futility Food Fix</h1>
          </div>
        </div>
      </div>

      <div className="header-container">
        <div className="header-content-column">
          <h2>Hostel Meal Attendance</h2>
          <div className="edit-search-container">
            <button className="edit-btn" onClick={() => setIsEditing(!isEditing)}>
              {isEditing ? "Save" : "Edit"}
            </button>
            <input
              type="text"
              placeholder="Search by Name or ID"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="search-input"
            />
          </div>
        </div>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Room No</th>
              <th>Name</th>
              <th>ID</th>
              <th>Breakfast</th>
              <th>Lunch</th>
              <th>High Tea</th>
              <th>Dinner</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => {
              const isFirstInRoom =
                index === 0 || students[index - 1].roomNo !== student.roomNo;
              return (
                <tr key={student.id} ref={(el) => (rowRefs.current[index] = el)}>
                  {isFirstInRoom && (
                    <td rowSpan={4} className="room-cell">
                      {student.roomNo}
                    </td>
                  )}
                  <td>{student.name}</td>
                  <td>{student.id}</td>
                  {student.meals.map((meal, mealIndex) => (
                    <td
                      key={mealIndex}
                      className="meal-cell"
                      onClick={() => toggleMeal(index, mealIndex)}
                    >
                      {meal === true ? "✅" : meal === false ? "❌" : meal === "late" ? "🔴" : ""}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Attendance;
