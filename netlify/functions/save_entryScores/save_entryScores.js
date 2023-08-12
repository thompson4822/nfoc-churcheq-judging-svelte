// Docs on event and context https://docs.netlify.com/functions/build/#code-your-function-2
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { MongoClient } = require("mongodb");

const mongoClient = new MongoClient(process.env.MONGODB_URI);

const clientPromise = mongoClient.connect();

const handler = async (event) => {
  try {
    let entries = JSON.parse(event.body);
    const database = (await clientPromise).db(process.env.MONGODB_DATABASE);
    const collection = database.collection("entryScore");
    await collection.insertMany(entries);
    return {
      statusCode: 200
    }
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}

module.exports = { handler }
