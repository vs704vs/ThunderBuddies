"use client"


import React, { useState } from 'react';
import Webcam from 'react-webcam';
import Tesseract from 'tesseract.js';

const WebcamCapture = () => {
  const webcamRef = React.useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [extractedText, setExtractedText] = useState('');

  const captureImage = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setCapturedImage(imageSrc);
  }, []);

  const uploadImageAndExtractText = async () => {
    if (capturedImage) {
      const result = await Tesseract.recognize(capturedImage, 'eng');
      setExtractedText(result.data.text);
    }
  };

  return (
    <div>
      <Webcam audio={false} ref={webcamRef} />
      <button onClick={captureImage}>Capture Image</button>
      {capturedImage && (
        <div>
          <img src={capturedImage} alt="Captured" />
          <button onClick={uploadImageAndExtractText}>Upload & Extract Text</button>
          <div>
            <h3>Extracted Text:</h3>
            <pre>{extractedText}</pre>
          </div>
        </div>
      )}
    </div>
  );
};

export default WebcamCapture;

