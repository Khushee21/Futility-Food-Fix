import React, { useState } from "react";
import "./Stud.css";

const Stud = () => {
    const mealNames = {
        breakfast: "Poha & Tea",
        lunch: "Dal, Rice & Chapati",
        highTea: "Samosa & Tea",
        dinner: "Paneer Butter Masala & Naan"
    };

    const [selectedMeals, setSelectedMeals] = useState([]);
    const [glowEffect, setGlowEffect] = useState({});
    const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

    const handleMealSelection = (meal) => {
        if (selectedMeals.includes(meal)) {
            setGlowEffect({ ...glowEffect, [meal]: true });

            setTimeout(() => {
                setGlowEffect({ ...glowEffect, [meal]: false });
            }, 1500);
        } else {
            setSelectedMeals([...selectedMeals, meal]);
        }
    };

    return (
        <div className="container">
            <h1>Shree Shanta Sangam</h1>
            <form action="Backened.php">
                <div className="circle-container">
                    <div className="big-circle"></div>
                    <div className="small-circle breakfast" onClick={() => handleMealSelection("breakfast")}>Breakfast</div>
                    <div className="small-circle lunch" onClick={() => handleMealSelection("lunch")}>Lunch</div>
                    <div className="small-circle high-tea" onClick={() => handleMealSelection("highTea")}>High Tea</div>
                    <div className="small-circle dinner" onClick={() => handleMealSelection("dinner")}>Dinner</div>
                </div>

                <div className="meal-options">
                    {selectedMeals.map((meal) => (
                        <div key={meal} className={glowEffect[meal] ? "glow-effect" : ""}>
                            <label>
                                <input type="checkbox" name={meal} value={mealNames[meal]} defaultChecked />
                                {mealNames[meal]}
                            </label>
                        </div>
                    ))}
                </div>
            
                <label htmlFor="da">Date: </label>
              <input type="date" name="myDate" id="da" value={date} readOnly />
              <br></br>
                <input type="submit" value="Submit" />
            </form>
        </div>
    );
};

export default Stud;
