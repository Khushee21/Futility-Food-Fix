import React, { useState } from "react";
import axios from "axios";
import "./occasion.css";

const OccasionForm = () => {
  const [occasion, setOccasion] = useState("");
  const [otherOccasion, setOtherOccasion] = useState("");
  const [customImage, setCustomImage] = useState("");
  const [meal1, setMeal1] = useState({ dal: "", vegetable: "", sweet: "" });
  const [meal2, setMeal2] = useState({ dal: "", vegetable: "", sweet: "" });
  const [date, setDate] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [isVisible, setIsVisible] = useState(true);

  // Handle change for the occasion dropdown
  const handleOccasionChange = (e) => {
    setOccasion(e.target.value);
    // Reset error if any
    if (formErrors.occasion) {
      setFormErrors((prev) => ({ ...prev, occasion: "" }));
    }
  };

  // Handle change for specifying other occasion
  const handleOtherOccasionChange = (e) => {
    setOtherOccasion(e.target.value);
    if (formErrors.otherOccasion) {
      setFormErrors((prev) => ({ ...prev, otherOccasion: "" }));
    }
  };

  // Handle file upload and convert to Base64 string
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

  // Handle changes in meal inputs
  const handleMealChange = (e, mealNumber, field) => {
    const value = e.target.value;
    if (mealNumber === 1) {
      setMeal1((prev) => ({ ...prev, [field]: value }));
    } else if (mealNumber === 2) {
      setMeal2((prev) => ({ ...prev, [field]: value }));
    }
  };

  // Validate all fields before submitting
  const validateForm = () => {
    let errors = {};
    if (!occasion) errors.occasion = "Occasion is required";
    if (occasion === "other" && !otherOccasion.trim()) {
      errors.otherOccasion = "Please specify the occasion";
    }
    if (!customImage) errors.image = "Image upload is required";

    // Validate meal1 fields
    if (!meal1.dal.trim()) errors.daal1 = "This field is required";
    if (!meal1.vegetable.trim()) errors.vegetable1 = "This field is required";
    if (!meal1.sweet.trim()) errors.sweet1 = "This field is required";

    // Validate meal2 fields
    if (!meal2.dal.trim()) errors.daal2 = "This field is required";
    if (!meal2.vegetable.trim()) errors.vegetable2 = "This field is required";
    if (!meal2.sweet.trim()) errors.sweet2 = "This field is required";

    if (!date.trim()) errors.date = "Date is required";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    // Use the specified otherOccasion if "other" is selected
    const finalOccasion = occasion === "other" ? otherOccasion : occasion;

    const formData = {
      occasion: finalOccasion,
      image: customImage,
      menu1: {
        dal: meal1.dal,
        vegetable: meal1.vegetable,
        sweet: meal1.sweet,
      },
      menu2: {
        dal: meal2.dal,
        vegetable: meal2.vegetable,
        sweet: meal2.sweet,
      },
      date,
    };

    try {
      // Note: Ensure your backend endpoint matches this route!
      const response = await axios.post(
        "http://localhost:5066/api/occasional/create",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      alert(response.data.message || "Form submitted successfully!");
      handleReset();
    } catch (error) {
      console.error("Error saving data:", error);
      alert("Failed to save data. Please try again.");
    }
  };

  // Reset the form to its initial state
  const handleReset = () => {
    setOccasion("");
    setOtherOccasion("");
    setCustomImage("");
    setMeal1({ dal: "", vegetable: "", sweet: "" });
    setMeal2({ dal: "", vegetable: "", sweet: "" });
    setDate("");
    setFormErrors({});
  };

  return (
    isVisible && (
      <div className="container">
        <button className="close-button" onClick={() => setIsVisible(false)}>
          ×
        </button>
        <h1 className="title">SHREE SHANTA SANGAM</h1>
        <form onSubmit={handleSubmit}>
          {/* Occasion Dropdown */}
          <div className="form-group">
            <label htmlFor="occasion">
              <strong>Occasion:</strong>
            </label>
            <select
              id="occasion"
              name="occasion"
              value={occasion}
              onChange={handleOccasionChange}
              required
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
              <span className="error">{formErrors.occasion}</span>
            )}
          </div>

          {/* Specify Other Occasion */}
          {occasion === "other" && (
            <div className="form-group">
              <label htmlFor="otherOccasion">
                <strong>Specify Occasion:</strong>
              </label>
              <input
                type="text"
                id="otherOccasion"
                value={otherOccasion}
                onChange={handleOtherOccasionChange}
                className="other-occasion-input"
                required
              />
              {formErrors.otherOccasion && (
                <span className="error">{formErrors.otherOccasion}</span>
              )}
            </div>
          )}

          {/* Upload Custom Image */}
          <div className="upload-container">
            <label htmlFor="image">
              <strong>Upload Custom Image:</strong>
            </label>
            <input type="file" id="image" onChange={handleImageUpload} required />
            {formErrors.image && (
              <span className="error">{formErrors.image}</span>
            )}
          </div>

          {/* Meal Choices */}
          <div className="choice-container">
            <div className="choice-box">
              <h3>Choice 1</h3>
              <div>
                <label htmlFor="daal1">
                  <strong>Daal:</strong>
                </label>
                <input
                  type="text"
                  id="daal1"
                  value={meal1.dal}
                  onChange={(e) => handleMealChange(e, 1, "dal")}
                  required
                />
                {formErrors.daal1 && (
                  <span className="error">{formErrors.daal1}</span>
                )}
              </div>
              <div>
                <label htmlFor="vegetable1">
                  <strong>Vegetable:</strong>
                </label>
                <input
                  type="text"
                  id="vegetable1"
                  value={meal1.vegetable}
                  onChange={(e) => handleMealChange(e, 1, "vegetable")}
                  required
                />
                {formErrors.vegetable1 && (
                  <span className="error">{formErrors.vegetable1}</span>
                )}
              </div>
              <div>
                <label htmlFor="sweet1">
                  <strong>Sweet:</strong>
                </label>
                <input
                  type="text"
                  id="sweet1"
                  value={meal1.sweet}
                  onChange={(e) => handleMealChange(e, 1, "sweet")}
                  required
                />
                {formErrors.sweet1 && (
                  <span className="error">{formErrors.sweet1}</span>
                )}
              </div>
            </div>

            <div className="choice-box">
              <h3>Choice 2</h3>
              <div>
                <label htmlFor="daal2">
                  <strong>Daal:</strong>
                </label>
                <input
                  type="text"
                  id="daal2"
                  value={meal2.dal}
                  onChange={(e) => handleMealChange(e, 2, "dal")}
                  required
                />
                {formErrors.daal2 && (
                  <span className="error">{formErrors.daal2}</span>
                )}
              </div>
              <div>
                <label htmlFor="vegetable2">
                  <strong>Vegetable:</strong>
                </label>
                <input
                  type="text"
                  id="vegetable2"
                  value={meal2.vegetable}
                  onChange={(e) => handleMealChange(e, 2, "vegetable")}
                  required
                />
                {formErrors.vegetable2 && (
                  <span className="error">{formErrors.vegetable2}</span>
                )}
              </div>
              <div>
                <label htmlFor="sweet2">
                  <strong>Sweet:</strong>
                </label>
                <input
                  type="text"
                  id="sweet2"
                  value={meal2.sweet}
                  onChange={(e) => handleMealChange(e, 2, "sweet")}
                  required
                />
                {formErrors.sweet2 && (
                  <span className="error">{formErrors.sweet2}</span>
                )}
              </div>
            </div>
          </div>

          {/* Date Selection */}
          <div className="form-group">
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
              <span className="error">{formErrors.date}</span>
            )}
          </div>

          {/* Submit and Reset Buttons */}
          <div className="button-group">
            <button type="submit">Submit</button>
            <button type="button" onClick={handleReset}>
              Reset
            </button>
          </div>
        </form>
      </div>
    )
  );
};

export default OccasionForm;
