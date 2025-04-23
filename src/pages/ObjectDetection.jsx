import React, { useState } from 'react';
import ImageUploader from '../components/ImageUploader';
import CustomButton from '../components/CustomButton';
import ProcessedImage from '../components/ProcessedImage';



const ObjectDetection = () => {
  const [processedImage, setProcessedImage] = useState(null);
  const [avgConfidence, setAvgConfidence] = useState(null);
  const [numObjects, setNumObjects] = useState(null);

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
      setAvgConfidence(parsedBody.avg_confidence);
      setNumObjects(parsedBody.num_objects);
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
      {/* Display detection results after the image */}
    {processedImage && (
      <div style={{ marginTop: '1rem', width: '100%', maxWidth: '500px' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Detection Results</h2>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-around', 
          padding: '1rem',
          backgroundColor: '#f5f5f5',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <div>
            <p style={{ fontWeight: 'bold' }}>Average Confidence</p>
            <p>{avgConfidence ? `${(avgConfidence * 100).toFixed(2)}%` : '-'}</p>
          </div>
          <div>
            <p style={{ fontWeight: 'bold' }}>Objects Detected</p>
            <p>{numObjects || '0'}</p>
          </div>
        </div>
      </div>
    )}
    </div>
  );
};

export default ObjectDetection;
