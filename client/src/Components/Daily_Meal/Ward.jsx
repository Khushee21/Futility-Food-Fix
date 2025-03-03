import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import "./Ward.css";

const Ward = () => {
  const [formData, setFormData] = useState({
    Breakfast: "",
    Lunch_Daal: "",
    Lunch_Sabji: "",
    Lunch_Chapati: "",
    High_Tea: "",
    Dinner_Daal: "",
    Dinner_Sabji: "",
    Dinner_Chapati: "",
    myDate: "",
  });
  const [socket, setSocket] = useState(null);

  // Initialize Socket.IO connection
  useEffect(() => {
    const newSocket = io("http://localhost:5066");
    setSocket(newSocket);

    newSocket.on("submissionStatus", (message) => {
      alert(message);
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.myDate) {
      alert("Please select a date.");
      return;
    }

    if (socket) {
      socket.emit("submitMeal", formData);
      setFormData({
        Breakfast: "",
        Lunch_Daal: "",
        Lunch_Sabji: "",
        Lunch_Chapati: "",
        High_Tea: "",
        Dinner_Daal: "",
        Dinner_Sabji: "",
        Dinner_Chapati: "",
        myDate: "",
      });
    }
  };

  return (
    <div className="container">
      <h1 className="ward-heading">Shree Shanta Sangam</h1>
      <form onSubmit={handleSubmit}>
        <table>
          <thead>
            <tr>
              <th>Meal</th>
              <th>Selection</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <label htmlFor="BF">Breakfast:</label>
              </td>
              <td>
                <input
                  list="breakfast-options"
                  name="Breakfast"
                  className="editable-select"
                  required
                  value={formData.Breakfast}
                  onChange={handleChange}
                />
                <datalist id="breakfast-options">
                  <option value="Aalu-Pratha" />
                  <option value="Simple-Pratha" />
                  <option value="Poha" />
                  <option value="Sandwich" />
                  <option value="Fried Idli" />
                </datalist>
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="Ln">Lunch:</label>
              </td>
              <td>
                <div className="meal-options">
                  <input
                    list="daal-options"
                    name="Lunch_Daal"
                    className="editable-select"
                    placeholder="Daal"
                    required
                    value={formData.Lunch_Daal}
                    onChange={handleChange}
                  />
                  <datalist id="daal-options">
                    <option value="Dal Tadka" />
                    <option value="Dal Makhani" />
                  </datalist>

                  <input
                    list="sabji-options"
                    name="Lunch_Sabji"
                    className="editable-select"
                    placeholder="Sabji"
                    required
                    value={formData.Lunch_Sabji}
                    onChange={handleChange}
                  />
                  <datalist id="sabji-options">
                    <option value="Mix Veg" />
                    <option value="Paneer Butter Masala" />
                  </datalist>

                  <input
                    list="chapati-options"
                    name="Lunch_Chapati"
                    className="editable-select"
                    placeholder="Chapati"
                    required
                    value={formData.Lunch_Chapati}
                    onChange={handleChange}
                  />
                  <datalist id="chapati-options">
                    <option value="Plain Chapati" />
                    <option value="Butter Chapati" />
                  </datalist>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="Dn">Dinner:</label>
              </td>
              <td>
                <div className="meal-options">
                  <input
                    list="dinner-daal-options"
                    name="Dinner_Daal"
                    className="editable-select"
                    placeholder="Daal"
                    required
                    value={formData.Dinner_Daal}
                    onChange={handleChange}
                  />
                  <datalist id="dinner-daal-options">
                    <option value="Dal Tadka" />
                    <option value="Dal Makhani" />
                  </datalist>

                  <input
                    list="dinner-sabji-options"
                    name="Dinner_Sabji"
                    className="editable-select"
                    placeholder="Sabji"
                    required
                    value={formData.Dinner_Sabji}
                    onChange={handleChange}
                  />
                  <datalist id="dinner-sabji-options">
                    <option value="Mix Veg" />
                    <option value="Paneer Butter Masala" />
                  </datalist>

                  <input
                    list="dinner-chapati-options"
                    name="Dinner_Chapati"
                    className="editable-select"
                    placeholder="Chapati"
                    required
                    value={formData.Dinner_Chapati}
                    onChange={handleChange}
                  />
                  <datalist id="dinner-chapati-options">
                    <option value="Plain Chapati" />
                    <option value="Butter Chapati" />
                  </datalist>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="Ht">High-Tea:</label>
              </td>
              <td>
                <input
                  list="high-tea-options"
                  name="High_Tea"
                  className="editable-select"
                  required
                  value={formData.High_Tea}
                  onChange={handleChange}
                />
                <datalist id="high-tea-options">
                  <option value="Tea & Biscuits" />
                  <option value="Samosa" />
                </datalist>
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="da">Date:</label>
              </td>
              <td>
                <input
                  type="date"
                  name="myDate"
                  id="da"
                  className="editable-select"
                  required
                  value={formData.myDate}
                  onChange={handleChange}
                />
              </td>
            </tr>
          </tbody>
        </table>

        <div className="buttons">
          <input type="submit" value="Submit" />
          <input
            type="reset"
            value="Reset"
            onClick={() =>
              setFormData({
                Breakfast: "",
                Lunch_Daal: "",
                Lunch_Sabji: "",
                Lunch_Chapati: "",
                High_Tea: "",
                Dinner_Daal: "",
                Dinner_Sabji: "",
                Dinner_Chapati: "",
                myDate: "",
              })
            }
          />
        </div>
      </form>
    </div>
  );
};

export default Ward;