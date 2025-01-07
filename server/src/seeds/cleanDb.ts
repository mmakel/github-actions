import models from '../models/index.js';
import db from '../config/connection.js';

export default async (modelName: "Question", collectionName: string) => {
  try {
    let modelExists;
    if (models[modelName] && models[modelName].db && models[modelName].db.db) {
      modelExists = await models[modelName].db.db.listCollections({
        name: collectionName
      }).toArray();
    } else {
      throw new Error(`Model ${modelName} or its database is undefined`);
    }

    if (modelExists.length) {
      await db.dropCollection(collectionName);
    }
  } catch (err) {
    throw err;
  }
}
