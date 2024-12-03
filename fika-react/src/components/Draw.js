import React, { useEffect, useMemo, useRef, useState } from "react";
import './Draw.css';

export default function Draw() {
  const colors = useMemo(
    () => [
      "black", "gray", "slategray", "brown",  "maroon", "chocolate",
      "olive", "green", "darkgreen", "teal", "purple", 
      "indigo", "navy", "darkblue", "blue", "lightblue", "skyblue",
      "turquoise", "cyan", "lime", "lightgreen", "yellow", "gold",
      "orange", "red", "crimson", "palevioletred", "orchid", "salmon",
      "violet", "pink", "peachpuff", "wheat", "beige", "seashell", "white"
    ],[]
  );

  const canvasReference = useRef(null);
  const contextReference = useRef(null);

  const user = JSON.parse(sessionStorage.getItem("user"));
  const userID = user.userid;
  const username = user.username;

  const [isPressed, setIsPressed] = useState(false);
  const [imageName, setImageName] = useState(username+"'s art");
  const [showModal, setShowModal] = useState(false);

  // Fill canvas with white
  const fillCanvasWhite = () => {
    const canvas = canvasReference.current;
    const context = canvas.getContext("2d");
    context.fillStyle = "white";
    context.fillRect(0, 0, canvas.width, canvas.height);
  };

  const clearCanvas = () => {
    fillCanvasWhite();
  };

  const beginDraw = (e) => {
    contextReference.current.beginPath();
    contextReference.current.moveTo(
      e.nativeEvent.offsetX,
      e.nativeEvent.offsetY
    );
    setIsPressed(true);
  };

  const updateDraw = (e) => {
    if (!isPressed) return;

      contextReference.current.globalCompositeOperation = 'source-over';  // Normal drawing mode
      contextReference.current.lineTo(
        e.nativeEvent.offsetX,
        e.nativeEvent.offsetY
      );
      contextReference.current.stroke();
  };

  const endDraw = () => {
    contextReference.current.closePath();
    setIsPressed(false);
  };

  useEffect(() => {
    const canvas = canvasReference.current;
    canvas.width = 400; // Adjusted canvas width
    canvas.height = 400; // Adjusted canvas height

    const context = canvas.getContext("2d");
    context.lineCap = "round";
    context.strokeStyle = colors[0]; // Default color
    context.lineWidth = 5;
    contextReference.current = context;

    fillCanvasWhite(); // Fill the canvas with white when it is first rendered
  }, [colors]);

  const setColor = (color) => {
    contextReference.current.strokeStyle = color;
  };

  // Convert image to base64
  const handleSaveClick = async() => {
    const canvas = canvasReference.current;
    let base64Image = canvas.toDataURL();
    if (base64Image) {
      base64Image = base64Image.split(',')[1];
      
      try {
        const response = await fetch('http://localhost:3001/api/save-image', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title: imageName,
            art: base64Image,
            owner_id: userID
          }),
        });
  
        if (response.ok) {
          console.log('Image saved to server successfully.');
          setShowModal(true);
          clearCanvas();
          setImageName(username + "'s art");
        } else {
          console.log('Failed to save image to server.');
        }
      } catch (error) {
        console.error('Error saving image:', error);
      }
    } else {
      console.log('No image to save');
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="Draw">
      <div className="top-bar">
        <input 
          type="text" 
          value={imageName} 
          onChange={(e) => setImageName(e.target.value)} 
          placeholder="Enter image name" 
          className="image-name-input"
          style={{ width: '278px' }} 
          maxLength={30}
        />
        <button onClick={clearCanvas}>CLEAR</button>
        <button onClick={handleSaveClick}>SAVE</button>
      </div>
      
      <canvas
        ref={canvasReference}
        onMouseDown={beginDraw}
        onMouseMove={updateDraw}
        onMouseUp={endDraw}
      />

      <div className="buttons">
        {colors.map((color) => (
          <button
            key={color}
            onClick={() => setColor(color)}
            style={{ backgroundColor: color }}
            className="button"
          />
        ))}
      </div>

      {/* Modal */}
      {showModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h2>Image save successfully</h2>
              <button className="btn btn-secondary" onClick={handleCloseModal}>Close</button>
            </div>
          </div>
        )}
    </div>
  );
}
