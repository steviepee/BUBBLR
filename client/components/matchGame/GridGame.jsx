import React from "react";

const GameGrid = ({ shuffledTiles, flipped, solved, handleClick, moves, resetGame, goToUploadScreen }) => {
  return (
    <div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 100px)",
          gap: "10px",
          justifyContent: "center",
          margin: "20px auto",
        }}
      >
        {shuffledTiles.map((tile, index) => (
          <div
            key={index}
            onClick={() => handleClick(index)}
            style={{
              width: "100px",
              height: "100px",
              perspective: "1000px",
              cursor: "pointer",
            }}
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                position: "relative",
                transformStyle: "preserve-3d",
                transition: "transform 0.6s",
                transform: flipped.includes(index) || solved.includes(index) ? "rotateY(180deg)" : "rotateY(0)",
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  backfaceVisibility: "hidden",
                  backgroundColor: "gray",
                  borderRadius: "10px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "24px",
                }}
              >
                ?
              </div>
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  backfaceVisibility: "hidden",
                  backgroundColor: "lightblue",
                  borderRadius: "10px",
                  transform: "rotateY(180deg)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img
                  src={tile.imageUrl}
                  alt={tile.name}
                  style={{ width: "80px", height: "80px", borderRadius: "10px" }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <p>Moves: {moves}</p>

      {/* Reset Button */}
      <button
        onClick={resetGame}
        style={{ marginTop: "10px", padding: "10px", fontSize: "16px" }}
      >
        Reset Game
      </button>

      {/* Edit Images Button */}
      <button
        onClick={goToUploadScreen}
        style={{ marginTop: "10px", padding: "10px", fontSize: "16px" }}
      >
        Edit Images
      </button>

      {/* End Game Condition */}
      {solved.length === shuffledTiles.length && (
        <p style={{ color: "green", fontWeight: "bold" }}>Game Over! 🎉</p>
      )}
    </div>
  );
};

export default GameGrid;