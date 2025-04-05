import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";

const WardenDashboard = () => {
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false); // Track socket connection status

  useEffect(() => {
    // Dynamically setting socket server URL (use VITE_ prefix for Vite)
    const socketURL = import.meta.env.VITE_SOCKET_SERVER_URL || "http://localhost:5066"; // Vite environment variable

    const socketInstance = io(socketURL);

    // Setting socket instance to state
    setSocket(socketInstance);

    // Handling socket connection
    socketInstance.on("connect", () => {
      console.log("🔗 Connected to Socket.IO server with ID:", socketInstance.id);
      setIsConnected(true); // Set connection status to true
    });

    // Handling socket disconnection
    socketInstance.on("disconnect", () => {
      console.log("❌ Disconnected from Socket.IO server");
      setIsConnected(false); // Set connection status to false
    });

    // Cleanup the socket connection on component unmount
    return () => {
      socketInstance.disconnect();
    };
  }, []);

  // Function to send the report (triggered by the button click)
  const sendReport = () => {
    if (socket && socket.connected) {
      console.log("📤 Sending report to server...");

      // Emitting event with report data
      socket.emit(
        "sendReport",
        {
          subject: "Report",
          message: "Here is the report", // Adjust as necessary
        },
        (response) => {
          console.log("📬 Response from server:", response); // Log the server's response
          if (response.success) {
            alert("Emails sent successfully!");
          } else {
            alert("Failed to send emails: " + response.message);
          }
        }
      );
    } else {
      console.error("❌ Socket is not connected.");
      alert("Unable to send report. Please try again later.");
    }
  };

  return (
    <div>
      <h1>Warden Dashboard</h1>
      <p>Status: {isConnected ? "Connected" : "Disconnected"}</p>
      <button onClick={sendReport} disabled={!isConnected}>
        Send Report to Parents
      </button>
    </div>
  );
};

export default WardenDashboard;
