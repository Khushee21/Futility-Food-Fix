import React, { useState, useEffect } from "react";
import axios from "axios";
import { io } from "socket.io-client";

const WardenDashboard = () => {
  const [result, setResult] = useState(null);

  const fetchResults = async () => {
    try {
      const response = await axios.get("http://localhost:5066/api/occasional/results");
      if (response.data && response.data.success && response.data.data.length > 0) {
        setResult(response.data.data[0]);
        console.log("📥 Initial fetch result:", response.data.data[0]);
      }
    } catch (error) {
      console.error("Failed to fetch results:", error);
    }
  };

  useEffect(() => {
    fetchResults();

  
    const socket = io("http://localhost:5066");
    
    socket.on("connect", () => {
      console.log("🔗 Connected to Socket.IO server with ID:", socket.id);
    });

    socket.on("voteUpdate", (updatedOccasion) => {
      console.log("🚨 Real-time vote update received:", updatedOccasion);

  
      const winningMenu =
        updatedOccasion.menu1.votes > updatedOccasion.menu2.votes
          ? "Menu 1"
          : "Menu 2";

      setResult({
        occasion: updatedOccasion.occasion,
        winningMenu,
        votes: Math.max(updatedOccasion.menu1.votes, updatedOccasion.menu2.votes),
      });
    });

    socket.on("disconnect", () => {
      console.log("❌ Disconnected from Socket.IO server");
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  if (!result) {
    return <div>Loading results...</div>;
  }

  return (
    <div>
      <h1>Warden Dashboard</h1>
      <h2>
        Most demanding meal is:{" "}
        {result.winningMenu} with {result.votes} votes.
      </h2>
    </div>
  );
};

export default WardenDashboard;
