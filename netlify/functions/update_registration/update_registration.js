// eslint-disable-next-line @typescript-eslint/no-var-requires
const { MongoClient, ObjectId} = require("mongodb");

const mongoClient = new MongoClient(process.env.MONGODB_URI);

const clientPromise = mongoClient.connect();

const handler = async (event) => {
  try {
    let registration = JSON.parse(event.body);
    let { _id, ...rest } = registration;
    const database = (await clientPromise).db(process.env.MONGODB_DATABASE);
    const collection = database.collection("registration");
    await collection.updateOne({_id: new ObjectId(_id)}, {$set: rest});
    return {
      statusCode: 200,
      body: JSON.stringify({message: "Registration updated"}),
    }
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}

module.exports = { handler }