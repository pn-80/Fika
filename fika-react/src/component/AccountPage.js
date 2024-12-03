import React, { useState, useEffect } from 'react';
import SearchBox from './SearchBox';
import './style.css';

const AccountPage = () => {
  const [spaces, setSpaces] = useState([]);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchSpaces = async () => {
      try {
        const user = JSON.parse(sessionStorage.getItem("user"));
        const userID = user.userid;

        const requestOptions = {
          method: "POST",
          body: JSON.stringify({ userid: userID }),
          headers: {
            "Content-Type": "application/json",
          },
        };

        const response = await fetch("http://localhost:3001/api/check-spaces-from-user", requestOptions);

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const spacesData = await response.json();
        setSpaces(spacesData);
      } catch (error) {
        setError(error.message);
        console.error('There was a problem with the fetch operation:', error);
      }
    };
    fetchSpaces();
  }, []);

    return (
      <div>
      <SearchBox />
      <div className="container-fluid tm-container-content tm-mt-60">
        <div className="row mb-4">
            <h2 className="col-6 tm-text-primary">
              Your Spaces
            </h2>
            <div className="col-6 d-flex justify-content-end align-items-center">
              <a href="delSpace" className="btn btn-primary">Delete</a>
            </div>
        </div>
        <div className="row tm-mb-90 tm-gallery">
          {spaces.length > 0 ? spaces.map((space) => (
            <div key={space.space_id} className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12 mb-5">
                <figure className="effect-ming tm-video-item">
                    <img
                            src={"data:image/jpeg;base64," + space.value}
                            alt="Default Image"
                            className="img-fluid"
                    />
                    <figcaption className="d-flex align-items-center justify-content-center">
                        <h2>{space.title}</h2>
                        <a href="map"></a>
                    </figcaption>
                </figure>
                <div className="d-flex justify-content-between tm-text-gray">
                    <span className="tm-text-gray-light">{new Date(space.created_at).toLocaleDateString()}</span>
                    <span style={{ fontWeight: 'bold' }}>{space.title}</span>
                </div>
                <div className="d-flex justify-content-between tm-text-gray">
                    <span>Status: {space.status}</span>
                    <span>Tags: {space.tag || 'None'}</span>
                </div>
            </div>
          )) : (
            <p>No spaces found.</p>
          )}
        </div>
      </div>
    </div>
    );
}
export default AccountPage;