// netlify/functions/delete_category/delete_category.js
const { MongoClient, ObjectId } = require("mongodb");

const mongoClient = new MongoClient(process.env.MONGODB_URI);

const clientPromise = mongoClient.connect();

exports.handler = async (event) => {
  try {
    const database = (await clientPromise).db(process.env.MONGODB_DATABASE);
    const collection = database.collection("category");

    const { id } = JSON.parse(event.body);

    await collection.deleteOne({ _id: new ObjectId(id) });

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Category deleted" }),
    };
  } catch (error) {
    return { statusCode: 500, body: error.toString() };
  }
};