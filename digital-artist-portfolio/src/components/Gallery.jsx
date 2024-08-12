import React from 'react';
import './Gallery.css';

function Gallery({ items }) {
 

  return (
    <div className="gallery">
      <div className="gallery-header">
        <h1>Gallery</h1>
      </div>

      <div className='imageGallery'>
        {items.map((item, index) => (
          <div
            key={index}
            className="gallery-item"
           
          >
            <img src={`http://localhost:5000/${item.image}`} alt={item.title} />
            <div className="gallery-content">
              <h2 className="gallery-title">{item.title}</h2>
              <p className="gallery-description">{item.description}</p>
              <a
                className="gallery-link"
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  className="icon"
                  width="24"
                  height="24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 13a5 5 0 007.071 0l3.536-3.536a5 5 0 10-7.071-7.071L10 7m4 10a5 5 0 01-7.071 0l-3.536-3.536a5 5 0 017.071-7.071L14 7"
                  />
                </svg>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Gallery;
