import React, { useState } from 'react';
import './ImageUploader.css';

const ImageUploader = ({ actionButtons }) => {
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setPreview(null);
        setImage(file);

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="uploader-container">
            <h1>Upload the image here! 📸</h1>
            <div className="upload-box">
                <label htmlFor="upload-input" className="upload-label">
                    {preview ? (
                        <img src={preview} alt="Preview" className="image-preview" />
                    ) : (
                        <span>Click to upload image</span>
                    )}
                </label>
                <input
                    id="upload-input"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    hidden
                />
            </div>

            {preview && actionButtons && (
                <div className="button-group">
                    {actionButtons(preview, image)} 
                </div>
            )}
        </div>
    );
};

export default ImageUploader;