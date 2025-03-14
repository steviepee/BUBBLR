import React from "react";

const UploadScreen = ({ customImages, handleImageUpload, handleImageDelete, startGame, startGameWithDefault }) => {
  return (
    <div>
      <h2>Upload Images (Optional)</h2>
      <p>You can upload up to 8 images to customize the tiles.</p>
      {Array.from({ length: 8 }).map((_, index) => (
        <div key={index} style={{ margin: "10px" }}>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleImageUpload(index, e)}
          />
          {customImages[index] && (
            <div style={{ marginTop: "5px" }}>
              <img
                src={customImages[index]}
                alt={`Custom ${index}`}
                style={{ width: "50px", height: "50px", borderRadius: "5px" }}
              />
              <button onClick={() => handleImageDelete(index)} style={{ marginLeft: "5px" }}>
                Delete
              </button>
            </div>
          )}
        </div>
      ))}
      <button onClick={startGame} style={{ marginTop: "20px", padding: "10px", fontSize: "16px" }}>
        Start Game with Uploaded Images
      </button>
      <button onClick={startGameWithDefault} style={{ marginTop: "10px", padding: "10px", fontSize: "16px" }}>
        Play with Default Images
      </button>
    </div>
  );
};

export default UploadScreen;