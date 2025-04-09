import React, { useState, useEffect, useRef } from "react";
import { FaRobot } from "react-icons/fa";

const Chatbot = () => {
    const [messages, setMessages] = useState([
        { text: "Hello This id ChatoriBot 🤖", sender: "bot" }
    ]);
    const [input, setInput] = useState("");
    const [open, setOpen] = useState(false);
    const messagesEndRef = useRef(null);

    const handleSend = () => {
        if (input.trim() === "") return;

        const userMessage = { text: input, sender: "user" };
        const botResponse = getBotResponse(input);

        setMessages([...messages, userMessage, botResponse]);
        setInput("");
    };

    const getBotResponse = (msg) => {
        const lowerMsg = msg.toLowerCase();

        if (lowerMsg.includes("hello")) return { text: "how can i assist you?", sender: "bot" };
        if (lowerMsg.includes("how are you")) return { text: "I'm just a bot, but I'm doing great! 🚀", sender: "bot" };
        if (lowerMsg.includes("help")) return { text: "Sure! What do you need help with? ", sender: "bot" };
        if (lowerMsg.includes("features")) return { text: "this is an amazing site , let me know who are you student or warden"}
        

        return { text: "I'm not sure about that, but I'm learning! 💡", sender: "bot" };
    };

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        <div
            style={{
                position: "fixed",

                bottom: "20px",
                right: "20px",
                zIndex: 9999,
                 
            }}
        >
            {/* Toggle Button */}
            <button
                onClick={() => setOpen(!open)}
                style={{
                    backgroundColor: "#000",
                    border:"2px solid white",
                    borderRadius: "50%",
                    width: "50px",
                    height: "50px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    cursor: "pointer",
                    boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
                    
                }}
            >
                <FaRobot size={24} />
            </button>

            {/* Chatbox */}
            {open && (
                <div
                    style={{
                        width: "350px",
                        height: "450px",
                        backgroundColor: "#000",
                        borderRadius: "10px",
                        marginTop: "10px",
                        display: "flex",
                        flexDirection: "column",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                        border: "1px solid #333",
                      
                    }}
                >
                    {/* Header */}
                    <div
                        style={{
                            backgroundColor: "#111",
                            color: "white",
                            padding: "10px",
                            fontWeight: "bold",
                            textAlign: "center",
                            borderTopLeftRadius: "10px",
                            borderTopRightRadius: "10px"
                        }}
                    >
                        Chatbot 🤖
                    </div>

                    {/* Scrollable Messages */}
                    <div
                        style={{
                            flex: 1,
                            padding: "10px",
                            overflowY: "auto",
                            display: "flex",
                            flexDirection: "column",
                            gap: "10px"
                        }}
                    >
                        {messages.map((msg, index) => (
                            <div
                                key={index}
                                style={{
                                    alignSelf: msg.sender === "user" ? "flex-end" : "flex-start",
                                    backgroundColor: msg.sender === "user" ? "#fff" : "#333",
                                    color: msg.sender === "user" ? "#000" : "#ddd",
                                    padding: "8px 12px",
                                    borderRadius: "15px",
                                    maxWidth: "70%",
                                    wordWrap: "break-word"
                                }}
                            >
                                {msg.text}
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Area */}
                    <div
                        style={{
                            display: "flex",
                            padding: "10px",
                            borderTop: "1px solid #333",
                            gap: "10px",
                            backgroundColor: "#111"
                        }}
                    >
                        <input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            style={{
                                flex: 1,
                                padding: "8px",
                                borderRadius: "20px",
                                border: "1px solid #444",
                                backgroundColor: "#000",
                                color: "#fff"
                            }}
                            placeholder="Type your message..."
                        />
                        <button
                            onClick={handleSend}
                            style={{
                                padding: "8px 16px",
                                borderRadius: "20px",
                                border: "none",
                                backgroundColor: "#fff",
                                color: "#000",
                                cursor: "pointer"
                            }}
                        >
                            Send
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Chatbot;
