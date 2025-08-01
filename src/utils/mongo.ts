import { MongoClient, Db, Collection } from 'mongodb';
import { config } from 'dotenv';

config();

const uri = process.env.MONGO_URI!;
const dbName = process.env.MONGO_DB || 'CircleBot';

let client: MongoClient | null = null;
let db: Db | null = null;
let isConnected = false;

/**
 * Connect to MongoDB and return the database instance.
 */
export async function connectToDatabase(): Promise<Db> {
  if (!isConnected || !client || !db) {
    client = new MongoClient(uri);
    await client.connect();
    db = client.db(dbName);
    isConnected = true;
    console.log(`✅ Connected to MongoDB: ${dbName}`);
  }

  return db;
}

/**
 * Get a typed MongoDB collection.
 * @param name The name of the collection
 */
export async function getCollection<T extends Document = any>(name: string): Promise<Collection<T>> {
  const db = await connectToDatabase();
  return db.collection<T>(name);
}

/**
 * Close the MongoDB connection.
 */
export async function disconnectMongo(): Promise<void> {
  if (client && isConnected) {
    await client.close();
    client = null;
    db = null;
    isConnected = false;
    console.log('🛑 Disconnected from MongoDB');
  }
}
