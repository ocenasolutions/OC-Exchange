import { MongoClient, type Db } from "mongodb"

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined
}

const uri = process.env.MONGODB_URI
if (!uri) {
  throw new Error("Missing MONGODB_URI environment variable")
}

const options = {}

let client: MongoClient
let clientPromise: Promise<MongoClient>

if (process.env.NODE_ENV === "development") {
  // In development use a global variable so the value
  // is preserved across module reloads caused by HMR.
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options)
    global._mongoClientPromise = client.connect()
  }
  clientPromise = global._mongoClientPromise
} else {
  // In production, it's best to not use a global.
  client = new MongoClient(uri, options)
  clientPromise = client.connect()
}

/**
 * Returns the connected MongoClient.
 */
export async function connectToDatabase(): Promise<MongoClient> {
  return clientPromise
}

/**
 * Convenience helper that returns a Mongo **Db** instance.
 * Defaults to the database name encoded in the MONGODB_URI string.
 */
export async function getDatabase(): Promise<Db> {
  const connectedClient = await connectToDatabase()
  return connectedClient.db() // uses default DB from URI
}

// Default export kept for legacy code that may import the promise directly.
export default clientPromise
