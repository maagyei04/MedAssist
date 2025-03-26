import React, { useState } from "react";
import "./Appointment.css";
import { motion } from "framer-motion";
import DoctorInfo from "../Reusables/DoctorInfo";
import { Doctors } from "./Doctors";

function Appointment() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  function handleContact() {
    setIsModalOpen(true);
  }

  return (
    <div className="appointmentBoard">
      {Doctors.map((item, index) => (
        <motion.div
          whileHover={{
            scale: 1.1,
            boxShadow: "0 8px 16px rgba(0, 0, 0, 0.3)",
            transition: { duration: 0.3 },
          }}
          style={{
            overflow: "hidden",
            borderRadius: "15px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            backgroundColor: "#fff",
            cursor: "pointer",
          }}
        >
          <DoctorInfo
            source={item.image}
            name={item.details.name}
            age={item.details.age}
            hospital={item.details.Hostipital}
            speciality={item.details.Specialist}
            oncontact={handleContact}
          />
        </motion.div>
      ))}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <span className="close" onClick={() => setIsModalOpen(false)}>
              &times;
            </span>
            <h2>Contact Information</h2>

            {/* Input Fields */}
            <div className="modal-input">
              <label>Name:</label>
              <input
                type="text"
                placeholder="Enter your name"
                className="input-field"
              />
            </div>

            <div className="modal-input">
              <label>Email:</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="input-field"
              />
            </div>

            {/* Buttons */}
            <div className="modal-buttons">
              <button className="call-btn">Request Call</button>
              <button
                onClick={() =>
                  window.open(
                    "https://mail.google.com/mail/?view=cm&fs=1&to=marfoofficial111@gmail.com",
                    "_blank"
                  )
                }
                className="email-btn"
              >
                Approach via Email
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Appointment;
