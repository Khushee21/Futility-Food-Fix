import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import { useNavigate } from "react-router-dom";
import "./Stud.css";

const Stud = () => {
  const navigate = useNavigate();
  const [selectedMeals, setSelectedMeals] = useState([]);
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [studentName, setStudentName] = useState("");
  const [studentId, setStudentId] = useState("");
  const [mealData, setMealData] = useState({});
  const [socket, setSocket] = useState(null);

  const groupMealData = (data) => ({
    Breakfast: data.Breakfast ? [data.Breakfast] : [],
    Lunch: [data.Lunch_Daal, data.Lunch_Sabji, data.Lunch_Chapati].filter(Boolean),
    High_Tea: data.High_Tea ? [data.High_Tea] : [],
    Dinner: [data.Dinner_Daal, data.Dinner_Sabji, data.Dinner_Chapati].filter(Boolean),
  });

  const fetchMealData = async () => {
    try {
      const response = await fetch(`http://localhost:5066/api/daily/meal-form/latest?t=${new Date().getTime()}`);
      if (!response.ok) {
        throw new Error("Meal data not found");
      }
      const data = await response.json();
      console.log("Fetched meal data from backend:", data);

      if (data.success) {
        setMealData(groupMealData(data.data));
      } else {
        alert("Failed to fetch meal data. Please try again.");
      }
    } catch (err) {
      alert("An error occurred while fetching meal data: " + err.message);
    }
  };

  useEffect(() => {
    fetchMealData();
  }, []);

  useEffect(() => {
    const newSocket = io("http://localhost:5066");
    setSocket(newSocket);

    newSocket.on("newMealForm", (data) => {
      setMealData(groupMealData(data.data));
      setSelectedMeals([]);
    });

    return () => {
      newSocket.off("newMealForm");
      newSocket.disconnect();
    };
  }, []);

  const handleMealSelection = (category, meal) => {
    console.log("Meal selected:", category, meal); // ✅ Debugging log
    setSelectedMeals((prevMeals) => {
      const selected = prevMeals.find((item) => item.category === category);
      let updatedMeals;
  
      if (selected) {
        const updatedItems = selected.items.includes(meal)
          ? selected.items.filter((item) => item !== meal)
          : [...selected.items, meal];
  
        updatedMeals = updatedItems.length > 0
          ? prevMeals.map((item) =>
              item.category === category ? { ...item, items: updatedItems } : item
            )
          : prevMeals.filter((item) => item.category !== category);
      } else {
        updatedMeals = [...prevMeals, { category, items: [meal] }];
      }
  
      console.log("Updated meal selections:", updatedMeals); // ✅ Debugging log
      return updatedMeals;
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
  
    if (!studentId || !studentName) {
      alert("Please fill in all student details.");
      return;
    }
  
    // Hardcode meal selections for testing
    const submissionData = {
      studentId,
      studentName,
      mealSelections: [
        { category: "Breakfast", items: ["Omelette"] },
        { category: "Lunch", items: ["Daal", "Sabji"] },
      ],
      myDate: date,
    };
  
    console.log("Sending data to backend:", JSON.stringify(submissionData, null, 2)); // ✅ Debugging log
  
    if (socket) {
      socket.emit("submitStudentForm", submissionData, (response) => {
        console.log("Server response:", response); // ✅ Debugging log
      });
    }
  };
  useEffect(() => {
    if (!socket) return;

    const handleFormSubmitted = (data) => {
      console.log("Form submission response:", data);
      if (data.success) {
        alert("Form submitted successfully!");
        navigate("/home");
      } else {
        alert("Submission failed! Try again.");
      }
    };

    socket.on("formSubmitted", handleFormSubmitted);

    return () => {
      socket.off("formSubmitted", handleFormSubmitted);
    };
  }, [socket, navigate]);

  return (
    <div className="container">
      <h1>Shree Shanta Sangam</h1>
      <form onSubmit={handleSubmit}>
        <div className="student-details">
          <label htmlFor="studentName">Student Name:</label>
          <input
            type="text"
            id="studentName"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            required
          />

          <label htmlFor="studentId">Student ID:</label>
          <input
            type="text"
            id="studentId"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            required
          />
        </div>

        <div className="circle-container">
          <div className="big-circle"></div>

          {["Breakfast", "Lunch", "High_Tea", "Dinner"].map((category) => (
            <div key={category} className={`small-circle ${category.toLowerCase()}`}>
              <h4>{category.replace("_", " ")}</h4>
              {mealData[category]?.length > 0 ? (
                mealData[category].map((meal, index) => (
                  <div key={index}>
                    <label>
                      <input
                        type="checkbox"
                        value={meal}
                        checked={
                          selectedMeals.find((item) => item.category === category)?.items.includes(meal) || false
                        }
                        onChange={() => handleMealSelection(category, meal)}
                      />
                      {meal}
                    </label>
                  </div>
                ))
              ) : (
                <p>No {category} options available</p>
              )}
            </div>
          ))}
        </div>

        <label htmlFor="da">Date: </label>
        <input type="date" name="myDate" id="da" value={date} readOnly />

        <br />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default Stud;