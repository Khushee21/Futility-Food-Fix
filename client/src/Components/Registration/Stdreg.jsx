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
    <div className={styles.reg_registerContainer}>
      <form onSubmit={handleSubmit} className={styles.reg_registerForm}>
        <img src={logo} alt="FFF Logo" className={styles.reg_logo} />
        <h2 className="reg_h2">Futility Food Fix</h2>

        {["StudentId", "StudentName", "degree", "email", "parentEmail"].map((field, index) => (
          <div className={styles.reg_inputGroup} key={index}>
            <input
            //  style={{ backgroundColor: "rgb(255, 255, 255)",border:"1px  rgb(86, 24, 24)" ,height:"7%"}}
              type="text"
              name={field}
              value={formData[field]}
              onChange={handleChange}
              placeholder=" " /* Required for floating label effect */
              required
            />
            <label className={styles.reg_floatingLabel}>
              {field === "email" ? "Email (banasthali.in)" : field.replace(/([A-Z])/g, " $1").trim()}
            </label>
          </div>
        ))}

        <div className={styles.reg_inputGroup}>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder=" "
            required
          />
          <label className={styles.reg_floatingLabel}>Password</label>
          <span className={styles.reg_eyeIcon} onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>
<div className={styles.My_Button1}>
<button  type="submit" disabled={isSubmitting}>{isSubmitting ? "Registering..." : "Register"}</button>
</div>
      

        {message && <p className={`${styles.reg_message} ${styles[messageType]}`}>{message}</p>}

        <p className={`${styles.reg_foodQuote} ${fade ? styles.fadeIn : styles.fadeOut}`}>{foodQuotes[currentQuoteIndex]}</p>
      </form>
    </div>
  );
};

export default Stdreg;



