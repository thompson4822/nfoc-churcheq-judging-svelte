// eslint-disable-next-line @typescript-eslint/no-var-requires
const { MongoClient, ObjectId } = require("mongodb");

const mongoClient = new MongoClient(process.env.MONGODB_URI);

const clientPromise = mongoClient.connect();

// POST
const handler = async (event) => {
  try {
    let userId = JSON.parse(event.body);
    const database = (await clientPromise).db(process.env.MONGODB_DATABASE);
    const collection = database.collection("entryScore");
    // Delete all entryScores for this user.
    await collection.deleteMany({userId: userId});
    return {
      statusCode: 200,
      body: JSON.stringify({message: "EntryScores deleted"}),
    }
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}

module.exports = { handler }