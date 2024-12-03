import React, { useRef, useState, useEffect } from 'react';
import map from "../images/map.png";
import player from "../images/avatar.png";

const Map = () => {
    const canvasRef = useRef(null);
    const [keys, setKeys] = useState({ w: false, a: false, s: false, d: false });
    const [lastKey, setLastKey] = useState('');
    const [playerImage, setPlayerImage] = useState(new Image());
    const [backgroundImage, setBackgroundImage] = useState(new Image());
    const [imagesLoaded, setImagesLoaded] = useState(false); // Track if images are loaded

    // Initialize images and check if they are loaded
    useEffect(() => {
        const bgImg = new Image();
        bgImg.src = map;
        bgImg.onload = () => {
            setBackgroundImage(bgImg);
        };

        const playerImage = new Image();
        playerImage.src = player;
        playerImage.onload = () => {
            setPlayerImage(playerImage);
        };
        console.log(playerImage)

    }, []);

    // Handle key events
    useEffect(() => {
        const handleKeyDown = (e) => {
            switch (e.key) {
                case 'w':
                case 'a':
                case 's':
                case 'd':
                    setKeys((prev) => ({ ...prev, [e.key]: true }));
                    setLastKey(e.key);
                    break;
                default:
                    break;
            }
        };

        const handleKeyUp = (e) => {
            switch (e.key) {
                case 'w':
                case 'a':
                case 's':
                case 'd':
                    setKeys((prev) => ({ ...prev, [e.key]: false }));
                    break;
                default:
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, []);

    const draw = (ctx, backgroundPos, playerPos) => {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.drawImage(backgroundImage, backgroundPos.x, backgroundPos.y);
        ctx.drawImage(playerImage, playerPos.x, playerPos.y);
    };

    const animate = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const backgroundPos = { x: 0, y: -250 };
        const playerPos = { x: canvas.width / 2 - playerImage.width / 2, y: canvas.height / 2 - playerImage.height / 2 };

        const updateBackgroundPosition = () => {
            if (keys.w && lastKey === 'w') {
                backgroundPos.y += 3;
            } else if (keys.a && lastKey === 'a') {
                backgroundPos.x += 3;
            } else if (keys.s && lastKey === 's') {
                backgroundPos.y -= 3;
            } else if (keys.d && lastKey === 'd') {
                backgroundPos.x -= 3;
            }
        };

        // Redraw and request the next animation frame
        const gameLoop = () => {
            updateBackgroundPosition();
            draw(ctx, backgroundPos, playerPos);
            requestAnimationFrame(gameLoop);
        };

        gameLoop();
    };

    useEffect(() => {
        if (backgroundImage && playerImage && backgroundImage.complete && playerImage.complete) {
            setImagesLoaded(true);  // Set to true when both images are loaded
        }
    }, [backgroundImage, playerImage]);

    useEffect(() => {
        if (imagesLoaded) {
            animate();
        }
    }, [imagesLoaded, keys, lastKey]); // Depend on imagesLoaded for initial animation

    return (
        <canvas ref={canvasRef} width={window.innerWidth} height={window.innerHeight} />
    );
};

export default Map;
