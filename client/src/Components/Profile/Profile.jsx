import React, { useState } from "react";
import "./P.css"; // Import the CSS file

const Profile = () => {
  const [name, setName] = useState("Chesta Sharma");
  const [studentId, setStudentId] = useState("ABMCA24090");
  const [degree, setDegree] = useState("MCA");
  const [studentEmail] = useState("chesta.sharma@banasthali.in"); // Uneditable
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
    <div className="profile-container">
      <div className="img-container">
        <img id="profile-pic" src={profilePic} alt="profile" />
        <label htmlFor="file-input" className="edit-icon">
          <i className="fa-solid fa-pencil"></i>
        </label>
        <input type="file" id="file-input" accept="image/*" onChange={handleImageChange} />
      </div>

      <div className="user-info">
        <h2 id="display-name">{name}</h2>
        <h2 id="display-email">{studentEmail}</h2>
      </div>

      <h2 className="details-heading">Your Details</h2>

      <div className="posts-info">
        <p>
          <span>Name</span>
          <input
            type="text"
            value={name}
            disabled={!isEditing}
            onChange={(e) => setName(e.target.value)}
          />
        </p>
        <p>
          <span>Student ID</span>
          <input
            type="text"
            value={studentId}
            disabled={!isEditing}
            onChange={(e) => setStudentId(e.target.value)}
          />
        </p>
        <p>
          <span>Degree</span>
          <input
            type="text"
            value={degree}
            disabled={!isEditing}
            onChange={(e) => setDegree(e.target.value)}
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
          />
        </p>
      </div>

      {!isEditing ? (
        <button onClick={() => setIsEditing(true)}>Edit Details</button>
      ) : (
        <button
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
