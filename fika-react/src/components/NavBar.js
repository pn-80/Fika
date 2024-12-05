import React from 'react';
import {Link,useNavigate } from 'react-router-dom';
import './style.css';
import Logo from "../images/logo.png";
import godMintImage from "../images/godMint.png";

const NavBar = () => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    const username = user ? user.username : null;
    const userRole = user ? user.role : null;
    const userImage = (user && user.userid === 2) ? godMintImage : (user ? user.image : null);

    const navigate = useNavigate(); // useNavigate hook from react-router-dom

    const handleAccountClick = () => {
        if (userRole === "god") {
            navigate('/god');
        } else if (userRole === "disciple") {
            navigate('/yourAccount');
        }
    };

    const handleLogout = () => {
        sessionStorage.removeItem("user");
        navigate('/');
    };

    return (
        <nav className="navbar navbar-expand-lg">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">
                        <img src={Logo} alt="Logo" style={{ height: '32px', width: 'auto' }} />
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <i className="fas fa-bars"></i>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ml-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a className="nav-link nav-link-1" href="join-space">Join Space</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link nav-link-2" href="draw">Draw</a>
                        </li>
                        <li className="nav-item ml-auto mb-2 mb-lg-0 mt-2 mt-lg-0">
                            <a className="nav-link nav-link-3" href="gallery">Gallery</a>
                        </li>
                    </ul>
                </div>

                
                <ul className="navbar-nav ms-auto mb-lg-0 mt-lg-0" id="useraccount">
                    <li className="nav-item">
                        <button className="nav-link logout-link" onClick={handleLogout}>
                            Log Out
                        </button>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link nav-link-useraccount" onClick={handleAccountClick}>
                            <span className="mr-2" style={{fontSize: '20px'}}>
                                {username}
                                <img
                                    src={userImage}
                                    alt="User Avatar"
                                    className="rounded-circle"
                                    style={{ height: '50px', width: '50px', marginLeft: '15px' }}
                                />
                            </span>
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
    );
}
export default NavBar;