import React, { useEffect, useState } from "react";
import { FaEdit, FaThumbsUp, FaThumbsDown, FaCloudUploadAlt, FaCalendarCheck } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Chatbot from "../Chatbot";
import "./WDash.css";

const WDash = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const texts = [
        { text: "Hello I am Chesta Sharma", image: "https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=600" },
        { text: "Welcome to this page", image: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=600" },
        { text: "JavaScript Animations are good, right?", image: "https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=600" },
        { text: "Then Enjoy! Bro...", image: "https://images.pexels.com/photos/784633/pexels-photo-784633.jpeg?auto=compress&cs=tinysrgb&w=600" }
    ];

    const announcements = [
        "🎉 Holiday on Friday! 🎉",
        "📢 Exam Timetable Released! 📝",
        "🏆 Sports Meet This Sunday! ⚽🏀",
        "💡 Workshop on AI & ML – Register Now! 🤖"
    ];

    const [index, setIndex] = useState(0);
    const [index1, setIndex1] = useState(0);
    const [isEditing, setIsEditing] = useState(false); 
    const [editedText, setEditedText] = useState(announcements[index1]);
    const navigate = useNavigate();

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prevIndex) => (prevIndex + 1) % texts.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex1((prevIndex) => (prevIndex + 1) % announcements.length);
            setEditedText(announcements[(index1 + 1) % announcements.length]);
        }, 4000);
        return () => clearInterval(interval);
    }, [index1]);

    useEffect(() => {
        document.body.style.paddingTop = "150px";
        return () => {
            document.body.style.paddingTop = "";
        };
    }, []);

    return (
        <div>
            {/* ☰ Menu Button Always Visible */}
            <div className="WashS_menu-container">
  <button
    className="WashS_menu-button"
    onClick={() => {
      const overlay = document.getElementById("menuOverlay");
      overlay.classList.toggle("WashS_active");
      setMenuOpen(prev => !prev);
    }}
  >
    &#9776;
  </button>
</div>

{/* Overlay Menu */}
<div className={`WashS_menu-overlay ${menuOpen ? "WashS_active" : ""}`} id="menuOverlay">
  {[
    "Dashboard.html",
    "Upload_Occasion_Form.html",
    "Monthly_Report.html",
    "Id Of Student Who Missed Meal Today.html",
    "My_Profile.html",
    "Why_FFF.html",
    "Logout.html",
    "NGO.html"
  ].map((page, i) => (
    <button key={i} onClick={() => window.location.href = page}>
      {page.replace(".html", "").replace(/_/g, " ")}
    </button>
  ))}
</div>


            {/* Main Page Hidden When Menu is Open */}
            {!menuOpen && (
                <>
                    <div className="WashS_fixed-header">
                        <div className="WashS_shape">
                            <svg className="WashS_svg" viewBox="0 0 100 50" preserveAspectRatio="none">
                                <path d="M0,0 H100 V35 L50,50 L0,35 Z" fill="rgba(26,25,25,1)" />
                            </svg>
                        </div>
                    </div>

                    <div className="WashS_fixed-header">
                        <div className="WashS_header-content">
                            <img src="logo.png" alt="FFF Logo" className="WashS_logo" />
                            <h1 className="WashS_header-text">Futility Food Fix</h1>
                        </div>
                    </div>

                    <div className="WashS_center-container">
                        Your Plate, Your Responsibility – Let’s Fix Food Waste
                    </div>

                    <div className="WashS_container" style={{ backgroundImage: `url(${texts[index].image})` }}>
                        <div className="WashS_text-container">
                            <div className="WashS_text animate">{texts[index].text}</div>
                        </div>
                    </div>

                    <div className="WashS_announcement-container">
                        {isEditing ? (
                            <input
                                type="text"
                                className="WashS_edit-input"
                                value={editedText}
                                onChange={(e) => setEditedText(e.target.value)}
                                onBlur={() => setIsEditing(false)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") setIsEditing(false);
                                }}
                                autoFocus
                            />
                        ) : (
                            <div className="WashS_announcement">
                                {editedText}
                                <FaEdit className="WashS_edit-icon" onClick={() => setIsEditing(true)} />
                            </div>
                        )}
                    </div>

                    <div className="WashS_meal-button-wrapper">
                        <button className="WashS_meal-button" onClick={() => navigate("/meal-entries")}>
                            🍽️ View Today's Meal Entries
                        </button>
                        <div className="WashS_vote-buttons">
                            <button className="WashS_vote-button WashS_upvote">
                                <FaThumbsUp /> 5
                            </button>
                            <button className="WashS_vote-button WashS_downvote">
                                <FaThumbsDown /> 3
                            </button>
                        </div>
                    </div>

                    <div className="WashS_button-container">
                        <button className="WashS_upload-form-button" onClick={() => navigate("/meal-entries")}>
                            <FaCloudUploadAlt size={20} style={{ marginRight: "8px" }} />
                            Upload Tomorrow Form
                        </button>

                        <button className="WashS_upload-form-button" onClick={() => navigate("/meal-entries")}>
                            <FaCalendarCheck size={20} style={{ marginRight: "8px" }} />
                            View Next Occasion Votes
                        </button>

                        <div><Chatbot /></div>
                    </div>

                    <div className="WashS_about-container">
                        About the Developers
                        <div className="WashS_developer-info">
                            {[
                                { name: "Chesta", role: "Frontend Developer, Passionate about UI/UX.", img: "https://tse4.mm.bing.net/th?id=OIP.eD7MpRmuCp5oKFlcdoKmuwHaE8&pid=Api&P=0&h=180" },
                                { name: "Gauri", role: "Backend Developer, Expert in Databases.", img: "https://tse4.mm.bing.net/th?id=OIP.cXzAqs3GQ-sAFDbD7jUgpgHaFj&pid=Api&P=0&h=180" },
                                { name: "Juhi", role: "Full Stack Developer, Loves Coding Challenges.", img: "https://imgmedia.lbb.in/media/2019/08/5d662c8ea84656a7661be92a_1566977166741.jpg" },
                                { name: "Khushi", role: "Software Engineer, Enjoys Problem Solving.", img: "https://tse3.mm.bing.net/th?id=OIP.W9RFknwcGfgpMFJFhQurjgHaEK&pid=Api&P=0&h=180" }
                            ].map((dev, i) => (
                                <div className="WashS_developer" key={i}>
                                    <img src={dev.img} alt={dev.name} />
                                    <div className="WashS_developer-name">{dev.name}</div>
                                    <div className="WashS_developer-info-text">{dev.role}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default WDash;
