import React, { useEffect, useState } from 'react';
import './style.css';

const Gallery = () => {
    const [images, setImages] = useState([]);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const reqData = await fetch("http://localhost:3001/api/img");
                const resData = await reqData.json();
                setImages(resData);
                console.log(resData);
            } catch (error) {
                console.error('Error fetching images:', error);
            }
        };
        fetchImages();
    }, []);

    return (
        <div>
        <div className="container-fluid tm-container-content tm-mt-60">
          <div className="row mb-4">
              <h2 className="col-6 tm-text-primary">
                Gallery
              </h2>
          </div>
          <div className="row tm-mb-90 tm-gallery">
            {images.length > 0 ? images.map((image) => (
              <div key={image.art_id} className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12 mb-5">
                  <figure className="effect-ming tm-video-item">
                    <div className="zoom-container">  
                        <img
                            src={"data:image/jpeg;base64," + image.art}
                            alt="Default Image"
                            className="img-fluid"
                        />
                    </div>
                      <figcaption className="d-flex align-items-center justify-content-center">
                          <h2>{image.title}</h2>
                      </figcaption>
                  </figure>
                  <div className="d-flex justify-content-between tm-text-gray">
                      <span className="tm-text-gray-light">{new Date(image.created_at).toLocaleDateString()}</span>
                      <span style={{ fontWeight: 'bold' }}>By: {image.username}</span>
                  </div>
              </div>
            )) : (
              <p>No image found.</p>
            )}
          </div>
        </div>
      </div>
      );
  }

export default Gallery;
