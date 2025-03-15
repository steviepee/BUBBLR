import React, { useState, useEffect } from "react";

const UploadScreen = ({
  customImages,
  handleImageUpload,
  handleImageDelete,
  startGame,
  startGameWithDefault,
}) => {
  const [error, setError] = useState("");

  const handleStartGame = () => {
    const hasCustomImages = customImages.some((image) => image !== null);
    if (!hasCustomImages) {
      setError("Please upload at least one image before starting the game.");
    } else {
      setError("");
      startGame();
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Upload Images</h2>
      <p>Upload at least one image to start the game.</p>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", justifyContent: "center" }}>
        {customImages.map((image, index) => (
          <div key={index} style={{ textAlign: "center" }}>
            {image ? (
              <div style={{ position: "relative" }}>
                <img
                  src={image}
                  alt={`Custom ${index + 1}`}
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "cover",
                    borderRadius: "8px",
                    border: "2px solid #ccc",
                  }}
                />
                <button
                  onClick={() => handleImageDelete(index)}
                  style={{
                    position: "absolute",
                    top: "-10px",
                    right: "-10px",
                    background: "red",
                    color: "white",
                    border: "none",
                    borderRadius: "50%",
                    width: "24px",
                    height: "24px",
                    cursor: "pointer",
                  }}
                >
                  X
                </button>
              </div>
            ) : (
              <label
                style={{
                  display: "inline-block",
                  width: "100px",
                  height: "100px",
                  border: "2px dashed #ccc",
                  borderRadius: "8px",
                  cursor: "pointer",
                  textAlign: "center",
                  lineHeight: "100px",
                  fontSize: "24px",
                  color: "#ccc",
                }}
              >
                +
                <input
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={(e) => handleImageUpload(index, e)}
                />
              </label>
            )}
          </div>
        ))}
      </div>

      <div style={{ marginTop: "20px" }}>
        <button
          onClick={handleStartGame}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            backgroundColor: "#6b0042",
            color: "rgb(255, 186, 15)",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            marginRight: "10px",
          }}
        >
          Start Game
        </button>
        <button
          onClick={startGameWithDefault}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            backgroundColor: "#6b0042",
            color: "rgb(255, 186, 15)",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Start with Default Images
        </button>
      </div>
    </div>
  );
};

export default UploadScreen;