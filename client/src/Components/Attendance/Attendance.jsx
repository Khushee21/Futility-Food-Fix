import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./Attendance.css";
import Logo from "./logo.png";

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

  return (
    <div className="Att_container">
      <div className="Att_menu-container">
        <button className="Att_menu-button" onClick={toggleMenu}>
          &#9776;
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
            <button className="Att_edit-btn" onClick={() => setIsEditing(!isEditing)}>
              {isEditing ? "Save" : "Edit"}
            </button>
            <input
              type="text"
              style={{fontSize:"14px" ,width:"190px"}}
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
                    <td rowSpan={4} className="Att_room-cell">
                      {student.roomNo}
                    </td>
                  )}
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
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Attendance;