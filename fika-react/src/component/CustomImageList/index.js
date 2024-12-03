import React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import './index.css'; // Import the CSS file

function srcset(image, width, height, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${width * cols}&h=${height * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${width * cols}&h=${
      height * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
}

export default function CustomImageList() {
  const itemData = [
    {
        img: 'https://i.pinimg.com/originals/93/9e/92/939e9273e3d6ef4f281cda31e9e62488.gif',
        title: 'swordNwaterfall',
        author: '@bkristastucchio',
        featured: true,
      },
      {
        img: 'https://i.pinimg.com/736x/c6/d5/3e/c6d53ea1573fb7adbd9486c38fbb6ef9.jpg',
        title: 'purpletree',
        author: '@rollelflex_graphy726',
      },
      {
        img: null,
        title: 'Immerse to pixel world',
        author: '@helloimnik',
      },
      {
        img: null,
        title: 'Meet with new people!',
        author: '@nolanissac',
      },
      {
        img: 'https://i.pinimg.com/originals/4c/61/f8/4c61f8dbda3404dce696a74c25236d75.gif',
        title: 'rainandgreen',
        author: '@hjrc33',
      },
      {
        img: 'https://i.pinimg.com/736x/7d/44/35/7d443591b2d8e85df36b78def89ec8ba.jpg',
        title: 'forest',
        author: '@arwinneil',
        featured: true,
      }
    ];

  return (
    <div
  style={{
    width: '100%',
    height: 'calc(100vh - 100px)', // Adjust 100px based on your layout
    overflowY: 'auto',
    scrollbarWidth: 'none', // Hide scrollbar for Firefox
    msOverflowStyle: 'none', // Hide scrollbar for IE/Edge
  }}
>

<ImageList
  className="hide-scrollbar" // Add the class here
  sx={{
    width: '100%',
    height: '100%',
    overflowY: 'auto', // Enable scrolling
    scrollbarWidth: 'none', // Hide scrollbar for Firefox
    msOverflowStyle: 'none', // Hide scrollbar for IE/Edge
    '&::-webkit-scrollbar': {
      display: 'none', // Hide scrollbar for Chrome/Safari/Edge
    },
  }}
  rowHeight={200}
  gap={1}
>

    {itemData.map((item) => {
      const cols = item.featured ? 2 : 1;
      const rows = item.featured ? 2 : 1;

      return (
        <ImageListItem key={item.title} cols={cols} rows={rows}>
          {item.img ? (
            <img
              {...srcset(item.img, 250, 200, rows, cols)}
              alt={item.title}
              loading="lazy"
            />
          ) : (
            <div
              style={{
                backgroundColor: '#423c6e',
                width: '100%',
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                color: 'white'
              }}
            >
              {item.title}
            </div>
          )}
        </ImageListItem>
      );
    })}
  </ImageList>
</div>


  );
}
