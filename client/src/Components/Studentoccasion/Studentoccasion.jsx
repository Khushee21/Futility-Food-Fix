import React, { useState } from "react";
import styles from "./Studentoccasion.module.css";

const Studentoccasion = () => {
    const [selectedDal1, setSelectedDal1] = useState("Dal");
    const [selectedVeg1, setSelectedVeg1] = useState("Vegetable");
    const [selectedSweet1, setSelectedSweet1] = useState("Sweet");

    const [selectedDal2, setSelectedDal2] = useState("Dal");
    const [selectedVeg2, setSelectedVeg2] = useState("Vegetable");
    const [selectedSweet2, setSelectedSweet2] = useState("Sweet");

    const [isChecked1, setIsChecked1] = useState(false);
    const [isChecked2, setIsChecked2] = useState(false);
    const [error, setError] = useState(false);
    const [showForm, setShowForm] = useState(true); // State to control form visibility

    const handleSubmit = () => {
        if (!isChecked1 && !isChecked2) {
            setError(true);
        } else {
            setError(false);
            alert("Form submitted successfully!");
        }
    };

    return showForm ? (
        <div className={styles.container}>
            {/* Close Button */}
            <button className={styles.closeButton} onClick={() => setShowForm(false)}>
                X
            </button>

            <h1 className={styles.animatedTitle}>Shree Shanta Sangam</h1>
            <h2 className={styles.highlightText}>Holi Special</h2>

            <div className={styles.forms}>
                {/* Menu 1 */}
                <div className={styles.subForm}>
                    <h3 className={styles.highlightText}>Menu 1</h3>
                    <div className={styles.bulgingCircle}>
                        <div className={styles.checkContainer}>
                            <input 
                                type="checkbox"
                                checked={isChecked1} 
                                onChange={() => setIsChecked1(!isChecked1)} 
                            />
                        </div>
                        <div className={styles.oval} onClick={() => setSelectedDal1("Chana Dal")}>{selectedDal1}</div>
                        <div className={styles.oval} onClick={() => setSelectedVeg1("Paneer Butter Masala")}>{selectedVeg1}</div>
                        <div className={styles.oval} onClick={() => setSelectedSweet1("Rasgulla")}>{selectedSweet1}</div>
                    </div>
                </div>

                {/* Menu 2 */}
                <div className={styles.subForm}>
                    <h3 className={styles.highlightText}>Menu 2</h3>
                    <div className={styles.bulgingCircle}>
                        <div className={styles.checkContainer}>
                            <input 
                                type="checkbox" 
                                checked={isChecked2} 
                                onChange={() => setIsChecked2(!isChecked2)} 
                            />
                        </div>
                        <div className={styles.oval} onClick={() => setSelectedDal2("Moong Dal")}>{selectedDal2}</div>
                        <div className={styles.oval} onClick={() => setSelectedVeg2("Aloo Gobi")}>{selectedVeg2}</div>
                        <div className={styles.oval} onClick={() => setSelectedSweet2("Gulab Jamun")}>{selectedSweet2}</div>
                    </div>
                </div>
            </div>

            {/* Error Message */}
            {error && <p className={styles.errorMessage}>Firstly select any of the given menu</p>}

            {/* Date & Submit Button */}
            <p className={styles.highlightText}><b>Date:</b> 23-02-2025</p>
            <button className={styles.submit} onClick={handleSubmit}>Submit</button>
        </div>
    ) : null;
};

export default Studentoccasion;
