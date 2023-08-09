// eslint-disable-next-line @typescript-eslint/no-var-requires
const { MongoClient, ObjectId } = require("mongodb");

const mongoClient = new MongoClient(process.env.MONGODB_URI);

const clientPromise = mongoClient.connect();

// POST
const handler = async (event) => {
  try {
    let _id = JSON.parse(event.body)._id;
    const database = (await clientPromise).db(process.env.MONGODB_DATABASE);
    const collection = database.collection("registration");
    await collection.deleteOne({_id: new ObjectId(_id)});
    return {
      statusCode: 200,
      body: JSON.stringify({message: "Registration deleted"}),
    }
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}

module.exports = { handler }