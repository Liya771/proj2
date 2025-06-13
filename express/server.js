const app = require('./app');               // Your Express app
const db = require('./models');             // Sequelize models (index.js auto-imports all models)

// Sync database and then start server
db.sequelize.sync().then(() => {
  console.log("✅ Database synced successfully");

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
}).catch((err) => {
  console.error("❌ Failed to sync database:", err);
});
