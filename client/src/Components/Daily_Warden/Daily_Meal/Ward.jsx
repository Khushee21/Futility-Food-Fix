import React from "react";
import "./Ward.css";

const Ward = () => {
  return (
    <div className="container">
      <h1 className="ward-heading">Shree Shanta Sangam</h1>
      <form action="Backened.php">
        <table>
          <tr>
            <th>Meal</th>
            <th>Selection</th>
          </tr>
          <tr>
            <td>
              <label htmlFor="BF">Breakfast:</label>
            </td>
            <td>
              <input list="breakfast-options" name="Breakfast" className="editable-select" required />
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
                <input list="daal-options" name="Lunch_Daal" className="editable-select" placeholder="Daal" required />
                <datalist id="daal-options">
                  <option value="Dal Tadka" />
                  <option value="Dal Makhani" />
                </datalist>

                <input list="sabji-options" name="Lunch_Sabji" className="editable-select" placeholder="Sabji" required />
                <datalist id="sabji-options">
                  <option value="Mix Veg" />
                  <option value="Paneer Butter Masala" />
                </datalist>

                <input list="chapati-options" name="Lunch_Chapati" className="editable-select" placeholder="Chapati" required />
                <datalist id="chapati-options">
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
              <input list="high-tea-options" name="High_Tea" className="editable-select" required />
              <datalist id="high-tea-options">
                <option value="Tea & Biscuits" />
                <option value="Samosa" />
              </datalist>
            </td>
          </tr>
          <tr>
            <td>
              <label htmlFor="Di">Dinner:</label>
            </td>
            <td>
              <div className="meal-options">
                <input list="dinner-daal-options" name="Dinner_Daal" className="editable-select" placeholder="Daal" required />
                <datalist id="dinner-daal-options">
                  <option value="Dal Tadka" />
                  <option value="Dal Makhani" />
                </datalist>

                <input list="dinner-sabji-options" name="Dinner_Sabji" className="editable-select" placeholder="Sabji" required />
                <datalist id="dinner-sabji-options">
                  <option value="Mix Veg" />
                  <option value="Paneer Butter Masala" />
                </datalist>

                <input list="dinner-chapati-options" name="Dinner_Chapati" className="editable-select" placeholder="Chapati" required />
                <datalist id="dinner-chapati-options">
                  <option value="Plain Chapati" />
                  <option value="Butter Chapati" />
                </datalist>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <label htmlFor="da">Date:</label>
            </td>
            <td>
              <input type="date" name="myDate" id="da" className="editable-select" required />
            </td>
          </tr>
        </table>

        <div className="buttons">
          <input type="submit" value="Submit" />
          <input type="reset" value="Reset" />
        </div>
      </form>
    </div>
  );
};

export default Ward;
