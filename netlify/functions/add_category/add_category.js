// netlify/functions/add_category/add_category.js
const { MongoClient } = require("mongodb");

const mongoClient = new MongoClient(process.env.MONGODB_URI);

const clientPromise = mongoClient.connect();

exports.handler = async (event) => {
  try {
    const database = (await clientPromise).db(process.env.MONGODB_DATABASE);
    const collection = database.collection("category");

    let category = JSON.parse(event.body);
    await collection.insertOne(category);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Category added" }),
    };
  } catch (error) {
    return { statusCode: 500, body: error.toString() };
  }
};