import React, { useState } from 'react';
import ImageUploader from '../components/ImageUploader';
import CustomButton from '../components/CustomButton';
import ProcessedBinaryImage from '../components/ProcessedBinaryImage';

const ObjectDetection = () => {
  const [processedImage, setProcessedImage] = useState(null);
  const [avgConfidence, setAvgConfidence] = useState(null);
  const [numObjects, setNumObjects] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleDetect = async (preview, file) => {
    if (!file || !(file instanceof Blob)) {
        console.error("Invalid file object:", file);
        return;
    }
    
    setIsProcessing(true);
    
    try {
        // Convert file to ArrayBuffer using Promise
        const binaryData = await new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = () => reject(new Error('File reading failed'));
            reader.readAsArrayBuffer(file);
        });

        console.log("Binary data ready for backend:", binaryData);
        
        // Uncomment this when ready to send to API
        /*
        const response = await fetch('https://wwqbtk3xb4.execute-api.ap-south-1.amazonaws.com/dev/object-detection ', {
            method: 'POST',
            headers: {
                'Content-Type': 'image/jpeg', // Match your API's expected type
            },
            body: binaryData,
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Process binary response
        const imageBlob = await response.blob();
        const imageUrl = URL.createObjectURL(imageBlob);
        
        // Extract metadata from headers
        const avgConf = response.headers.get('X-Avg-Confidence');
        const numObj = response.headers.get('X-Num-Objects');

        // Update state
        setProcessedImage(imageUrl);
        setAvgConfidence(parseFloat(avgConf));
        setNumObjects(parseInt(numObj));
        */
    } catch (error) {
        console.error("Detection error:", error);
    } finally {
        setIsProcessing(false);
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
    actionButtons={(preview, file) => (
        <CustomButton
            text={isProcessing ? "Processing..." : "Run Detection"}
            onClick={() => handleDetect(preview, file)}
            type="detection"
            disabled={isProcessing}
        />
    )}
    />

      {processedImage && (
        <>
          <ProcessedBinaryImage blobData={processedImage} />
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
        </>
      )}
    </div>
  );
};

export default ObjectDetection;