import React, { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { motion } from "framer-motion";
import "./NGO.css";

const initialNGOs = [
  {
    name: "Helping Hands",
    image: "/hh.jpg",
    contact: "+91 9876543210",
    website: "https://helpinghands.org",
    data: [
      { month: "Jan", food: 50 },
      { month: "Feb", food: 80 },
      { month: "Mar", food: 65 },
    ],
  },
  {
    name: "Care & Share",
    image: "cs.png",
    contact: "+91 9123456780",
    website: "https://careandshare.org",
    data: [
      { month: "Jan", food: 40 },
      { month: "Feb", food: 60 },
      { month: "Mar", food: 70 },
    ],
  },
  {
    name: "Food For All",
    image: "ffa.jpg",
    contact: "+91 9988776655",
    website: "https://foodforall.org",
    data: [
      { month: "Jan", food: 90 },
      { month: "Feb", food: 75 },
      { month: "Mar", food: 85 },
    ],
  },
  {
    name: "Life Givers",
    image: "lg.jpg",
    contact: "+91 9876123450",
    website: "https://lifegivers.org",
    data: [
      { month: "Jan", food: 55 },
      { month: "Feb", food: 95 },
      { month: "Mar", food: 60 },
    ],
  },
  {
    name: "Smile Foundation",
    image: "sf.jpg",
    contact: "+91 9012345678",
    website: "https://smilefoundation.org",
    data: [
      { month: "Jan", food: 70 },
      { month: "Feb", food: 85 },
      { month: "Mar", food: 90 },
    ],
  },
];

const taglines = [
  "Feeding Hope, One Meal at a Time",
  "Together We Can End Hunger",
  "Sharing Food, Spreading Smiles",
  "Be the Change, Feed a Life",
  "Compassion in Action",
];

const NGO = () => {
  const [ngos, setNgos] = useState(() => {
    const stored = localStorage.getItem("ngoData");
    return stored ? JSON.parse(stored) : initialNGOs;
  });

  const [selectedNGO, setSelectedNGO] = useState(null);
  const [month, setMonth] = useState("");
  const [quantity, setQuantity] = useState("");
  const [taglineIndex, setTaglineIndex] = useState(0);
  const [selectedMonth, setSelectedMonth] = useState(null);

  // Tagline rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setTaglineIndex((prevIndex) => (prevIndex + 1) % taglines.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

 const handleAddEntry = () => {
  if (!month || !quantity || !selectedNGO) return;

  const updatedData = [...selectedNGO.data];
  const lastEntry = updatedData[updatedData.length - 1];
  const existingIndex = updatedData.findIndex((entry) => entry.month === month);

  const monthOrder = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const lastMonthIndex = monthOrder.indexOf(lastEntry.month);
  const enteredMonthIndex = monthOrder.indexOf(month);

  if (enteredMonthIndex === -1) {
    alert("Please enter a valid 3-letter month abbreviation (e.g. Jan, Feb)");
    return;
  }

  if (enteredMonthIndex < lastMonthIndex) {
    alert(`You cannot add food to past months. Last available month: ${lastEntry.month}`);
    return;
  }

  if (enteredMonthIndex === lastMonthIndex) {
    // ✅ Update last month
    updatedData[updatedData.length - 1].food += parseInt(quantity);
  } else if (enteredMonthIndex === lastMonthIndex + 1) {
    // ✅ Add new month
    updatedData.push({ month, food: parseInt(quantity) });
  } else {
    alert(`You can only add to "${lastEntry.month}" or the next month.`);
    return;
  }

  const updatedNGO = { ...selectedNGO, data: updatedData };
  const updatedNGOs = ngos.map((ngo) =>
    ngo.name === selectedNGO.name ? updatedNGO : ngo
  );

  setNgos(updatedNGOs);
  setSelectedNGO(updatedNGO);
  localStorage.setItem("ngoData", JSON.stringify(updatedNGOs)); // persist

  setMonth("");
  setQuantity("");
};


  return (
    <div className="NGO_page-container">
      <div className="NGO_centered-wrapper">
        <div className="NGO_header">
          <h1>Our NGOs</h1>
          <motion.p
            key={taglineIndex}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.5 }}
            className="NGO_tagline"
          >
            {taglines[taglineIndex]}
          </motion.p>
        </div>

        <div className="NGO_content-container">
      <div className="NGO_ngo-list">
  <h2 className="NGO_section-heading NGO_left-heading">Select an NGO</h2>
  <ul className="NGO_ngo-ul">
    {ngos.map((ngo, index) => (
      <li
        key={index}
        onClick={() => setSelectedNGO(ngo)}
        className="NGO_ngo-item"
      >
        {ngo.name}
      </li>
    ))}
  </ul>

  {/* Add Entry Form */}
  {selectedNGO && (
    <div className="NGO_add-entry-form">
      <h3>Add Food Entry</h3>
      <input
        type="text"
        placeholder="Month (e.g. Apr)"
        value={month}
        onChange={(e) => setMonth(e.target.value)}
      />
     <input
  type="number"
  placeholder="Quantity"
  value={quantity}
  onChange={(e) => setQuantity(e.target.value)}
  style={{
    border: "1px solid #ccc",
    padding: "8px",
    borderRadius: "6px",
  }}
/>
      <button onClick={handleAddEntry}>Add</button>
    </div>
  )}
</div>



          <div className="NGO_ngo-details">
            {selectedNGO ? (
              <div>
              {selectedNGO && <h2 className="NGO_section-heading NGO_right-heading">{selectedNGO.name}</h2>}
                <img
                  src={selectedNGO.image}
                  alt={selectedNGO.name}
                  className="NGO_ngo-image"
                />
                <p style={{ marginTop: "3px"}}>
  <strong>Contact:</strong> {selectedNGO.contact}
</p>
                <p  style={{ marginTop: "14px" ,marginBottom:"30px"}}>
                  <strong>Website:</strong>{" "}
                  <a href={selectedNGO.website} target="_blank" rel="noreferrer">
                    {selectedNGO.website}
                  </a>
                </p>
             <BarChart width={250} height={200} data={selectedNGO.data}>
  <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
  <XAxis dataKey="month" stroke="#fff" />
  <YAxis stroke="#fff" />
  <Tooltip
    contentStyle={{
      backgroundColor: "#333",
      borderRadius: "10px",
      color: "#fff",
      border: "none"
    }}
    itemStyle={{ color: "#ffcc00" }}
    cursor={{ fill: 'rgba(255, 204, 0, 0.2)' }}
  />
  <Bar
    dataKey="food"
    fill="#ffcc00"
    radius={[5, 5, 0, 0]}
    onClick={(data) => {
  console.log("Clicked bar:", data);
  setSelectedMonth(data);
}}

    
  />
</BarChart>





              </div>
            ) : (
              <p>Select an NGO to see details</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NGO;
