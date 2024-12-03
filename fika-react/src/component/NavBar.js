import React from 'react';
import {Link} from 'react-router-dom';
import './style.css';
import Logo from "../images/logo.png";

const NavBar = () => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    const username = user ? user.username : null;
    const userImage = (user && user.id === 2) ? './images/godMint.png' : (user ? user.image : null);

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
                        <a className="nav-link useraccount" href="yourAccount">
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