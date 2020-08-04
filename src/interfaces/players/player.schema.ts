import * as mongoose from 'mongoose';

export const PlayerSchema = new mongoose.Schema({
    email: { type: String, unique: true },
    name: String,
    cellphone: String,
    ranking: String,
    positionRanking: Number,
    urlPhotoPlayer: String,
  },
  { timestamps: true, collection: 'players' },
);
