import React, { useEffect,useState } from "react";
import "./Login.css"; // If you want to keep styles in a separate file
import cha1 from "../images/cha1.png";
import cha2 from "../images/cha2.png";
import cha3 from "../images/cha3.png";
import CryptoJS from "crypto-js";
import "./style.css";

const Login = () => {
    const images = [
        cha1,
        cha2,
        cha3
      ];
      const randomImage = images[Math.floor(Math.random() * images.length)];
      
      const [inputusername, setInputUsername] = useState('');
      const [inputpassword, setInputPassword] = useState('');
      const [modalVisible, setModalVisible] = useState(false);
      const [errorMessage, setErrorMessage] = useState('');
      
      const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!inputusername && !inputpassword) {
          console.log("Username and password are required");
          setModalVisible(true);
          setErrorMessage("Username and password are required");
          return;
        }

        const requestOptions = {
          method: "POST",
          body:  JSON.stringify({ username: inputusername }),
          headers: {
            "Content-Type": "application/json",
          },
        };
        const response = await fetch("http://localhost:3001/api/check-username",requestOptions);

        const data = await response.json();

        if (!response.ok) {
          console.log(data);
          setModalVisible(true);
          setErrorMessage(data.message);
        }

        console.log(data);
        const hashedPassword = CryptoJS.MD5(data[0].salt+inputpassword).toString();

        

        if (data[0].password === hashedPassword) {
          console.log('Login successful',data[0].username);
          
          const loginData = {
            userid: data[0].user_id,
            username: data[0].username,
            role: data[0].role,
            image: randomImage
          };
    
          sessionStorage.setItem('user', JSON.stringify(loginData));
          console.log("User data stored in sessionStorage:", loginData);
          window.location.href = "/join-space"; // Redirect after successful login
        
        } else {
          setModalVisible(true);
          setErrorMessage('Incorrect password');
        }
      };

      const handleClose = () => {
        setModalVisible(false); // Close the modal
      };

  return (
    <div style={{ backgroundColor: "#2c2936", height: "100vh", padding: "20px" }}>
      <div style={{ textAlign: "center" }}>
        <h1 style={{ fontSize: "4rem", fontWeight: "bold", color: "#f9ffba" }}>
          Hello, Travellers <br />
          Pls Register HERE
        </h1>
      </div>
      <div className="login-container">
        <div className="login-card">
            <div className="image-section">
                <img src={randomImage} alt="Random Traveler" className="card-image" />
            </div>
            <div className="form-section">
            <form onSubmit={handleSubmit}>
              <div className="input-group">
                <label htmlFor="username">Username</label>
                <input type="text" id="username" name="username" value={inputusername} onChange={(e) => setInputUsername(e.target.value)}/>
              </div>
              <div className="input-group">
                  <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" value={inputpassword} onChange={(e) => setInputPassword(e.target.value)}/>
              </div>
              <a href="/register" className="no-account">New face? Click here to register</a>
              <div className="login-submit-btn"> <button type="submit">Submit</button> </div>
              </form>
          </div>
        </div>
      </div>
      {modalVisible && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>{errorMessage}</h2>
            <button className="btn btn-danger" onClick={handleClose}>Okay</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
