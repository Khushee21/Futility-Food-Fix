import React, { useState } from "react";
import "./occasion.css";

const OccasionForm = () => {
    const [occasion, setOccasion] = useState("");
    const [otherOccasion, setOtherOccasion] = useState("");
    const [customImage, setCustomImage] = useState(null);
    const [formErrors, setFormErrors] = useState({});
    const [isVisible, setIsVisible] = useState(true);

    const handleOccasionChange = (event) => {
        setOccasion(event.target.value);
        setFormErrors((prev) => ({ ...prev, occasion: "" }));
    };

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setCustomImage(e.target.result);
            };
            reader.readAsDataURL(file);
            setFormErrors((prev) => ({ ...prev, image: "" }));
        }
    };

    const validateForm = () => {
        const errors = {};
        if (!occasion) errors.occasion = "Occasion is required";
        if (occasion === "other" && !otherOccasion.trim()) {
            errors.otherOccasion = "Please specify the occasion";
        }
        if (!customImage) errors.image = "Image upload is required";

        ["daal1", "vegetable1", "sweet1", "daal2", "vegetable2", "sweet2", "date"].forEach((field) => {
            if (!document.getElementById(field)?.value.trim()) {
                errors[field] = "This field is required";
            }
        });

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (validateForm()) {
            alert("Form submitted successfully!");
        }
    };

    const handleReset = () => {
        setOccasion("");
        setOtherOccasion("");
        setCustomImage(null);
        setFormErrors({});
        document.getElementById("occasion-form").reset();
    };

    return (
        isVisible && (
            <div className="container">
                <button className="close-button" onClick={() => setIsVisible(false)}>×</button>
                <h1 className="title">SHREE SHANTA SANGAM</h1>
                <form id="occasion-form" onSubmit={handleSubmit}>
                    {/* Occasion Dropdown */}
                    <div className="form-group">
                        <label htmlFor="occasion"><strong>Occasion:</strong></label>
                        <select id="occasion" name="occasion" value={occasion} onChange={handleOccasionChange} required>
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
                        {formErrors.occasion && <span className="error">{formErrors.occasion}</span>}
                    </div>

                    {/* Specify Other Occasion - Appears if "Other" is selected */}
                    {occasion === "other" && (
                        <div className="form-group">
                            <label htmlFor="otherOccasion"><strong>Specify Occasion:</strong></label>
                            <input 
                                type="text" 
                                id="otherOccasion" 
                                value={otherOccasion} 
                                onChange={(e) => setOtherOccasion(e.target.value)} 
                                className="other-occasion-input"
                                required 
                            />
                            {formErrors.otherOccasion && <span className="error">{formErrors.otherOccasion}</span>}
                        </div>
                    )}

                    {/* Upload Custom Image */}
                    <div className="upload-container">
                        <label htmlFor="image"><strong>Upload Custom Image:</strong></label>
                        <input type="file" id="image" onChange={handleImageUpload} required />
                        {formErrors.image && <span className="error">{formErrors.image}</span>}
                    </div>

                    {/* Choices for Meals */}
                    <div className="choice-container">
                        {[1, 2].map((num) => (
                            <div className="choice-box" key={num}>
                                <h3>Choice {num}</h3>
                                {["Daal", "Vegetable", "Sweet"].map((item) => (
                                    <div key={item}>
                                        <label htmlFor={`${item.toLowerCase()}${num}`}><strong>{item}:</strong></label>
                                        <input type="text" id={`${item.toLowerCase()}${num}`} required />
                                        {formErrors[`${item.toLowerCase()}${num}`] && <span className="error">{formErrors[`${item.toLowerCase()}${num}`]}</span>}
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>

                    {/* Date Selection */}
                    <div className="form-group">
                        <label htmlFor="date"><strong>Date:</strong></label>
                        <input type="date" id="date" required />
                        {formErrors.date && <span className="error">{formErrors.date}</span>}
                    </div>

                    {/* Submit and Reset Buttons */}
                    <div className="button-group">
                        <button type="submit">Submit</button>
                        <button type="button" onClick={handleReset}>Reset</button>
                    </div>
                </form>
            </div>
        )
    );
};

export default OccasionForm;

