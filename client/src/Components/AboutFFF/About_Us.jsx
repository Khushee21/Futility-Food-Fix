import React from "react";

import styles from "./S.module.css"; 
import { useNavigate } from "react-router-dom";


const handleClose=()=>{
  navigate("/WDash");
}
const About_Us = () => {

  const navigate = useNavigate();

  const handleClose=()=>{
    navigate("/WDash");
  }
  return (
    <div className={styles.Abt_container}>
      <div className={styles.Abt_serviceWrapper}>    
      <button className={styles.closeButton} onClick={handleClose}>
          close
        </button>    
        <div className={styles.Abt_service}>
          <h1>Why FFF?</h1>
          <p>
            Our FFF (Futility Food Fix) system is designed to minimize food
            wastage, enhance meal planning, and ensure better student engagement
            in hostel mess management.
          </p>
          <div className={styles.Abt_cards}>
            <div className={styles.Abt_card}>
              <i className="fa-brands fa-chromecast"></i>
              <h2>Planning & Notifications</h2>
              <p>
                Every day, wardens generate meal forms where students can mark
                their attendance for meals in advance. This helps in estimating
                the exact number of meals required.
                <br/>
                Students receive notifications about the meal options for the
                day, ensuring they can make an informed decision on whether they
                will eat in the mess.
              </p>
            </div>
            <div className={styles.Abt_card}>
              <i className="fa-solid fa-layer-group"></i>
              <h2>Waste Reduction</h2>
              <p>
                Since students provide their meal attendance in advance, wardens
                can prepare meals accordingly, reducing unnecessary food
                wastage.
                <br />
                Any leftover food is systematically recorded and donated to
                NGOs, ensuring that excess food benefits those in need rather
                than going to waste.
              </p>
            </div>
            <div className={styles.Abt_card}>
              <i className="fa-solid fa-gear"></i>
              <h2>Attendance Tracking</h2>
              <p>
                The system records which students actually come to eat based on
                their prior confirmation, ensuring proper tracking of meals.
                <br />
                <br />
                If a student confirms their attendance but does not show up
                three times, they receive a notification.
              </p>
            </div>
            <div className={styles.Abt_card}>
              <i className="fa-brands fa-chromecast"></i>
              <h2>Feedback System</h2>
              <p>
                Students can rate and review meals, providing feedback on
                quality, taste, portion size, and hygiene.
                <br />
                Based on student feedback, wardens can make improvements in food
                quality, menu planning, and portion control.
              </p>
            </div>
            <div className={styles.Abt_card}>
              <i className="fa-solid fa-layer-group"></i>
              <h2>Reports & Insights</h2>
              <p>
                The system generates reports on student attendance, food
                consumption patterns, and meal feedback, ensuring transparency
                and improvement.
                <br />
                <br />
                By analyzing these reports, wardens can adjust meal quantities,
                improve budgeting, and enhance overall mess efficiency.
              </p>
            </div>
            <div className={styles.Abt_card}>
              <i className="fa-solid fa-gear"></i>
              <h2>User-Friendly System</h2>
              <p>
                FFF has a clean and intuitive user interface, making it easy for
                students to mark attendance, provide feedback, and access
                reports.
                <br />
                <br />
                The website integrates features like attendance tracking,
                feedback collection, and reporting in one place, ensuring smooth
                operation without any technical complications.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About_Us;