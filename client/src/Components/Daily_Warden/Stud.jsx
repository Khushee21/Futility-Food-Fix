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
        <div className="St_container">
            <h1>Shree Shanta Sangam</h1>
            <form action="Backened.php">
                <div className="St_circle-container">
                    <div className="St_big-circle"></div>
                    <div className="St_small-circle breakfast" onClick={() => handleMealSelection("breakfast")}>Breakfast</div>
                    <div className="St_small-circle lunch" onClick={() => handleMealSelection("lunch")}>Lunch</div>
                    <div className="St_small-circle high-tea" onClick={() => handleMealSelection("highTea")}>High Tea</div>
                    <div className="St_small-circle dinner" onClick={() => handleMealSelection("dinner")}>Dinner</div>
                </div>

                <div className="St_meal-options">
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
                <input 
  type="date" 
  className="myDate" 
  id="da" 
  value={date} 
  readOnly 
  style={{ marginLeft:"10px", width: "125px" ,height:"24px"}} 
/>
              <br></br>
                <input className="St_Button" type="submit" value="Submit" />
            </form>
        </div>
    );
};

export default Stud;
