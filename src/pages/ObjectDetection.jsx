import React, { useState } from 'react';
import ImageUploader from '../components/ImageUploader';
import CustomButton from '../components/CustomButton';
import ProcessedImage from '../components/ProcessedImage';

const ObjectDetection = () => {
  const [processedImage, setProcessedImage] = useState(null);

  const handleDetect = async (base64) => {
    const pureBase64 = base64.replace(/^data:image\/\w+;base64,/, '');
    console.log("Running object detection on:", pureBase64);

    try {
      const response = await fetch('https://wwqbtk3xb4.execute-api.ap-south-1.amazonaws.com/dev/object-detection', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image_base64: pureBase64 }),
      });

      const data = await response.json();
      console.log("Detection result:", data);
      const parsedBody = JSON.parse(data.body); // 👈 Parse the JSON string inside `body`
      console.log("Parsed body:", parsedBody);
      setProcessedImage(parsedBody.processed_image_base64);
    } catch (error) {
      console.error("Detection error:", error);
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
        Object Detection
      </h1>

      <ImageUploader
        actionButtons={(image, base64) => (
          <CustomButton
            text="Run Detection"
            onClick={() => handleDetect(base64)}
            type="detection"
          />
        )}
      />

      <ProcessedImage src={processedImage} />
    </div>
  );
};

export default ObjectDetection;
