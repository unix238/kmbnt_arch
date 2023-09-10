import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import config from './config/index.js';

import AuthRouter from './router.js';

const app = express();
process.setMaxListeners(0);
app.use('/uploads', express.static('uploads'));
app.use(cors());
app.use(express.json());

// Routers
app.use('/', AuthRouter);

const start = async () => {
  try {
    connectToDatabase();
    app.listen(config.PORT, () => {
      console.log(`app started on port ${config.PORT}`);
    });
  } catch (e) {
    console.log(e);
  }
};

const connectToDatabase = async () => {
  try {
    mongoose.set('strictQuery', false);
    await mongoose.connect(config.DB_URL);
    console.log('connected to database');
  } catch (e) {
    console.log('Error connecting to MongoDB');
    console.log(e);
    console.log('----------------------------');
  }
};
start();
