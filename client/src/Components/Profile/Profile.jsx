import React, { useState } from "react";
import "./P.css"; 

const Profile = () => {
  const [name, setName] = useState("Chesta Sharma");
  const [studentId, setStudentId] = useState("ABMCA24090");
  const [degree, setDegree] = useState("MCA");
  const [studentEmail] = useState("chesta.sharma@banasthali.in"); 
  const [parentEmail, setParentEmail] = useState("satbirsharma123@gmail.com");
  const [profilePic, setProfilePic] = useState(
    "http://3.bp.blogspot.com/-Le4kx6cdgRI/UcFOVbsDmiI/AAAAAAAABTY/Pwjv1dBRVBs/s1600/hd-picture-lovely-baby-kid-smiling-laughing--download-freely.jpg"
  );
  const [isEditing, setIsEditing] = useState(false);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfilePic(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="Pro_profile-container">
      <div className="Pro_img-container">
        <img id="Pro_profile-pic" src={profilePic} alt="profile" />
        <label htmlFor="file-input" className="Pro_edit-icon">
          <i className="fa-solid fa-pencil"></i>
        </label>
        <input type="file" id="file-input" accept="image/*" onChange={handleImageChange} />
      </div>

      <div className="Pro_user-info">
        <h2 id="Pro_display-name">{name}</h2>
        <h2 id="Pro_display-email">{studentEmail}</h2>
      </div>

      <h2 className="Pro_details-heading">Your Details</h2>

      <div className="Pro_posts-info">
        <p>
          <span>Name</span>
          <input
            type="text"
            value={name}
            disabled={!isEditing}
            onChange={(e) => setName(e.target.value)}
            style={{ backgroundColor: isEditing ? "Black" : " #2e2828", color: isEditing ? "White" : "White" }}
         />
        </p>
        <p>
          <span>Student ID</span>
          <input
            type="text"
            value={studentId}
            disabled={!isEditing}
            onChange={(e) => setStudentId(e.target.value)}
            style={{ backgroundColor: isEditing ? "Black" : " #2e2828", color: isEditing ? "White" : "White" }}
          />
        </p>
        <p>
          <span>Degree</span>
          <input
            type="text"
            value={degree}
            disabled={!isEditing}
            onChange={(e) => setDegree(e.target.value)}
            style={{ backgroundColor: isEditing ? "Black" : " #2e2828", color: isEditing ? "White" : "White" }}
         />
        </p>
        <p>
          <span>Student Email</span>
          <input type="email" value={studentEmail} disabled />
        </p>
        <p>
          <span>Parent Email</span>
          <input
            type="email"
            value={parentEmail}
            disabled={!isEditing}
            onChange={(e) => setParentEmail(e.target.value)}
            style={{ backgroundColor: isEditing ? "Black" : " #2e2828", color: isEditing ? "White" : "White" }}
          />
        </p>
      </div>

      {!isEditing ? (
        <button className="Pro" onClick={() => setIsEditing(true)}>Edit Details</button>
      ) : (
        <button className="Pro"
          onClick={() => {
            console.log("Saving data:", { name, studentId, degree, studentEmail, parentEmail });
            setIsEditing(false);
          }}
        >
          Save
        </button>
      )}
    </div>
  );
};

export default Profile;
