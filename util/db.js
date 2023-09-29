import mongoose from "mongoose";

async function connection() {
  await mongoose.connect(
    "mongodb+srv://abolfazl:abolfazl@cluster0.fx7iwsg.mongodb.net/myDb"
  );
  console.log("Connected.");
}
function convertToObj(doc) {
  doc._id = doc._id.toString();

  return doc;
}
const db = { connection ,convertToObj};

export default db;
