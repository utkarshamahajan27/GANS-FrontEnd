import React, { useState } from 'react';
import ImageUploader from '../components/ImageUploader';
import CustomButton from '../components/CustomButton';
import ProcessedS3Image from '../components/ProcessedS3Image';

// const Pix2Pix = () => {
//   // Demo states
//   const [showEnhancedImage, setShowEnhancedImage] = useState(false);
//   const [showDetectionResults, setShowDetectionResults] = useState(false);
//   const [isProcessing, setIsProcessing] = useState(false);
//   const [isDetectionProcessing, setIsDetectionProcessing] = useState(false);
//   const [detectionCount, setDetectionCount] = useState(0);

//   // Demo handlers
//   const handlePix2PixDemo = () => {
//     setIsProcessing(true);
//     setTimeout(() => {
//       setShowEnhancedImage(true);
//       setShowDetectionResults(false);
//       setIsProcessing(false);
//     }, 1500);
//   };

//   const handleObjectDetectionDemo = () => {
//     setIsDetectionProcessing(true);
//     setTimeout(() => {
//       setShowDetectionResults(true);
//       setDetectionCount(prev => prev + 1);
//       setIsDetectionProcessing(false);
//     }, 1500);
//   };

//   const handleOpenInNewTabDemo = () => {
//     window.open('https://picsum.photos/800/600?sepia', '_blank');
//   };

//   const handleOpenDetectionInNewTab = () => {
//     window.open(`https://picsum.photos/800/600?random=${detectionCount}`, '_blank');
//   };

//   return (
//     <div
//       className="pix2pix-page"
//       style={{
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center',
//         padding: '2rem',
//         textAlign: 'center',
//       }}
//     >
//       <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1.5rem', color: 'white' }}>
//         Pix2Pix Image Enhancement
//       </h1>

//       <ImageUploader
//         actionButtons={(image, base64) => (
//           <CustomButton 
//             text={isProcessing ? "Processing..." : "Run Pix2Pix"} 
//             onClick={handlePix2PixDemo} 
//             type="pix2pix" 
//             disabled={isProcessing}
//           />
//         )}
//       />

//       {/* Enhanced Image */}
//       {showEnhancedImage && (
//         <div style={{ marginTop: '2rem', width: '100%', maxWidth: '500px' }}>
//           <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'white' }}>Pix2Pix Enhanced Image</h2>
//           <img
//             src="https://picsum.photos/500/300?sepia"
//             alt="Pix2Pix Enhanced"
//             style={{
//               width: '100%',
//               border: '1px solid #ccc',
//               borderRadius: '8px',
//             }}
//           />
//           <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem', justifyContent: 'center' }}>
//             <CustomButton
//               text="Open in New Tab"
//               onClick={handleOpenInNewTabDemo}
//               type="open"
//             />
//             <CustomButton
//               text={isDetectionProcessing ? "Processing..." : "Run Object Detection"}
//               onClick={handleObjectDetectionDemo}
//               type="detection"
//               disabled={isDetectionProcessing}
//             />
//           </div>
//         </div>
//       )}

//       {/* Object Detection Results - Shows different image each time */}
//       {showDetectionResults && (
//         <div style={{ marginTop: '2rem', width: '100%', maxWidth: '500px' }}>
//           <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'white' }}>Object Detection Results</h2>
//           <img
//             src={`https://picsum.photos/500/300?random=${detectionCount}`}
//             alt="Detection Results"
//             style={{
//               width: '100%',
//               border: '1px solid #ccc',
//               borderRadius: '8px',
//             }}
//           />
//           <div style={{ marginTop: '1rem', width: '100%', maxWidth: '500px' }}>
//             <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: 'white' }}>Detection Results</h2>
//             <div style={{ 
//               display: 'flex', 
//               justifyContent: 'space-around', 
//               padding: '1rem',
//               backgroundColor: '#f5f5f5',
//               borderRadius: '8px',
//               boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
//             }}>
//               <div>
//                 <p style={{ fontWeight: 'bold' }}>Average Confidence</p>
//                 <p>{(95.5 + detectionCount).toFixed(1)}%</p>
//               </div>
//               <div>
//                 <p style={{ fontWeight: 'bold' }}>Objects Detected</p>
//                 <p>{3 + detectionCount}</p>
//               </div>
//             </div>
//             <div style={{ marginTop: '1rem' }}>
//               <CustomButton
//                 text="View in New Tab"
//                 onClick={handleOpenDetectionInNewTab}
//                 type="open"
//               />
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

