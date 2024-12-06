import React, { useState, useEffect } from 'react';
import SearchBox from './SearchBox';
import './style.css';

const EditSpaces = () => {
  const [showModal, setShowModal] = useState(false);
  const [spaces, setSpaces] = useState([]);
  const [artworks, setArtworks] = useState([]);
  const [error, setError] = useState(null);
  const [selectedSpaceId, setSelectedSpaceId] = useState(null);

  const [isEditing,setIsEditing] = useState(false);
  const [editTitle,setEditTitle] = useState('');
  const [editTag,setEditTag] = useState('');
  const [editingField, setEditingField] = useState(null);

  const [filteredSpaces, setFilteredSpaces] = useState([]);
  const [filteredArtworks, setFilteredArtworks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  
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
      setFilteredSpaces(spacesData);
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
      setFilteredArtworks(artsData);
    } catch (error) {
      setError(error.message);
      console.error('There was a problem with the fetch operation:', error);
    }
  };
  
  useEffect (() => {
    fetchSpaces();
    fetchArts();
  }, []);
  

  const handleButtonClick = (spaceId) => {
    setSelectedSpaceId(spaceId);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false); // close the modal
  };

  const handleDelete = async () => {
    if (!selectedSpaceId) return;
  
    try {
      const response = await fetch('http://localhost:3001/api/delete-spaces', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: selectedSpaceId }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error deleting space:', errorData);
        alert('Error deleting space: ' + (errorData.message || 'Unknown error'));
        return;
      }
  
      const data = await response.json();
      console.log('Delete success:', data);
      
      fetchSpaces();
      handleCloseModal();
    } catch (error) {
      console.error('Fetch operation failed:', error);
      alert('There was a problem with the fetch operation. Please try again later.');
    }
  };

  const handleEditClick = (spaceID, currentValue, field) => {
    setSelectedSpaceId(spaceID);
    if (field === 'title') {
      setEditTitle(currentValue);
    } else if (field === 'tag') {
      setEditTag(currentValue);
    }
    setEditingField(field);
    setIsEditing(true);
  };

  const handleUpdateTitle = async () => {
    if (editTitle && selectedSpaceId) {
      try {
        const response = await fetch('http://localhost:3001/api/update-space-title', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title: editTitle, spaceID: selectedSpaceId }),
        });
    
        if (!response.ok) {
          const errorData = await response.json();
          console.error('Error updating title:', errorData);
          alert('Error updating title: ' + (errorData.message || 'Unknown error'));
          return;
        }
        setIsEditing(false);
        fetchSpaces();
      } catch (error) {
        console.error('Fetch operation failed:', error);
        alert('There was a problem with the fetch operation. Please try again later.');
      }
    } else {
      setIsEditing(false);
      console.log("Nothing to change")
    }
  };

  const handleOnChangeStatus = async (e, spaceId) => {
    const newStatus = e.target.value;
    try {
      const response = await fetch('http://localhost:3001/api/update-space-status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus, spaceID: spaceId }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error updating status:', errorData);
        alert('Error updating status: ' + (errorData.message || 'Unknown error'));
        return;
      }
      fetchSpaces();
    } catch (error) {
      console.error('Fetch operation failed:', error);
      alert('There was a problem with the fetch operation. Please try again later.');
    }
  };

  const handleUpdateTag = async () => {
    if (editTag && selectedSpaceId) {
      try {
        const response = await fetch('http://localhost:3001/api/update-space-tags', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ tag: editTag, spaceID: selectedSpaceId }),
        });
    
        if (!response.ok) {
          const errorData = await response.json();
          console.error('Error updating title:', errorData);
          alert('Error updating title: ' + (errorData.message || 'Unknown error'));
          return;
        }
        setIsEditing(false);
        fetchSpaces();
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
          <h2 className="col-6 tm-text-primary">Your Spaces</h2>
          <div className="col-6 d-flex justify-content-end align-items-center">
            <a href="yourAccount" className="btn btn-primary">Return</a>
          </div>
        </div>
        <div className="row tm-mb-90 tm-gallery">
          {filteredSpaces.length > 0 ? filteredSpaces.map((space) => (
            <div key={space.space_id} className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12 mb-5" style={{ position: 'relative' }}>
                <img
                    src={"data:image/jpeg;base64," + space.value}
                    alt="Default Image"
                    className="img-fluid"
                />
              <button
                className="btn btn-primary"
                onClick={() => handleButtonClick(space.space_id)} // Pass space_id to the modal
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
                <span className="tm-text-gray-light">{new Date(space.created_at).toLocaleDateString()}</span>
                <span style={{ fontWeight: 'bold' }}>
                  {selectedSpaceId === space.space_id && isEditing && editingField == 'title' ? (
                    <div className="input-button-container">
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
                    </div>
                    ) : (
                    <>
                      {space.title}
                      <button className='btn-rename tm-text-gray' onClick={() => handleEditClick(space.space_id, space.title, 'title')}>
                        <i className="fas fa-pencil-alt"></i>
                      </button>
                    </>
                  )}
                </span>
              </div>
              <div className="d-flex justify-content-between tm-text-gray">
                <span>Status:
                  <select value={space.status} onChange={(e) => handleOnChangeStatus(e, space.space_id)}>
                    <option value='public'>public</option>
                    <option value='private'>private</option>
                  </select>
                </span>
              </div>
              <div className="d-flex justify-content-between tm-text-gray">
                <span>
                  {selectedSpaceId === space.space_id && isEditing  && editingField == 'tag' ? (
                    <div className="input-button-container">
                      <label>Tags: </label>
                      <input
                        type="text"
                        value={editTag}
                        onChange={(e) => setEditTag(e.target.value)}
                        placeholder='Tags'
                        className="form-edit-tag"
                        maxLength={200}
                      />
                      <button className='btn-rename tm-text-gray' onClick={handleUpdateTag}>
                        <i className="fas fa-check"></i>
                      </button>
                      <button className='btn-rename tm-text-gray' onClick={handleCancel}>
                        <i className="fas fa-times"></i>
                      </button>
                    </div>
                    ) : (
                    <>
                      Tags: {space.tag || 'None'}
                      <button className='btn-rename tm-text-gray' onClick={() => handleEditClick(space.space_id, space.tag, 'tag')}>
                        <i className="fas fa-pencil-alt"></i>
                      </button>
                    </>
                  )}
                </span>
              </div>
            </div>
          )): (
            <p>No spaces found.</p>
          )}
        </div>
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
                    <figcaption className="d-flex align-items-center justify-content-center">
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

        {/* Modal */}
        {showModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h2>Are you sure you want to delete this space?</h2>
              <button className="btn btn-danger" onClick={handleDelete}>Yes, Delete</button>
              <button className="btn btn-secondary" onClick={handleCloseModal}>Cancel</button>
            </div>
          </div>
        )}
      </div>
  );
};

export default EditSpaces;
