import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // For API calls
import "./SDash.css";

import logo from "./logo.png";

const SDash = () => {
    const texts = [
        { text: "Hello I am juhi ", image: "https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=600" },
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
    // const studentId = "12345"; // Replace with actual student ID
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const studentId = localStorage.getItem("studentId");

    // Fetch vote counts on component mount
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

    // Toggle menu visibility
    const toggleMenu = () => {
        setIsMenuOpen((prevState) => !prevState);
    };

    // Navigate to dashboard
    const goToDashboard = () => {
        setIsMenuOpen(false);
        navigate("/SDash");
    };

    const goToMyProfile = () => {
        setIsMenuOpen(false);
        navigate("/my-profile");
    };

    // Navigate to occupational meal page
    const goToOccupationalMeal = () => {
        setIsMenuOpen(false);
        navigate("/Studentoccasion");
    };

    // Handle logout
    const handleLogout = () => {
        const confirmLogout = window.confirm("Are you sure you want to logout?");
        if (confirmLogout) {
            localStorage.removeItem("userData");
            // localStorage.removeItem("studentId");
            navigate("/signin");
        }
    };

    return (
        <div>
            {/* Fixed Header */}
            <div className="fixed-header">
                <div className="shape">
                    <svg viewBox="0 0 100 50" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0,0 H100 V35 L50,50 L0,35 Z" fill="rgba(26,25,25,1)" />
                    </svg>
                </div>
            </div>

            {/* Header Content */}
            <div className="fixed-header">
                <div className="header-content">
                    <img src={logo} alt="FFF Logo" className="logo" />
                    <h1 className="header-text">Futility Food Fix</h1>
                </div>
            </div>

            {/* Tagline */}
            <div className="tagline-container">
                Your Plate, Your Responsibility – Let’s Fix Food Waste
            </div>

            {/* Rotating Text and Image */}
            <div className="container" style={{ backgroundImage: `url(${texts[index].image})` }}>
                <div className="text-container">
                    <div className="text animate">{texts[index].text}</div>
                </div>
            </div>

            {/* Announcements */}
            <div className="container11">
                <div className="announcement-container11">
                    <div className="announcement">{announcements[index1]}</div>
                </div>
            </div>

            {/* About Developers Section */}
            <div className="about-container">
                About the Developers
                <div className="developer-info">
                    {[
                        { name: "Chesta", role: "Frontend Developer, Passionate about UI/UX.", img: "https://tse4.mm.bing.net/th?id=OIP.eD7MpRmuCp5oKFlcdoKmuwHaE8&pid=Api&P=0&h=180" },
                        { name: "Gauri", role: "Backend Developer, Expert in Databases.", img: "https://tse4.mm.bing.net/th?id=OIP.cXzAqs3GQ-sAFDbD7jUgpgHaFj&pid=Api&P=0&h=180" },
                        { name: "Juhi", role: "Full Stack Developer, Loves Coding Challenges.", img: "https://imgmedia.lbb.in/media/2019/08/5d662c8ea84656a7661be92a_1566977166741.jpg" },
                        { name: "Khushi", role: "Software Engineer, Enjoys Problem Solving.", img: "https://tse3.mm.bing.net/th?id=OIP.W9RFknwcGfgpMFJFhQurjgHaEK&pid=Api&P=0&h=180" }
                    ].map((dev, i) => (
                        <div className="developer" key={i}>
                            <img src={dev.img} alt={dev.name} />
                            <div className="developer-name">{dev.name}</div>
                            <div className="developer-info-text">{dev.role}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Voting Section */}
            <div className="voting-container">
                <button onClick={() => handleVote("good")} disabled={hasVoted}>
                    👍 {goodVotes}
                </button>
                <button onClick={() => handleVote("bad")} disabled={hasVoted}>
                    👎 {badVotes}
                </button>
            </div>

            {/* Menu Overlay */}
            <div className={`menu-overlay ${isMenuOpen ? 'active' : ''}`} id="menuOverlay">
                <button onClick={goToDashboard}>Dashboard</button>
                <button onClick={goToOccupationalMeal}>Occupational Meal</button>
                <button onClick={goToMyProfile}>My Profile</button>
                {["monthly_report.html", "form.html", "why_fff.html"].map((page, i) => (
                    <button key={i} onClick={() => window.location.href = page}>
                        {page.replace(".html", "").replace("_", " ")}
                    </button>
                ))}
                <button onClick={handleLogout}>Logout</button>
            </div>

            {/* Menu Button */}
            <div className="menu-container">
                <button className="menu-button" onClick={toggleMenu}>
                    &#9776; {/* Hamburger Icon */}
                </button>
            </div>
        </div>
    );
};

export default SDash;