import React, { useEffect, useState } from "react";
import "./SDash.css";

const SDash = () => {
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
            <div className="fixed-header">
                <div className="shape">
                    <svg viewBox="0 0 100 50" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0,0 H100 V35 L50,50 L0,35 Z" fill="rgba(26,25,25,1)" />
                    </svg>
                </div>
            </div>

            <div className="fixed-header">
                <div className="header-content">
                    <img src="logo.png" alt="FFF Logo" className="logo" />
                    <h1 className="header-text">Futility Food Fix</h1>
                </div>
            </div>

            <div className="tagline-container">
                Your Plate, Your Responsibility – Let’s Fix Food Waste
            </div>

            <div className="container" style={{ backgroundImage: `url(${texts[index].image})` }}>
                <div className="text-container">
                    <div className="text animate">{texts[index].text}</div>
                </div>
            </div>

            <div className="container11">
                <div className="announcement-container11">
                    <div className="announcement">{announcements[index1]}</div>
                </div>
            </div>

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

            <div className="menu-container">
                <button className="menu-button" onClick={() => document.getElementById("menuOverlay").classList.toggle("active")}>
                    &#9776;
                </button>
            </div>

            <div className="menu-overlay" id="menuOverlay">
                {["dashboard.html", "monthly_report.html", "occupational_meal.html", "form.html", "logout.html", "my_profile.html", "why_fff.html"].map((page, i) => (
                    <button key={i} onClick={() => window.location.href = page}>{page.replace(".html", "").replace("_", " ")}</button>
                ))}
            </div>
        </div>
    );
};

export default SDash;
