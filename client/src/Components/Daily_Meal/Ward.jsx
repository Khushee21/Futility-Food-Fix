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

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

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
    <div className="Dm_container">
      <h1 className="Dm_ward-heading">Shree Shanta Sangam</h1>
      <form onSubmit={handleSubmit}>
        <table className="Dm_table">
          <thead>
            <tr>
              <th className="Dm_th">Meal</th>
              <th className="Dm_th">Selection</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="Dm_td">
                <label htmlFor="BF">Breakfast:</label>
              </td>
              <td className="Dm_td">
                <input
                  list="breakfast-options"
                  name="Breakfast"
                  className="Dm_editable-select"
                  required
                  value={formData.Breakfast}
                  onChange={handleChange}
                />
                <datalist id="Dm_breakfast-options">
                  <option value="Aalu-Pratha" />
                  <option value="Simple-Pratha" />
                  <option value="Poha" />
                  <option value="Sandwich" />
                  <option value="Fried Idli" />
                </datalist>
              </td>
            </tr>
            <tr>
              <td className="Dm_td">
                <label htmlFor="Ln">Lunch:</label>
              </td>
              <td className="Dm_td">
                <div className="Dm_meal-options">
                  <input
                    list="daal-options"
                    name="Lunch_Daal"
                    className="Dm_editable-select"
                    placeholder="Daal"
                    required
                    value={formData.Lunch_Daal}
                    onChange={handleChange}
                    style={{ textAlign: "left" }}
                  />
                  <datalist id="Dm_daal-options">
                    <option value="Dal Tadka" />
                    <option value="Dal Makhani" />
                  </datalist>

                  <input
                    list="sabji-options"
                    name="Lunch_Sabji"
                    className="Dm_editable-select"
                    placeholder="Sabji"
                    required
                    value={formData.Lunch_Sabji}
                    onChange={handleChange}
                    style={{ textAlign: "left" }}
                  />
                  <datalist id="Dm_sabji-options">
                    <option value="Mix Veg" />
                    <option value="Paneer Butter Masala" />
                  </datalist>

                  <input
                    list="chapati-options"
                    name="Lunch_Chapati"
                    className="Dm_editable-select"
                    placeholder="Chapati"
                    required
                    value={formData.Lunch_Chapati}
                    onChange={handleChange}
                    style={{ textAlign: "left" }}
                  />
                  <datalist id="Dm_chapati-options">
                    <option value="Plain Chapati" />
                    <option value="Butter Chapati" />
                  </datalist>
                </div>
              </td>
            </tr>
            <tr>
              <td className="Dm_td">
                <label htmlFor="Dn">Dinner:</label>
              </td>
              <td className="Dm_td">
                <div className="Dm_meal-options">
                  <input
                    list="dinner-daal-options"
                    name="Dinner_Daal"
                    className="Dm_editable-select"
                    placeholder="Daal"
                    required
                    value={formData.Dinner_Daal}
                    onChange={handleChange}
                    style={{ textAlign: "left" }}
                  />
                  <datalist id="Dm_dinner-daal-options">
                    <option value="Dal Tadka" />
                    <option value="Dal Makhani" />
                  </datalist>

                  <input
                    list="dinner-sabji-options"
                    name="Dinner_Sabji"
                    className="Dm_editable-select"
                    placeholder="Sabji"
                    required
                    value={formData.Dinner_Sabji}
                    onChange={handleChange}
                    style={{ textAlign: "left" }}
                  />
                  <datalist id="Dm_dinner-sabji-options">
                    <option value="Mix Veg" />
                    <option value="Paneer Butter Masala" />
                  </datalist>

                  <input
                    list="dinner-chapati-options"
                    name="Dinner_Chapati"
                    className="Dm_editable-select"
                    placeholder="Chapati"
                    required
                    value={formData.Dinner_Chapati}
                    onChange={handleChange}
                    style={{ textAlign: "left" }}
                  />
                  <datalist id="Dm_dinner-chapati-options">
                    <option value="Plain Chapati" />
                    <option value="Butter Chapati" />
                  </datalist>
                </div>
              </td>
            </tr>
            <tr>
              <td className="Dm_td">
                <label htmlFor="Ht">High-Tea:</label>
              </td>
              <td className="Dm_td">
                <input
                  list="high-tea-options"
                  name="High_Tea"
                  className="Dm_editable-select"
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
              <td className="Dm_td">
                <label htmlFor="da">Date:</label>
              </td>
              <td className="Dm_td">
                <input
                  type="date"
                  name="myDate"
                  id="da"
                  className="Dm_editable-select"
                  required
                  value={formData.myDate}
                  onChange={handleChange}
                />
              </td>
            </tr>
          </tbody>
        </table>

        <div className="Dm_buttons">
          <input type="submit" value="Submit" />
          <input type="reset" value="Reset" onClick={() =>setFormData({
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