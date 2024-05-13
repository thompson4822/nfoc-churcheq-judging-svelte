// netlify/functions/delete_all_categories/delete_all_categories.js
const { MongoClient } = require("mongodb");

const mongoClient = new MongoClient(process.env.MONGODB_URI);

const clientPromise = mongoClient.connect();

exports.handler = async (event) => {
  try {
    const database = (await clientPromise).db(process.env.MONGODB_DATABASE);
    const collection = database.collection("category");

    await collection.deleteMany({});

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "All categories deleted" }),
    };
  } catch (error) {
    return { statusCode: 500, body: error.toString() };
  }
};