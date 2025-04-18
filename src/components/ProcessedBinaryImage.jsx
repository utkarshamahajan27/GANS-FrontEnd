// components/ProcessedBinaryImage.jsx
import React, { useEffect, useState } from 'react';

const ProcessedBinaryImage = ({ blobData }) => {
  const [imageURL, setImageURL] = useState(null);

  useEffect(() => {
    if (!blobData) {
      console.log("No binary image data received.");
      return;
    }

    const blob = new Blob([blobData], { type: 'image/jpeg' }); // or 'image/png' depending on format
    const url = URL.createObjectURL(blob);
    setImageURL(url);

    // Cleanup on unmount
    return () => URL.revokeObjectURL(url);
  }, [blobData]);

  if (!imageURL) return null;

  return (
    <div style={{ marginTop: '2rem' }}>
      <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Processed Image</h2>
      <img
        src={imageURL}
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

export default ProcessedBinaryImage;
