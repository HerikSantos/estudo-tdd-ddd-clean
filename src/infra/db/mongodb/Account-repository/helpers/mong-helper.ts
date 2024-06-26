import { type Collection, MongoClient, type Db } from "mongodb";

export const mongoHelper = {
  client: null as MongoClient | null,
  db: null as Db | null,

  async connect(uri: string): Promise<void> {
    try {
      this.client = await MongoClient.connect(uri);
      this.db = this.client.db();
      console.log("Connected to MongoDB");
    } catch (error) {
      console.error("Error connecting to MongoDB:", error);
      throw error;
    }
  },

  async disconnect(): Promise<void> {
    if (this.client) {
      await this.client.close();
      this.client = null;
      this.db = null;
      console.log("Disconnected from MongoDB");
    }
  },

  getDbCollection(name: string): Collection | null {
    if (!this.client) {
      throw new Error(
        "No database connection. Did you forget to call connect?",
      );
    }

    return this.client.db().collection(name);
  },
  // eslint-disable-next-line
  map: (document: any): any => {
    const { _id, ...documentWithoutId } = document;

    return Object.assign({}, documentWithoutId, { id: _id });
  },
};
