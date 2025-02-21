import { useState } from 'react';
import axios from 'axios';
import './Stdreg.css';  // Import CSS for styling

const Stdreg = () => {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    degree: '',
    email: '',
    parentEmail: '',
    password: '',
  });

  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // to differentiate success and error styles
  const [isSubmitting, setIsSubmitting] = useState(false);  // to manage the loading state

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');  // Reset the message before making the request

    // Email validation: Only allow banasthali.in emails
    const emailDomain = formData.email.split('@')[1];
    if (emailDomain !== 'banasthali.in') {
      setMessage('Only banasthali.in email addresses are allowed.');
      setMessageType('error');
      return;
    }

    setIsSubmitting(true);  // Set loading state

    try {
      const response = await axios.post('http://localhost:5066/api/auth/register', formData);

      if (response.status === 201) {
        setMessage('Registration successful!');
        setMessageType('success');
        setFormData({ id: '', name: '', degree: '', email: '', parentEmail: '', password: '' }); // Reset form data
      }
    } catch (error) {
      setMessage(error.response ? error.response.data.error : 'Something went wrong. Please try again.');
      setMessageType('error');
    } finally {
      setIsSubmitting(false);  // Reset loading state after the request is done
    }
  };

  return (
    <div className="form-container">
      <h2>Student Registration Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="id">Student ID</label>
          <input
            type="text"
            id="id"
            name="id"
            value={formData.id}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="name">Student Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="degree">Degree</label>
          <input
            type="text"
            id="degree"
            name="degree"
            value={formData.degree}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email ID</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="parentEmail">Parent's Email ID</label>
          <input
            type="email"
            id="parent-email"
            name="parentEmail"
            value={formData.parentEmail}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            minLength="6"
          />
        </div>
        <button type="submit" className="submit-btn" disabled={isSubmitting}>
          {isSubmitting ? 'Registering...' : 'Register'}
        </button>
      </form>

      {message && (
        <p className={`message ${messageType}`}>
          {message}
        </p>
      )}
    </div>
  );
};

export default Stdreg;
