import React, { useState, useEffect } from "react";
import "../css/UserProfile.css";
import toast from "react-hot-toast";

const UserProfile = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const authToken = localStorage.getItem("token");
        if (!authToken) {
          console.error("Authentication token not found.");
          return;
        }

        const response = await fetch(
          "http://localhost:5000/users/userprofile",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error("Error fetching user data:", error.message);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Logout Successfull");
    window.location.href = "/";
  };

  return (
    <div className="profile-container">
      {userData ? (
        <div className="profile-info">
          <h1>Hello, {userData.username}</h1>
          <p>Email: {userData.email}</p>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      ) : (
        <p className="loading">Loading...</p>
      )}
    </div>
  );
};

export default UserProfile;
