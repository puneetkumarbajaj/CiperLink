// globals.d.ts
import { MongoClient } from 'mongodb';

declare global {
  var _mongoClientPromise: Promise<MongoClient>;
  var _mongoClient: MongoClient | undefined;
}

export {};
