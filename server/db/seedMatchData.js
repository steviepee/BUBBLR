const { User, MatchGame } = require('./index'); // Adjust the path as needed

async function seedUsers() {
  const users = await User.bulkCreate([
    { id: 1, googleId: 'user1_google', email: 'user1@example.com' },
    { id: 2, googleId: 'user2_google', email: 'user2@example.com' },
    { id: 3, googleId: 'user3_google', email: 'user3@example.com' },
  ]);
  console.log('Users seeded');
  return users;
}

async function seedMatchGames() {
  await seedUsers(); // Ensure Users exist before inserting MatchGames

  await MatchGame.bulkCreate([
    { userId: 1, drinkId: 1, imageUrl: 'https://example.com/image1.jpg' },
    { userId: 1, drinkId: 2, imageUrl: 'https://example.com/image2.jpg' },
    { userId: 2, drinkId: 3, imageUrl: 'https://example.com/image3.jpg' },
    { userId: 2, drinkId: 4, imageUrl: 'https://example.com/image4.jpg' },
    { userId: 3, drinkId: 1, imageUrl: 'https://example.com/image5.jpg' },
    { userId: 3, drinkId: 4, imageUrl: 'https://example.com/image6.jpg' },
  ]);

  console.log('MatchGames seeded');
}

seedMatchGames().catch(console.error);
