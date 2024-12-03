import React, { useEffect, useMemo, useRef, useState } from "react";
import './Draw.css';

export default function Draw() {
  const colors = useMemo(
    () => ["black", "purple", "lightblue", "pink", "lightgreen", "yellow"],
    []
  );

  const canvasReference = useRef(null);
  const contextReference = useRef(null);

  const [isPressed, setIsPressed] = useState(false);

  const clearCanvas = () => {
    const canvas = canvasReference.current;
    const context = canvas.getContext("2d");
    context.fillStyle = "white";
    context.fillRect(0, 0, canvas.width, canvas.height);
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
    context.strokeStyle = colors[0];
    context.lineWidth = 5;
    contextReference.current = context;
  }, [colors]);

  const setColor = (color) => {
    contextReference.current.strokeStyle = color;
  };

  //convert image to base64
    const handleSaveClick = () => {
      const canvas = canvasReference.current;
      let base64Image = canvas.toDataURL();
      if (base64Image) {
        base64Image = base64Image.split(',')[1];
        console.log('Base64 Image:', base64Image);
      } else {
        console.log('No image to save');
      }
    };

  return (
    <div className="Draw">
      <canvas
        ref={canvasReference}
        onMouseDown={beginDraw}
        onMouseMove={updateDraw}
        onMouseUp={endDraw}
      />
      <div className="buttons">
        <button onClick={clearCanvas}>CLEAR</button>
        {colors.map((color) => (
          <button
            key={color} // Added key prop to avoid warning
            onClick={() => setColor(color)}
            style={{ backgroundColor: color }}
          ></button>
        ))}
        <button onClick={handleSaveClick}>SAVE</button>
      </div>
    </div>
  );
}
