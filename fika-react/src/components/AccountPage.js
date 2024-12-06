import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBox from './SearchBox';
import './style.css';

const AccountPage = () => {
  const [spaces, setSpaces] = useState([]);
  const [artworks, setArtworks] = useState([]);
  const [error, setError] = useState(null);
  const [filteredSpaces, setFilteredSpaces] = useState([]);
  const [filteredArtworks, setFilteredArtworks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const navigate = useNavigate();
  
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
        setFilteredSpaces(spacesData); // Initialize filteredSpaces with all data
      } catch (error) {
        setError(error.message);
        console.error('There was a problem with the fetch operation:', error);
      }
    };
    fetchSpaces();

    const fetchArts = async () => {
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

        const response = await fetch("http://localhost:3001/api/check-arts-from-user", requestOptions);

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const artsData = await response.json();
        setArtworks(artsData);
        setFilteredArtworks(artsData); // Initialize filteredArtworks with all data
      } catch (error) {
        setError(error.message);
        console.error('There was a problem with the fetch operation:', error);
      }
    };
    fetchArts();
  }, []);

  const handleViewArt = (artId) => {
    navigate('/view-art', { state: { artId } });
  }

  const handleJoinSpace = (spaceId) => {
    navigate('/create-avatar', { state: { spaceId } });
  }

  // Handle search functionality
  const handleSearch = (term) => {
    setSearchTerm(term);
  
    // Filter spaces based on search term
    const filteredSpacesData = spaces.filter(space => {
      const title = space.title || ''; // Default to empty string if title is null or undefined
      const tag = space.tag || ''; // Default to empty string if tag is null or undefined
      return title.toLowerCase().includes(term.toLowerCase()) ||
        tag.toLowerCase().includes(term.toLowerCase());
    });
    setFilteredSpaces(filteredSpacesData);
  
    // Filter artworks based on search term
    const filteredArtworksData = artworks.filter(art => {
      const title = art.title || ''; // Default to empty string if title is null or undefined
      return title.toLowerCase().includes(term.toLowerCase());
    });
    setFilteredArtworks(filteredArtworksData);
  };
  

  return (
    <div>
      <SearchBox onSearch={handleSearch} />
      <div className="container-fluid tm-container-content tm-mt-60">
        <div className="row mb-4">
            <h2 className="col-6 tm-text-primary">
              Your Spaces
            </h2>
            <div className="col-6 d-flex justify-content-end align-items-center">
              <a href="editSpace" className="btn btn-primary">Edit</a>
            </div>
        </div>
        <div className="row tm-mb-90 tm-gallery">
          {filteredSpaces.length > 0 ? filteredSpaces.map((space) => (
            <div key={space.space_id} className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12 mb-5">
                <figure className="effect-ming tm-video-item">
                    <img
                            src={"data:image/jpeg;base64," + space.value}
                            alt="Default Image"
                            className="img-fluid"
                    />
                    <figcaption className="d-flex align-items-center justify-content-center" onClick={() => handleJoinSpace(space.space_id)}>
                        <h2>{space.title}</h2>
                    </figcaption>
                </figure>
                <div className="d-flex justify-content-between tm-text-gray">
                    <span className="tm-text-gray-light">{new Date(space.created_at).toLocaleDateString()}</span>
                    <span style={{ fontWeight: 'bold' }}>{space.title}</span>
                </div>
                <div className="d-flex justify-content-between tm-text-gray">
                    <span>Status: {space.status}</span>
                </div>
                <div className="d-flex justify-content-between tm-text-gray">
                    <span>Tags: {space.tag || 'None'}</span>
                </div>
            </div>
          )) : (
            <p>No spaces found.</p>
          )}
        </div>
      </div>
      <div className="container-fluid tm-container-content tm-mt-60">
        <div className="row mb-4">
            <h2 className="col-6 tm-text-primary">
              Your Artworks
            </h2>
            <div className="col-6 d-flex justify-content-end align-items-center">
              <a href="editArt" className="btn btn-primary">Edit</a>
            </div>
        </div>
        <div className="row tm-mb-90 tm-gallery">
          {filteredArtworks.length > 0 ? filteredArtworks.map((art) => (
            <div key={art.art_id} className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12 mb-5">
                <figure className="effect-ming tm-video-item">
                    <div className="zoom-container">  
                        <img
                            src={"data:image/jpeg;base64," + art.art}
                            alt="Default Image"
                            className="img-fluid"
                        />
                    </div>
                    <figcaption className="d-flex align-items-center justify-content-center" onClick={() => handleViewArt(art.art_id)}>
                        <h2>{art.title}</h2>
                    </figcaption>
                </figure>
                <div className="d-flex justify-content-between tm-text-gray">
                    <span className="tm-text-gray-light">{new Date(art.created_at).toLocaleDateString()}</span>
                    <span style={{ fontWeight: 'bold' }}>{art.title}</span>
                </div>
            </div>
          )) : (
            <p>No Artworks found.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default AccountPage;
