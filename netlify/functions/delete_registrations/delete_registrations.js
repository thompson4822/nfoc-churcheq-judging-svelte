// eslint-disable-next-line @typescript-eslint/no-var-requires
const { MongoClient } = require("mongodb");

const mongoClient = new MongoClient(process.env.MONGODB_URI);

const clientPromise = mongoClient.connect();

// POST
const handler = async (event) => {
  try {
    const database = (await clientPromise).db(process.env.MONGODB_DATABASE);
    const collection = database.collection("registration");
    await collection.deleteMany({});
    return {
      statusCode: 200,
      body: JSON.stringify({message: "Registrations deleted"}),
    }
  } catch (error) {
    return { statusCode: 422, body: error.toString() }
  }
}

module.exports = { handler }