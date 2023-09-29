import db from "@/util/db";
import users from "@/data/users";
import { User } from "@/models/userModel";


const postHandler = async (req, res) => {
  await db.connection();
  await User.deleteMany();
  await User.insertMany(users);
  res.send({ message: "User Added" });
};

export default postHandler;
