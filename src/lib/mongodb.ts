import "server-only";

import { MongoClient, type Db } from "mongodb";

const databaseName = process.env.MONGODB_DB_NAME ?? "alphamarkai";

declare global {
  var alphamarkaiMongoClientPromise: Promise<MongoClient> | undefined;
}

export function isMongoConfigured() {
  return Boolean(process.env.MONGODB_URI);
}

export async function getDatabase(): Promise<Db> {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error("MONGODB_URI is not configured.");
  }

  if (!globalThis.alphamarkaiMongoClientPromise) {
    const client = new MongoClient(uri, {
      maxPoolSize: 10,
      minPoolSize: 0,
      serverSelectionTimeoutMS: 5000,
    });
    globalThis.alphamarkaiMongoClientPromise = client.connect();
  }

  const client = await globalThis.alphamarkaiMongoClientPromise;
  return client.db(databaseName);
}
