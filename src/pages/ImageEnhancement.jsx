import React, { useState } from 'react';
import ImageUploader from '../components/ImageUploader';
import CustomButton from '../components/CustomButton';
import ProcessedImage from '../components/ProcessedImage';

const ImageEnhancement = () => {
  const [processedImage, setProcessedImage] = useState(null);

  const handleSRGAN = async (base64) => {
    const pureBase64 = base64.replace(/^data:image\/\w+;base64,/, '');
    console.log("Sending base64 to SRGAN:", pureBase64);

    
    try {
      const response = await fetch('http://localhost:8000/srgan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: pureBase64 }),
      });

      const data = await response.json();
      setProcessedImage(data.processedImage); // expects base64 string from backend
    } catch (error) {
      console.error("SRGAN error:", error);
    }
  };

  const handlePix2Pix = async (base64) => {
    const pureBase64 = base64.replace(/^data:image\/\w+;base64,/, '');
    console.log("Sending base64 to Pix2Pix:", pureBase64);

    try {
      const response = await fetch('http://localhost:8000/pix2pix', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: pureBase64 }),
      });

      const data = await response.json();
      setProcessedImage(data.processedImage);
    } catch (error) {
      console.error("Pix2Pix error:", error);
    }
  };

  return (
    <div
      className="object-detection-page"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '2rem',
        textAlign: 'center',
      }}
    >
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>
        Image Enhancement
      </h1>

      <ImageUploader
        actionButtons={(image, base64) => (
          <>
            <CustomButton text="Send to SRGAN" onClick={() => handleSRGAN(base64)} type="srgan" />
            <CustomButton text="Send to Pix2Pix" onClick={() => handlePix2Pix(base64)} type="pix2pix" />
          </>
        )}
      />

      <ProcessedImage src={processedImage} />
    </div>
  );
};

export default ImageEnhancement;
