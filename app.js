const express = require('express');
const path = require('path');
const app = express();
const sequelize = require('./database'); // Import Sequelize instance
const { User, Post, Tag } = require('./models'); // Import models
const mainRoutes = require('./routes/mainRoutes');

// Middleware
app.use(express.json());

// Seed the database with initial data
sequelize.sync({ force: true }) // Reset the database on every restart for testing
  .then(async () => {
    console.log('Database synchronized successfully.');

    // Create sample users
    const user1 = await User.create({ username: 'Alice', email: 'alice@example.com', passwordHash: 'hashedpassword' });
    const user2 = await User.create({ username: 'Bob', email: 'bob@example.com', passwordHash: 'hashedpassword' });

    // Create sample posts
    await Post.create({
      title: 'First Smile!',
      body: 'This is the first smile post.',
      happinessLevel: 5,
      likes: 10,
      userId: user1.id,
    });

    await Post.create({
      title: 'Hello World',
      body: 'This is another post to share joy!',
      happinessLevel: 4,
      likes: 20,
      userId: user2.id,
    });

    console.log('Sample data added.');
  })
  .catch((error) => {
    console.error('Error seeding the database:', error);
  });

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// API Routes
app.use('/api', mainRoutes);

// Catch-all for serving index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
