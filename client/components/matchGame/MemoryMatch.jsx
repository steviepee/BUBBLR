import React, { useState, useEffect } from "react";
import UploadScreen from "./UploadScreen";
import GameGrid from "./GridGame";
import axios from "axios";

const MemoryMatch = ({ googleId }) => {
  const [shuffledTiles, setShuffledTiles] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [solved, setSolved] = useState([]);
  const [moves, setMoves] = useState(0);
  const [isChecking, setIsChecking] = useState(false);
  const [drinks, setDrinks] = useState([]);
  const [match, setMatch] = useState([]);
  const [customImages, setCustomImages] = useState(Array(8).fill(null));
  const [showGameGrid, setShowGameGrid] = useState(false);
  const [matchGameId, setMatchGameId] = useState(null);

  // Fetch match games
  const getMatch = () => {
    axios
      .get("/api/match-games/mGames")
      .then((response) => {
        setMatch(response.data);
      })
      .catch((err) => {
        console.error("Error fetching matches:", err);
      });
  };

  // Fetch drinks
  const getDrinks = async () => {
    try {
      const response = await axios.get("/api/match-games/search");
      const drinks = response.data || [];
      setDrinks(drinks);
      return drinks;
    } catch (err) {
      console.error("Error fetching drinks:", err);
      return [];
    }
  };

  // Create a new match game
  const createMatchGame = async (userId, drinkId, imageUrl) => {
    try {
      const response = await axios.post("/api/match-games", {
        userId,
        drinkId,
        imageUrl,
      });
      return response.data;
    } catch (error) {
      console.error("Failed to create match game:", error);
      throw error;
    }
  };

  // Update a match game
  const updateMatchGame = async (id, updatedData) => {
    try {
      const response = await axios.put(`/api/match-games/${id}`, updatedData);
      return response.data;
    } catch (error) {
      console.error("Failed to update match game:", error);
      throw error;
    }
  };

  // Delete a match game
  const deleteMatchGame = async (id) => {
    try {
      await axios.delete(`/api/match-games/${id}`);
    } catch (error) {
      console.error("Failed to delete match game:", error);
      throw error;
    }
  };

  useEffect(() => {
    getMatch();
  }, []);

  useEffect(() => {
    getDrinks();
  }, []);

  // Generate a unique default image URL for each pair of tiles
  const generateDefaultImageUrl = (index) => {
    const pairIndex = Math.floor(index / 2); // Group tiles into pairs (8 pairs for 16 tiles)
    return `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIFX1ykU1ch48HaZtoSEGfe--mQhoHNufV7g&s${pairIndex + 1}`;
  };

  // Initialize the game with fetched drink data or custom images
  const initializeGame = (data) => {
    // Create an array of unique items (custom images or drinks)
    const uniqueItems = customImages.map((image, index) =>
      image
        ? { id: index, name: "Custom", imageUrl: image }
        : data[index]
        ? {
            id: index,
            name: data[index].strDrink || "Default",
            imageUrl: data[index].strDrinkThumb || generateDefaultImageUrl(index),
          }
        : { id: index, name: "Default", imageUrl: generateDefaultImageUrl(index) }
    );

    // Ensure we have exactly 8 unique items
    const finalItems = uniqueItems.slice(0, 8);

    // Create pairs by duplicating each item
    const pairs = finalItems.flatMap((item) => [
      { ...item },
      { ...item }, // Duplicate the item
    ]);

    // Shuffle the pairs
    const shuffled = pairs.sort(() => Math.random() - 0.5);
    setShuffledTiles(shuffled);
  };

  // Handle tile click
  const handleClick = (index) => {
    if (flipped.includes(index) || solved.includes(index) || isChecking) return;

    const newFlipped = [...flipped, index];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setIsChecking(true);
      setTimeout(() => {
        const [firstIndex, secondIndex] = newFlipped;
        if (shuffledTiles[firstIndex].id === shuffledTiles[secondIndex].id) {
          setSolved((prevSolved) => [...prevSolved, firstIndex, secondIndex]);
        }
        setFlipped([]);
        setMoves((prevMoves) => prevMoves + 1);
        setIsChecking(false);

        // Update the match game with the new number of moves
        if (matchGameId) {
          updateMatchGame(matchGameId, { moves: moves + 1 });
        }
      }, 1000);
    }
  };

  // Reset the game
  const resetGame = async () => {
    try {
      const drinksData = await getDrinks();
      if (!drinksData || drinksData.length === 0) {
        console.error("No drinks data available");
        return;
      }

      setFlipped([]);
      setSolved([]);
      setMoves(0);
      setIsChecking(false);

      // Delete the current match game and create a new one
      if (matchGameId) {
        await deleteMatchGame(matchGameId);
      }

      const newMatchGame = await createMatchGame(
        googleId,
        drinksData[0]?.idDrink,
        customImages[0] || generateDefaultImageUrl(0)
      );
      setMatchGameId(newMatchGame.id);
    } catch (error) {
      console.error("Failed to reset game:", error);
    }
  };

  // Handle image upload for a specific tile
  const handleImageUpload = (index, e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      const newCustomImages = [...customImages];
      newCustomImages[index] = imageUrl;
      setCustomImages(newCustomImages);
    }
  };

  // Handle image deletion for a specific tile
  const handleImageDelete = (index) => {
    const newCustomImages = [...customImages];
    newCustomImages[index] = null;
    setCustomImages(newCustomImages);
  };

  // Start the game with uploaded images
  const startGame = async () => {
    try {
      const drinksData = await getDrinks();
      if (!drinksData || drinksData.length === 0) {
        console.error("No drinks data available");
        return;
      }

      initializeGame(drinksData);
      setShowGameGrid(true);

      // Create a new match game
      const newMatchGame = await createMatchGame(
        googleId,
        drinksData[0]?.idDrink,
        customImages[0] || generateDefaultImageUrl(0)
      );
      setMatchGameId(newMatchGame.id);
    } catch (error) {
      console.error("Failed to start game:", error);
    }
  };

  // Start the game with default images
  const startGameWithDefault = async () => {
    try {
      setCustomImages(Array(8).fill(null));
      const drinksData = await getDrinks();
      if (!drinksData || drinksData.length === 0) {
        console.error("No drinks data available");
        return;
      }

      setDrinks(drinksData);
      setShowGameGrid(true);

      // Create a new match game
      const newMatchGame = await createMatchGame(
        googleId,
        drinksData[0]?.idDrink,
        generateDefaultImageUrl(0)
      );
      setMatchGameId(newMatchGame.id);
    } catch (error) {
      console.error("Failed to start game with default images:", error);
    }
  };

  // Go back to the upload screen
  const goToUploadScreen = async () => {
    setShowGameGrid(false);

    // Delete the current match game
    if (matchGameId) {
      await deleteMatchGame(matchGameId);
    }
  };

  // Fetch drinks and match games when the component mounts
  useEffect(() => {
    const initialize = async () => {
      try {
        const drinksData = await getDrinks();
        setDrinks(drinksData);
        initializeGame(drinksData);
        await getMatch();
      } catch (error) {
        console.error("Failed to initialize game:", error);
      }
    };
    initialize();
  }, []);

  return (
    <div style={{ textAlign: "center", fontFamily: "Arial, sans-serif" }}>
      {console.log("drinks", drinks)}
      {console.log("matches", match)}
      <h1>Memory Match Game</h1>
      <p>Welcome, {googleId}!</p>

      {!showGameGrid ? (
        <UploadScreen
          customImages={customImages}
          handleImageUpload={handleImageUpload}
          handleImageDelete={handleImageDelete}
          startGame={startGame}
          startGameWithDefault={startGameWithDefault}
        />
      ) : (
        <GameGrid
          shuffledTiles={shuffledTiles}
          flipped={flipped}
          solved={solved}
          handleClick={handleClick}
          moves={moves}
          resetGame={resetGame}
          goToUploadScreen={goToUploadScreen}
        />
      )}
    </div>
  );
};

export default MemoryMatch;