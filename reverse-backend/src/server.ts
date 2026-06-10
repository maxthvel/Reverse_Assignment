import 'dotenv/config';
import app from './app';
import { connectDB } from './config/database';
import { env } from './config/env';

// Import models to register associations before sync
import './models/index';

const start = async () => {
  await connectDB();

  app.listen(env.PORT, () => {
    console.log(`🚀 Server running on http://localhost:${env.PORT}`);
    console.log(`📋 API Base: http://localhost:${env.PORT}/api/v1`);
    console.log(`🌍 Environment: ${env.NODE_ENV}`);
  });
};

start().catch((err) => {
  console.error('❌ Failed to start server:', err);
  process.exit(1);
});
