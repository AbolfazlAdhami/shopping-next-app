import bcrypt from "bcrypt";
const saltRounds = 10;
const users = [
  {
    name: "User 1",
    email: "user1@gmail.com",
    password: bcrypt.hashSync("12345",saltRounds),
    isAdmin: true,
  },
  {
    name: "User 2",
    email: "user2@gmail.com",
    password: bcrypt.hashSync("112345",saltRounds),
    isAdmin: false,
  },
];
export default users;
