import React, { useEffect, useState } from "react";
import "./SDash.css";
import Chatbot from "../Chatbot";
import { useNavigate } from "react-router-dom";
import axios from 'axios';



const SDash = () => {
    const [menuVisible, setMenuVisible] = useState(false);
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
    const [goodVotes, setGoodVotes] = useState(0);
    const [badVotes, setBadVotes] = useState(0);
    const [hasVoted, setHasVoted] = useState(false);
    const navigate = useNavigate();

    const studentId = localStorage.getItem("studentId");

    useEffect(() => {
        fetchVoteCounts();
    }, []);

    // Fetch vote counts from the server
    const fetchVoteCounts = async () => {
        try {
            const response = await axios.get("/api/vote-counts");
            setGoodVotes(response.data.goodVotes);
            setBadVotes(response.data.badVotes);
        } catch (error) {
            console.error("Error fetching vote counts:", error);
        }
    };

    // Handle vote submission
    const handleVote = async (vote) => {
        if (hasVoted) {
            alert("You have already voted today.");
            return;
        }

        try {
            await axios.post("/api/vote", { studentId, vote });
            setHasVoted(true);
            fetchVoteCounts(); // Refresh vote counts
        } catch (error) {
            console.error("Error submitting vote:", error);
        }
    };

    const goToDashboard = () => {
        navigate("/SDash");
      };
    
      const goToMonthlyReport = () => {
        navigate("/monthly-report");
      };
    
      const goToOccupationalMeal = () => {
        navigate("/student-occasion");
      };
    
      const goToForm = () => {
        navigate("/stud-daily");
      };
    
      const goToLogout = () => {
        navigate("/");
      };
    
      const goToMyProfile = () => {
        navigate("/Profile");
      };
    
      const goToWhyFFF = () => {
        navigate("/about-us");
      };
    
      const goToNGO = () => {
        navigate("/NGO");
      };

      
    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prevIndex) => (prevIndex + 1) % texts.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex1((prevIndex) => (prevIndex + 1) % announcements.length);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div>
            <div className="dashS_fixed-header">
                <div className="dashS_shape">
                    <svg className="dashS_svg" viewBox="0 0 100 50" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0,0 H100 V35 L50,50 L0,35 Z" fill="rgba(26,25,25,1)" />
                    </svg>
                </div>
            </div>

            <div className="dashS_fixed-header">
                <div className="dashS_header-content">
                    <img src="logo.png" alt="FFF Logo" className="dashS_logo" />
                    <h1 className="dashS_header-text">Futility Food Fix</h1>
                </div>
            </div>

          <div className="dashS_center-container">
    Your Plate, Your Responsibility – Let’s Fix Food Waste
</div>

<div className="dashS_container" style={{ backgroundImage: `url(${texts[index].image})` }}>
    <div className="dashS_text-container">
        <div className="dashS_text animate">{texts[index].text}</div>
    </div>
</div>

<div className="dashS_announcement-container">
    <div className="dashS_announcement">{announcements[index1]}</div>
    {!menuVisible && (
    <div>
        <Chatbot />
    </div>
)}
</div>



            <div className="dashS_about-container">
                About the Developers
                <div className="dashS_developer-info">
                    {[
                        { name: "Chesta", role: "Frontend Developer, Passionate about UI/UX.", img: "Chesta.jpeg"},
                        { name: "Gauri", role: "Backend Developer, Expert in Databases.", img: "Gauri.jpeg"},
                        { name: "Juhi", role: "Full Stack Developer, Loves Coding Challenges.", img: "Juhii.jpeg" },
                        { name: "Khushi", role: "Software Engineer, Enjoys Problem Solving.", img: "khushi.jpeg" }
                    ].map((dev, i) => (
                        <div className="dashS_developer" key={i}>
                            <img src={dev.img} alt={dev.name} />
                            <div className="dashS_developer-name">{dev.name}</div>
                            <div className="dashS_developer-info-text">{dev.role}</div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="dashS_menu-container">
               <button 
    className="dashS_menu-button" 
    onClick={() => {
        const overlay = document.getElementById("menuOverlay");
        overlay.classList.toggle("dashS_active");
        setMenuVisible(!menuVisible); 
    }}
>
    &#9776;
</button>
<div className="voting-container">
                <button onClick={() => handleVote("good")} disabled={hasVoted}>
                    👍 {goodVotes}
                </button>
                <button onClick={() => handleVote("bad")} disabled={hasVoted}>
                    👎 {badVotes}
                </button>
            </div>

            </div>

            <div className="dashS_menu-overlay" id="menuOverlay">
            <button onClick={goToDashboard}>Dashboard</button>
      <button onClick={goToMonthlyReport}>Monthly Report</button>
      <button onClick={goToOccupationalMeal}>Occupational Meal</button>
      <button onClick={goToForm}>Form</button>
      <button onClick={goToLogout}>Logout</button>
      <button onClick={goToMyProfile}>My Profile</button>
      <button onClick={goToWhyFFF}>Why FFF</button>
      <button onClick={goToNGO}>NGO</button>
            </div>
        </div>
    );
};

export default SDash;
