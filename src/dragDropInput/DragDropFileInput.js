import React, { useCallback, useState } from 'react';
import { Storage } from "@aws-amplify/storage";

import './dragDropFileInput.css';

const DragDropFileInput = ({ onFileSelect }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [imageURL, setImageURL] = useState(null);
  

  const handleDragEnter = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  // this is called when the file is selected or dropped
  // it will upload the file to S3 and then set the image URL to display
  const setImgURLInState = async (file) => {
    
    // this function is being passed in from the parent component
    // it will set the image file in the parent component's state
    await onFileSelect(file);

    // get the URL of the uploaded file from S3 and set it as the image URL to display on the form
    const url = await Storage.get(file.name);
    setImageURL(url);
  };

  const processFile = (file) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file.');
      return;
    }

    const maxFileSize = 200 * 1024;
    if (file.size > maxFileSize) {
      alert('Please upload an image smaller than 200KB.');
      return;
    }

    setImgURLInState(file);
  };

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        const file = e.dataTransfer.files[0];
        processFile(file);
      }
    },
    [setImgURLInState]
  );

  return (
    <div className="drag-drop-file-input">
      {imageURL ? (
        <img src={imageURL} alt="Uploaded" className="uploaded-image" />
      ) : (
        <div
          className={`drag-drop-area ${isDragging ? 'dragging' : ''}`}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <label htmlFor="file-input">
            {isDragging
              ? 'Drop your image here'
              : 'Drag and drop an image or click to select'}
          </label>
          <input
            type="file"
            id="file-input"
            className="file-input"
            onChange={(e) => processFile(e.target.files[0])}
          />
        </div>
      )}
    </div>
  );
};

export default DragDropFileInput;
