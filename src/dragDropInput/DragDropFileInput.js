import React, { useCallback, useState, useEffect } from 'react';
import { Storage } from "@aws-amplify/storage";

import './dragDropFileInput.css';

const DragDropFileInput = ({ onFileSelect, resetKey, noteRecord }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [imageURL, setImageURL] = useState(null);

  useEffect(() => {
    // Reset the state when the resetKey prop changes
    setImageURL(null);
  }, [resetKey]);

  useEffect(() => {
    // if noteRecord is passed in, it means that the component is being used to update an existing note. This funcion takes the image name from the noteRecord and uses it to derive the image URL from S3
    const fetchImageURL = async () => {
      if (noteRecord && noteRecord.image) {
        const url = await Storage.get(noteRecord?.image);
        console.log(url)
        setImageURL(url);

      }
    };
    fetchImageURL();
  }, [noteRecord]);

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

  // this is called when the file is selected or dropped, after the file checks have been performed.
  // If gives the parent component the name of the image file to upload to S3
  const setImgURLInState = async (file) => {

    // this function is being passed in from the parent component
    // it will set the image name in the parent component's state
    await onFileSelect(file);

    // The below is not necessary for the component to work, but it is useful as it derives the URL of the uploaded image from S3 and sets it as the image URL to display inside of the drag and drop area
    const url = await Storage.get(file.name);
    setImageURL(url);
  };

  // checks the file to make sure it is an image and is smaller than 200KB
  // if the checks are successful, it calls setImgURLInState() which is being passed by the parent component. it will set the image URL in the parent component's state
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
            // this is called when the file is selected through the file picker. If omitted the file checks of processFile() will only be performed when the file is dragged and dropped
            onChange={(e) => processFile(e.target.files[0])}
          />
        </div>
      )}
    </div>
  );
};

export default DragDropFileInput;
