const { app } = require('./app');

// Utils
const { connectMongo } = require('./utils/database.util');

const startServer = async () => {
  await connectMongo()

  // Spin up server
  const PORT = process.env.PORT || 4000;
  
  app.listen(PORT, () => {
    console.log(`Express app running on port: ${PORT}`);

  });
}

startServer()