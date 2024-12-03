import React, { useEffect,useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CustomImageList from "./CustomImageList";

const FikaWelcome = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if the 'user' exists in sessionStorage
    if (sessionStorage.getItem('user')) {
      setIsLoggedIn(true); // Set state to true if user exists
    }
  }, []);
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "100vh",
          backgroundColor: "#7c87cd",
          padding: "50px",
          boxSizing: "border-box",
        }}
      >
        {/* Left Content */}
        <div
          className="left-content"
          style={{
            flex: 1,
            maxWidth: "50%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <h1
            className="title"
            style={{
              fontSize: "4rem",
              fontWeight: "bold",
              margin: "0",
              color: "#333",
            }}
          >
            Fika
          </h1>
          <p
            className="description"
            style={{
              fontSize: "1.2rem",
              color: "#333",
              margin: "10px 0",
            }}
          >
            A virtual community platform to connect like-minded people.
          </p>
          <Link
          to={isLoggedIn ? "/join-space" : "/login"}  // Conditional link based on sessionStorage
          className="button"
          style={{
            display: "inline-block",
            padding: "10px 20px",
            fontSize: "1rem",
            color: "#000",
            backgroundColor: "#bcddff",
            border: "none",
            width: "80px",
            borderRadius: "5px",
            textDecoration: "none",
            marginTop: "10px",
            cursor: "pointer",
          }}
        >
          Start
        </Link>
        </div>
  
        {/* Right Content: Image List */}
        <div
          className="carousel-container"
          style={{
            flex: 1,
            maxWidth: "50%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <CustomImageList />
        </div>
      </div>
    );
  }
  export default FikaWelcome;