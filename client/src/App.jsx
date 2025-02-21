import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';  // Updated to use Routes
import SignInAdmin from './Components/WardenSignIn/SignInAdmin';  // Import the SignInAdmin component
import Warden from './components/WardenDashBoard/Warden';  // Import the Warden component (Warden.jsx)
import SignInStu from './Components/StuSignIn/SignInStu';  // Import the SignInStu component
import Student from './Components/StudentDashBoard/Student';  // Import the Student Dashboard component
import ResetPass from './Components/ResetPassword/ResetPass';  // Import the Reset Password component
import Stdreg from './Components/Registration/Stdreg';  // Import the Registration form

function App() {
  const [isAdmin, setIsAdmin] = useState(false);

  // Handle admin login state
  const handleAdminLogin = () => {
    setIsAdmin(true);  // Set isAdmin to true when admin logs in
  };

  return (
    <Router>
      <div className="App">
        <main>
          <Routes>
            {/* Student Routes */}
            <Route path="/register" element={<Stdreg />} />
            <Route path="/signin" element={<SignInStu />} />  {/* Student Login Page (First page) */}
            <Route path="/student-dashboard" element={<Student />} />
            <Route path="/reset-password" element={<ResetPass />} />
            <Route path="/reset-password/:id" element={<ResetPass />} />

            {/* Admin Sign In Route */}
            <Route 
              path="/signin-admin" 
              element={<SignInAdmin onLogin={handleAdminLogin} />} 
            />

            {/* Warden Dashboard Route (Protected for Admin) */}
            <Route 
              path="/warden-dashboard" 
              element={isAdmin ? <Warden /> : <Navigate to="/signin-admin" />} 
            />

            {/* Default Route (Fallback to Sign In as Student) */}
            <Route path="*" element={<Navigate to="/signin" />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
