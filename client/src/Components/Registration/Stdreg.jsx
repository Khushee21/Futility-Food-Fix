import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./Stdreg.module.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import logo from "./logo.png";

const foodQuotes = [
  "Food is the ingredient that binds us together.",
  "Good food is the foundation of genuine happiness.",
  "Eat well, live well, be well.",
  "Cooking is love made visible.",
  "Happiness is homemade.",
];

// Define fields with state key and label
const fields = [
  { key: "id", label: "Student ID" },
  { key: "name", label: "Student Name" },
  { key: "degree", label: "Degree" },
  { key: "email", label: "Email (banasthali.in)" },
  { key: "parentEmail", label: "Parent Email" },
];

const Stdreg = () => {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    degree: "",
    email: "",
    parentEmail: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  // Cycle through food quotes every 5 seconds (with fade transition)
  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentQuoteIndex((prevIndex) => (prevIndex + 1) % foodQuotes.length);
        setFade(true);
      }, 500);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    // Validate that email ends with @banasthali.in
    if (!formData.email.endsWith("@banasthali.in")) {
      setMessage("Only banasthali.in email addresses are allowed.");
      setMessageType("error");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await axios.post("http://localhost:5066/api/auth/register", formData);
      if (response.status === 201) {
        setMessage("Registration successful!");
        setMessageType("success");
        setFormData({ id: "", name: "", degree: "", email: "", parentEmail: "", password: "" });
      }
    } catch (error) {
      setMessage(error.response ? error.response.data.message : "Something went wrong. Please try again.");
      setMessageType("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.registerContainer}>
      <form onSubmit={handleSubmit} className={styles.registerForm}>
        <img src={logo} alt="FFF Logo" className={styles.logo} />
        <h2>Femine Food Fix</h2>

        {fields.map((field, index) => (
          <div className={styles.inputGroup} key={index}>
            <input
              type="text"
              name={field.key}
              value={formData[field.key]}
              onChange={handleChange}
              placeholder=" "
              required
            />
            <label className={styles.floatingLabel}>{field.label}</label>
          </div>
        ))}

        <div className={styles.inputGroup}>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder=" "
            required
          />
          <label className={styles.floatingLabel}>Password</label>
          <span className={styles.eyeIcon} onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Registering..." : "Register"}
        </button>

        {message && <p className={`${styles.message} ${styles[messageType]}`}>{message}</p>}

        <p className={`${styles.foodQuote} ${fade ? styles.fadeIn : styles.fadeOut}`}>
          {foodQuotes[currentQuoteIndex]}
        </p>
      </form>
    </div>
  );
};

export default Stdreg;
