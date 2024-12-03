import React from "react";
import "./JoinSpace.css"; // Import CSS for styling
import banner from "../images/bg2.jpg";
import search from '../images/search.png'

const JoinSpace = () => {

    const handleRedirect = (url) => {
        window.location.href = "/create-avatar"; 

        setTimeout(() => {
            window.location.href = url; // Proceed with the intended redirection
        }, 1000); // Delay of 1 second (adjust as needed)
    };

    return (
        <div className="join-space-container">
            {/* Upper Banner Section */}
            <div
                className="banner"
                onClick={() => handleRedirect("/map")}
            >
                <img
                    src={banner}
                    alt="Weekly Space Banner"
                    className="banner-image"
                />
            </div>

            {/* Lower Section */}
            <div className="lower-section">
                {/* Left Column - Hot Space */}
                <div className="column hot-space">
                    <h2>HOT</h2>
                    <div
                        className="square-box"
                        onClick={() => handleRedirect("/hot-space")}
                    ></div>
                </div>

                {/* Middle Column - Recent Space */}
                <div className="column recent-space">
                    <h2>RECENT</h2>
                    <div className="recent-list">
                        {["Blue Lock: เม้ามอยทีมชาติ", 
                        "Genshin Impact: นัทลานจึ้งมาก", 
                        "อ่านชะตาวันสิ้นโลก: แกร๊ ตอนล่าสุด มันไม่ได้ป้ะ TT", 
                        "Love&Deepspace: มาคุย lore กันดีกว่า", 
                        "Mashle: มาวาดรูปกันเถอะะะะ",
                        "The First Guide: มาค่ะ มาตั้งแผงขายนิยาย",
                        "Star Rails: กี้ดดดดด ดาวใหม่ค่ดจาดี"].map((space, index) => (
                            <div
                                key={index}
                                className="recent-item"
                                onClick={() => handleRedirect(`/space/${index + 1}`)}
                            >
                                {space}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Column */}
                <div class="right-space">
                    <div className="column right-column">
                        <h2>Enter Code</h2>
                        <form>
                        <input
                            className="form-control search-input"
                            type="search"
                            placeholder="Search"
                            aria-label="Search"
                        />
                        </form>
                    </div>
                    <div className="square-box" onClick={() => handleRedirect("/box1")}></div>
                    <div className="square-box" onClick={() => handleRedirect("/box2")}></div>
                    </div>

                </div>
            </div>
    );
};

export default JoinSpace;
