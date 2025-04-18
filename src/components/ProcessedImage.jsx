// components/ProcessedImage.jsx
import React from 'react';

const ProcessedImage = ({ src }) => {
  if (!src) return null;

  const imageSrc = `data:image/png;base64,${src}`; // assuming backend gives pure base64

  return (
    <div style={{ marginTop: '2rem' }}>
      <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Processed Image</h2>
      <img
        src={imageSrc}
        alt="Processed Result"
        style={{
          maxWidth: '500px',
          width: '100%',
          border: '1px solid #ccc',
          borderRadius: '8px',
        }}
      />
    </div>
  );
};

export default ProcessedImage;
