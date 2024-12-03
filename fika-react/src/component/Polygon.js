/*import React, { useRef, useEffect, useState } from 'react';
import map from "../images/map.png";
import player from "../images/avatar.png";

const Polygon = () => {
  const canvasRef = useRef(null);
  const [playerPosition, setPlayerPosition] = useState({
    x: window.innerWidth / 2, // Initial X position, center of screen
    y: window.innerHeight / 2, // Initial Y position, center of screen
  });

  useEffect(() => {
    const bgImg = new Image();
    bgImg.src = map;
    bgImg.onload = () => {
      setBackgroundImage(bgImg);
    };

    const playerImg = new Image();
    playerImg.src = player;
    playerImg.onload = () => {
      setPlayerImage(playerImg);
    };
  }, []);

  useEffect(() => {
    // Disable scrolling on the body and html elements
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Set canvas size to fill the screen
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const mapImage = new Image();
    const playerImage = new Image();
    mapImage.src = map;
    playerImage.src = player;

    mapImage.onload = () => {
      playerImage.onload = () => {
        // Draw the initial state
        drawBackground(ctx, mapImage, canvas.width, canvas.height);
        drawPlayer(ctx, playerImage, playerPosition.x, playerPosition.y);
      };
    };
  }, [playerPosition]); // Re-render whenever player position changes

  useEffect(() => {
    const handleKeyDown = (e) => {
      setPlayerPosition((prev) => {
        let newPos = { ...prev };
        switch (e.key) {
          case 'ArrowUp':
            newPos.y = Math.max(0, prev.y - 30);
            break;
          case 'ArrowDown':
            newPos.y = Math.min(window.innerHeight, prev.y + 30);
            break;
          case 'ArrowLeft':
            newPos.x = Math.max(0, prev.x - 30);
            break;
          case 'ArrowRight':
            newPos.x = Math.min(window.innerWidth, prev.x + 30);
            break;
          default:
            return prev;
        }
        return newPos;
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div>
      <canvas
        ref={canvasRef}
        style={{ border: '1px solid black', display: 'block' }}
      />
    </div>
  );
};

export default Polygon;
*/