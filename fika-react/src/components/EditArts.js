import React, { useState, useEffect } from 'react';
import SearchBox from './SearchBox';
import './style.css';

const EditArts = () => {
  const [showModal, setShowModal] = useState(false);
  const [spaces, setSpaces] = useState([]);
  const [artworks, setArtworks] = useState([]);
  const [error, setError] = useState(null);
  const [selectedArtId, setSelectedArtId] = useState(null);

  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState('');

  const fetchSpaces = async () => {
    try {
      const user = JSON.parse(sessionStorage.getItem("user"));
      const userID = user.userid;

      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json", },
        body: JSON.stringify({ userid: userID }),
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

  const fetchArts = async () => {
    try {
      const user = JSON.parse(sessionStorage.getItem("user"));
      const userID = user.userid;

      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json",},
        body: JSON.stringify({ userid: userID }),
      };

      const response = await fetch("http://localhost:3001/api/check-arts-from-user", requestOptions);

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const artsData = await response.json();
      setArtworks(artsData);
    } catch (error) {
      setError(error.message);
      console.error('There was a problem with the fetch operation:', error);
    }
  };

  useEffect(() => {
    fetchSpaces();
    fetchArts();
  }, []);

  const handleButtonClick = (artID) => {
    setSelectedArtId(artID);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false); // close the modal
  };

  const handleDelete = async () => {
    if (!selectedArtId) return;
  
    try {
      const response = await fetch('http://localhost:3001/api/delete-arts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: selectedArtId }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error deleting space:', errorData);
        alert('Error deleting space: ' + (errorData.message || 'Unknown error'));
        return;
      }
  
      const data = await response.json();
      console.log('Delete success:', data);
      
      fetchArts();
      handleCloseModal();
    } catch (error) {
      console.error('Fetch operation failed:', error);
      alert('There was a problem with the fetch operation. Please try again later.');
    }
  };

  const handleEditClick = (artID, currentTitle) => {
    setSelectedArtId(artID);
    setEditTitle(currentTitle);
    setIsEditing(true);
  };

  const handleUpdateTitle = async () => {
    if (editTitle && selectedArtId) {
      try {
        const response = await fetch('http://localhost:3001/api/update-art-title', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title: editTitle, artId: selectedArtId }),
        });
    
        if (!response.ok) {
          const errorData = await response.json();
          console.error('Error updating title:', errorData);
          alert('Error updating title: ' + (errorData.message || 'Unknown error'));
          return;
        }
        setIsEditing(false);
        fetchArts();
      } catch (error) {
        console.error('Fetch operation failed:', error);
        alert('There was a problem with the fetch operation. Please try again later.');
      }
    } else {
      setIsEditing(false);
      console.log("Nothing to change")
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
  }
 
  return (
    <div>
      <SearchBox />
      <div className="container-fluid tm-container-content tm-mt-60">
        <div className="row mb-4">
          <h2 className="col-6 tm-text-primary">Your Spaces</h2>
          <div className="col-6 d-flex justify-content-end align-items-center">
              <a href="editSpace" className="btn btn-primary">Edit</a>
            </div>
        </div>
        <div className="row tm-mb-90 tm-gallery">
          {spaces.length > 0 ? spaces.map((space) => (
            <div key={space.space_id} className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12 mb-5">
                <figure className="effect-ming tm-video-item">
                    <img
                            src={"data:image/jpeg;base64," + space.value}
                            className="img-fluid"
                    />
                    <figcaption className="d-flex align-items-center justify-content-center">
                        <h2>{space.title}</h2>
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
        <div className="row mb-4">
            <h2 className="col-6 tm-text-primary">
              Your Artworks
            </h2>
            <div className="col-6 d-flex justify-content-end align-items-center">
              <a href="yourAccount" className="btn btn-primary">Return</a>
            </div>
        </div>
        <div className="row tm-mb-90 tm-gallery">
          {artworks.length > 0 ? artworks.map((art) => (
            <div key={art.art_id} className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12 mb-5" style={{ position: 'relative' }}>
                <div className="zoom-container">  
                    <img
                        src={"data:image/jpeg;base64," + art.art}
                        className="img-fluid"
                    />
                </div>
              <button
                className="btn btn-primary"
                onClick={() => handleButtonClick(art.art_id)} // Pass space_id to the modal
                style={{
                  position: 'absolute',
                  width: '40px',
                  height: '40px',
                  top: '10px',
                  right: '20px',
                  borderRadius: '50%',
                  padding: 0,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <i className="fas fa-minus" style={{ color: '#fff', fontSize: '30px' }}></i>
              </button>
                <div className="d-flex justify-content-between tm-text-gray">
                    <span className="tm-text-gray-light">{new Date(art.created_at).toLocaleDateString()}</span>
                    <span style={{ fontWeight: 'bold' }}>
                    {selectedArtId === art.art_id && isEditing ? (
                      <>
                        <input
                          type="text"
                          value={editTitle}
                          onChange={(e) => setEditTitle(e.target.value)}
                          className="form-edit"
                          maxLength={30}
                        />
                        <button className='btn-rename tm-text-gray' onClick={handleUpdateTitle}>
                          <i className="fas fa-check"></i>
                        </button>
                        <button className='btn-rename tm-text-gray' onClick={handleCancel}>
                          <i className="fas fa-times"></i>
                        </button>
                      </>
                    ) : (
                      <>
                        {art.title}
                        <button className='btn-rename tm-text-gray' onClick={() => handleEditClick(art.art_id, art.title)}>
                          <i className="fas fa-pencil-alt"></i>
                        </button>
                      </>
                    )}
                    </span>
                </div>
            </div>
          )) : (
            <p>No Artworks found.</p>
          )}
      </div>

        {showModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h2>Are you sure you want to delete this artworks?</h2>
              <button className="btn btn-danger" onClick={handleDelete}>Yes, Delete</button>
              <button className="btn btn-secondary" onClick={handleCloseModal}>Cancel</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditArts;
