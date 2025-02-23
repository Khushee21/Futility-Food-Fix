import React from "react";
import "./App.css";
import Student from './Components/StudentDashBoard/Student'
import OccasionForm from "./Components/OccasionForm/tempOccasion"; // Correct import
import Studentoccasion from "./Components/Studentoccasion/Studentoccasion";
function App() {
  return (
    <>
       <Student/>
    <OccasionForm/>
      <Studentoccasion/>
    </>
  );
}

export default App;


