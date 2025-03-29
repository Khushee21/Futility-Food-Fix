import React, { useState, useEffect } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import styles from "./Studentoccasion.module.css";

const Studentoccasion = () => {
  const [menu, setMenu] = useState(null);
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [isChecked1, setIsChecked1] = useState(false);
  const [isChecked2, setIsChecked2] = useState(false);
  const [error, setError] = useState(false);
  const [showForm, setShowForm] = useState(true);

  // Function to fetch today's occasion data
  const fetchMenuData = async () => {
    try {
      const response = await axios.get("http://localhost:5066/api/occasional");
      console.log("Fetched menu data:", response.data);
      if (response.data && response.data.success) {
        setMenu(response.data.data);
      } else {
        console.warn("No menu data available for today.");
      }
    } catch (error) {
      console.error("Failed to fetch menu data:", error);
    }
  };

  // Initial fetch and setup Socket.IO connection
  useEffect(() => {
    fetchMenuData();

    const socket = io("http://localhost:5066");
    socket.on("newOccasion", (data) => {
      console.log("New occasion received:", data);
      setMenu(data);
    });

    // Cleanup on unmount
    return () => {
      socket.disconnect();
    };
  }, []);

  const handleCheckbox1 = () => {
    setIsChecked1(true);
    setIsChecked2(false);
    setSelectedMenu(menu?.menu1);
  };

  const handleCheckbox2 = () => {
    setIsChecked2(true);
    setIsChecked1(false);
    setSelectedMenu(menu?.menu2);
  };

  const handleSubmit = () => {
    if (!isChecked1 && !isChecked2) {
      setError(true);
    } else {
      setError(false);
      alert("Form submitted successfully!");
      // Example POST request to vote:
      // axios.post("http://localhost:5066/api/occasional/vote", { selectedMenu });
    }
  };

  return showForm ? (
    <div className={styles.stocc_container}>
      <button className={styles.stocc_closeButton} onClick={() => setShowForm(false)}>
        X
      </button>

<h1 className={styles.stocc_animatedTitle}>Shree Shanta Sangam</h1>
      <h2 className={styles.stocc_highlightText1}>{menu?.occasion}</h2>

      <div className={styles.stocc_forms}>
        {/* Menu 1 */}
        <div className={styles.stocc_subForm}>
          <h3 className={styles.stocc_highlightText}>Menu 1</h3>
          <div className={styles.stocc_bulgingCircle}>
            <div className={styles.stocc_checkContainer}>
              <input
                type="checkbox"
                checked={isChecked1}
                onChange={handleCheckbox1}
              />
            </div>
            <div className={styles.stocc_oval}>{menu?.menu1?.dal}</div>
            <div className={styles.stocc_oval}>{menu?.menu1?.vegetable}</div>
            <div className={styles.stocc_oval}>{menu?.menu1?.sweet}</div>
          </div>
        </div>

        {/* Menu 2 */}
        <div className={styles.stocc_subForm}>
          <h3 className={styles.stocc_highlightText}>Menu 2</h3>
          <div className={styles.stocc_bulgingCircle}>
            <div className={styles.stocc_checkContainer}>
              <input
                type="checkbox"
                checked={isChecked2}
                onChange={handleCheckbox2}
              />
            </div>
            <div className={styles.stocc_oval}>{menu?.menu2?.dal}</div>
            <div className={styles.stocc_oval}>{menu?.menu2?.vegetable}</div>
            <div className={styles.stocc_oval}>{menu?.menu2?.sweet}</div>
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <p className={styles.stocc_errorMessage}>
          Firstly select any of the given menu
        </p>
      )}

      {/* Date & Submit Button */}
      <p className={styles.stocc_highlightText}>
        <b>Date:</b> {menu?.date}
      </p>
      <button className={styles.stocc_submit} onClick={handleSubmit}>
        Submit
      </button>
    </div>
  ) : null;
};

export default Studentoccasion;