/* Original Code - Commented Out*/
const Pix2Pix = () => {
  const [processedImageUrl, setProcessedImageUrl] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDetectionProcessing, setIsDetectionProcessing] = useState(false);
  const [detectionResults, setDetectionResults] = useState(null);
  const [s3Uri, setS3Uri] = useState(null);
  // Dummy states
  const [showDummyImage, setShowDummyImage] = useState(false);
  const [showDummyDetection, setShowDummyDetection] = useState(false);

  // Dummy handlers
  const handleDummyPix2Pix = async (image) => {
    setIsProcessing(true);
    
    try {
      // Make actual API call
      const response = await fetch('https://7s1dc19dr2.execute-api.ap-south-1.amazonaws.com/prod/pix2pix', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ s3_uri: image.name }),
      });

      const data = await response.json();
      console.log("Pix2Pix response:", data);
      
      if (data.zucc) {
        const fullS3Uri = `s3://final-year-proj/${data.zucc}`;
        setS3Uri(fullS3Uri);
      }
    } catch (error) {
      console.error("Pix2Pix error:", error);
    }

    // Show dummy image after API call
    setTimeout(() => {
      setShowDummyImage(true);
      setShowDummyDetection(false);
      setIsProcessing(false);
    }, 1500);
  };

  const handleDummyObjectDetection = async () => {
    if (!s3Uri) return;
    setIsDetectionProcessing(true);
    console.log("s3Uri:", s3Uri);

    try {
      // Make actual API call
      const response = await fetch('https://7s1dc19dr2.execute-api.ap-south-1.amazonaws.com/prod/object-detection', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ s3_uri: s3Uri }),
      });

      const data = await response.json();
      console.log("Detection result:", data);
    } catch (error) {
      console.error("Detection error:", error);
    }

    // Show dummy detection after API call
    setTimeout(() => {
      setShowDummyDetection(true);
      setIsDetectionProcessing(false);
    }, 1500);
  };

  const handleDownload = () => {
    if (!processedImageUrl) return;
    
    const link = document.createElement('a');
    link.href = processedImageUrl;
    link.download = 'enhanced-image.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleOpenInNewTab = () => {
    if (!processedImageUrl) return;
    window.open(processedImageUrl, '_blank');
  };

  const handleObjectDetection = async () => {
    if (!s3Uri) return;
    setIsDetectionProcessing(true);
    console.log("s3Uri:", s3Uri);

    try {
      const response = await fetch('https://7s1dc19dr2.execute-api.ap-south-1.amazonaws.com/prod/object-detection', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        //body: JSON.stringify({ s3_uri: "s3://final-year-proj/pix2pix-results/srgan-prediction.png" }),
        body: JSON.stringify({ s3_uri: s3Uri }),
      });

      const data = await response.json();
      console.log("Detection result:", data);
      // const parsedBody = JSON.parse(data.body);
      // setDetectionResults({
      //   avgConfidence: parsedBody.avg_confidence,
      //   numObjects: parsedBody.num_objects
      // });
    } catch (error) {
      console.error("Detection error:", error);
    } finally {
      setIsDetectionProcessing(false);
    }
  };

  const handleOpenDetectionInNewTab = () => {
    if (!processedImageUrl) return;
    window.open(processedImageUrl, '_blank');
  };

  const handlePix2Pix = async (image) => {
    setIsProcessing(true);

    try {
      const response = await fetch('https://7s1dc19dr2.execute-api.ap-south-1.amazonaws.com/prod/pix2pix', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ s3_uri: image.name }),
      });

      const data = await response.json();
      console.log("Pix2Pix response:", data);
      
      if (data.zucc) {
        const fullS3Uri = `s3://final-year-proj/${data.zucc}`;
        setS3Uri(fullS3Uri);
      }
    } catch (error) {
      console.error("Pix2Pix error:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div
      className="pix2pix-page"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '2rem',
        textAlign: 'center',
      }}
    >
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1.5rem', color: 'white' }}>
        Pix2Pix Image Enhancement
      </h1>

      <ImageUploader
        actionButtons={(image, base64) => (
          <CustomButton 
            text={isProcessing ? "Processing..." : "Run Pix2Pix"} 
            onClick={() => handleDummyPix2Pix(image)} 
            type="pix2pix" 
            disabled={isProcessing}
          />
        )}
      />

      {/* Dummy Enhanced Image */}
      {showDummyImage && (
        <div style={{ marginTop: '2rem', width: '100%', maxWidth: '500px' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'white' }}>Pix2Pix Enhanced Image</h2>
          <img
            src={`https://picsum.photos/500/300?random=${Math.random()}`}
            alt="Pix2Pix Enhanced"
            style={{
              width: '100%',
              border: '1px solid #ccc',
              borderRadius: '8px',
            }}
          />
          <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <CustomButton
              text={isDetectionProcessing ? "Processing..." : "Run Object Detection"}
              onClick={handleDummyObjectDetection}
              type="detection"
              disabled={isDetectionProcessing}
            />
          </div>
        </div>
      )}

      {/* Dummy Detection Results */}
      {showDummyDetection && (
        <div style={{ marginTop: '2rem', width: '100%', maxWidth: '500px' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'white' }}>Object Detection Results</h2>
          <img
            src={`https://picsum.photos/500/300?random=${Math.random()}`}
            alt="Detection Results"
            style={{
              width: '100%',
              border: '1px solid #ccc',
              borderRadius: '8px',
            }}
          />
          <div style={{ marginTop: '1rem', width: '100%', maxWidth: '500px' }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: 'white' }}>Detection Results</h2>
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
                <p>{(Math.random() * 20 + 80).toFixed(1)}%</p>
              </div>
              <div>
                <p style={{ fontWeight: 'bold' }}>Objects Detected</p>
                <p>{Math.floor(Math.random() * 5 + 1)}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      <ProcessedS3Image imageUrl={processedImageUrl} />
      
      {processedImageUrl && (
        <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem' }}>
          <CustomButton
            text="Download Enhanced Image"
            onClick={handleDownload}
            type="download"
          />
          <CustomButton
            text="Open in New Tab"
            onClick={handleOpenInNewTab}
            type="open"
          />
          <CustomButton
            text={isDetectionProcessing ? "Processing..." : "Run Object Detection"}
            onClick={handleObjectDetection}
            type="detection"
            disabled={isDetectionProcessing}
          />
        </div>
      )}

      {detectionResults && (
        <div style={{ marginTop: '1rem', width: '100%', maxWidth: '500px' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: 'white' }}>Detection Results</h2>
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
              <p>{detectionResults.avgConfidence ? `${(detectionResults.avgConfidence * 100).toFixed(2)}%` : '-'}</p>
            </div>
            <div>
              <p style={{ fontWeight: 'bold' }}>Objects Detected</p>
              <p>{detectionResults.numObjects || '0'}</p>
            </div>
          </div>
          <div style={{ marginTop: '1rem' }}>
            <CustomButton
              text="View in New Tab"
              onClick={handleOpenDetectionInNewTab}
              type="open"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Pix2Pix; 