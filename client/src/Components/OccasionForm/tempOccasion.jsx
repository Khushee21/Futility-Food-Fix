import React, { useState } from "react";
import axios from "axios";
import styles from "./occasion.module.css";

const OccasionForm = () => {
  const [occasion, setOccasion] = useState("");
  const [otherOccasion, setOtherOccasion] = useState("");
  const [customImage, setCustomImage] = useState("");
  const [meal1, setMeal1] = useState({ dal: "", vegetable: "", sweet: "" });
  const [meal2, setMeal2] = useState({ dal: "", vegetable: "", sweet: "" });
  const [date, setDate] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [isVisible, setIsVisible] = useState(true);

  const handleOccasionChange = (e) => {
    setOccasion(e.target.value);
    if (formErrors.occasion) {
      setFormErrors((prev) => ({ ...prev, occasion: "" }));
    }
  };

  const handleOtherOccasionChange = (e) => {
    setOtherOccasion(e.target.value);
    if (formErrors.otherOccasion) {
      setFormErrors((prev) => ({ ...prev, otherOccasion: "" }));
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setCustomImage(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleMealChange = (e, mealNumber, field) => {
    const value = e.target.value;
    if (mealNumber === 1) {
      setMeal1((prev) => ({ ...prev, [field]: value }));
    } else if (mealNumber === 2) {
      setMeal2((prev) => ({ ...prev, [field]: value }));
    }
  };

  const validateForm = () => {
    let errors = {};
    if (!occasion) errors.occasion = "Occasion is required";
    if (occasion === "other" && !otherOccasion.trim()) {
      errors.otherOccasion = "Please specify the occasion";
    }
    if (!customImage) errors.image = "Image upload is required";

    if (!meal1.dal.trim()) errors.daal1 = "This field is required";
    if (!meal1.vegetable.trim()) errors.vegetable1 = "This field is required";
    if (!meal1.sweet.trim()) errors.sweet1 = "This field is required";

    if (!meal2.dal.trim()) errors.daal2 = "This field is required";
    if (!meal2.vegetable.trim()) errors.vegetable2 = "This field is required";
    if (!meal2.sweet.trim()) errors.sweet2 = "This field is required";

    if (!date.trim()) errors.date = "Date is required";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const finalOccasion = occasion === "other" ? otherOccasion : occasion;

    const formData = {
      occasion: finalOccasion,
      image: customImage,
      menu1: meal1,
      menu2: meal2,
      date,
    };

    try {
      const response = await axios.post(
        "http://localhost:5066/api/occasional/create",
        formData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      alert(response.data.message || "Form submitted successfully!");
      handleReset();
    } catch (error) {
      console.error("Error saving data:", error);
      alert("Failed to save data. Please try again.");
    }
  };

  const handleReset = () => {
    setOccasion("");
    setOtherOccasion("");
    setCustomImage("");
    setMeal1({ dal: "", vegetable: "", sweet: "" });
    setMeal2({ dal: "", vegetable: "", sweet: "" });
    setDate("");
    setFormErrors({});
  };

  if (!isVisible) return null;

  return (
    <div className={styles.occ_container}>
      <button
        className={styles.occ_closeButton}
        onClick={() => setIsVisible(false)}
      >
        ×
      </button>
      <h1 className={styles.occ_title}>Shree Shanta Sangam</h1>
      <form onSubmit={handleSubmit}>
        {/* Occasion Dropdown */}
        <div className={styles.occ_formGroup}>
          <select
            value={occasion}
            onChange={handleOccasionChange}
            className="occasion"
            style={{ backgroundColor: "rgb(24, 22, 22)" }}
          >
            <option value="">Select Occasion</option>
            <option value="holi">Holi</option>
            <option value="diwali">Diwali</option>
            <option value="christmas">Christmas</option>
            <option value="tuesday">Tuesday</option>
            <option value="republicday">Republic Day</option>
            <option value="rakshabandhan">Raksha Bandhan</option>
            <option value="teej">Teej</option>
            <option value="eid">Eid</option>
            <option value="other">Other</option>
          </select>
          {formErrors.occasion && (
            <span className={styles.occ_error}>{formErrors.occasion}</span>
          )}
        </div>

        {/* Other Occasion Input */}
        {occasion === "other" && (
          <div className={styles.occ_formGroup}>
            <label htmlFor="otherOccasion">
              <strong>Specify Occasion:</strong>
            </label>
            <input
              type="text"
              id="otherOccasion"
              value={otherOccasion}
              onChange={handleOtherOccasionChange}
              className={styles.occ_otherOccasionInput}
              required
            />
            {formErrors.otherOccasion && (
              <span className={styles.occ_error}>{formErrors.otherOccasion}</span>
            )}
          </div>
        )}

        {/* Upload Image */}
        <div className={styles.occ_uploadContainer}>
          <label htmlFor="image">
            <strong>Upload Custom Image:</strong>
          </label>
          <input
            type="file"
            id="image"
            onChange={handleImageUpload}
            required
          />
          {formErrors.image && (
            <span className={styles.occ_error}>{formErrors.image}</span>
          )}
        </div>

        {/* Meal Choice 1 */}
        <div className={styles.occ_choiceContainer}>
          <div className={styles.occ_choiceBox}>
            <h3>Choice 1</h3>
            <MealInput
              idSuffix="1"
              meal={meal1}
              onChange={handleMealChange}
              formErrors={formErrors}
              mealNumber={1}
              styles={styles}
            />
          </div>

          {/* Meal Choice 2 */}
          <div className={styles.occ_choiceBox}>
            <h3>Choice 2</h3>
            <MealInput
              idSuffix="2"
              meal={meal2}
              onChange={handleMealChange}
              formErrors={formErrors}
              mealNumber={2}
              styles={styles}
            />
          </div>
        </div>

        {/* Date Picker */}
        <div className={styles.occ_formGroup}>
          <label htmlFor="date">
            <strong>Date:</strong>
          </label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
          {formErrors.date && (
            <span className={styles.occ_error}>{formErrors.date}</span>
          )}
        </div>

        {/* Submit Button */}
        <div className={styles.occ_formGroup}>
          <button type="submit" className={styles.occ_submitButton}>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

// Sub-component for meal input fields
const MealInput = ({ idSuffix, meal, onChange, formErrors, mealNumber, styles }) => (
  <>
    <div className="occ_t">
      <label htmlFor={`dal${idSuffix}`}><strong>Daal:</strong></label>
      <input
        type="text"
        id={`dal${idSuffix}`}
        value={meal.dal}
        onChange={(e) => onChange(e, mealNumber, "dal")}
        required
      />
      {formErrors[`daal${idSuffix}`] && (
        <span className={styles.occ_error}>{formErrors[`daal${idSuffix}`]}</span>
      )}
    </div>
    <div className="occ_t">
      <label htmlFor={`vegetable${idSuffix}`}><strong>Vegetable:</strong></label>
      <input
        type="text"
        id={`vegetable${idSuffix}`}
        value={meal.vegetable}
        onChange={(e) => onChange(e, mealNumber, "vegetable")}
        required
      />
      {formErrors[`vegetable${idSuffix}`] && (
        <span className={styles.occ_error}>{formErrors[`vegetable${idSuffix}`]}</span>
      )}
    </div>
    <div className="occ_t">
      <label htmlFor={`sweet${idSuffix}`}><strong>Sweet:</strong></label>
      <input
        type="text"
        id={`sweet${idSuffix}`}
        value={meal.sweet}
        onChange={(e) => onChange(e, mealNumber, "sweet")}
        required
      />
      {formErrors[`sweet${idSuffix}`] && (
        <span className={styles.occ_error}>{formErrors[`sweet${idSuffix}`]}</span>
      )}
    </div>
  </>
);

export default OccasionForm;
