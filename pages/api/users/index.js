import { prisma } from "../../../config/db";
import bcrypt from "bcryptjs";

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      return await getUsers(req, res);

    case "POST":
      return await saveUser(req, res);

    default:
      return res.status(400).send("Method not allowed");
  }
}

const getUsers = async (req, res) => {
  try {
    const results = await prisma.users.findMany();
    return res.status(200).json({ users: results });
  } catch (error) {
    return res.status(500).json(error);
  }
};

const saveUser = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    // Validate input
    if (!username || !email || !password || !role) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Check if username already exists
    const existingUsername = await prisma.users.findFirst({
      where: { username },
    });

    if (existingUsername) {
      return res.status(409).json({ error: "Username already exists" });
    }

    // Check if email already exists
    const existingEmail = await prisma.users.findFirst({
      where: { email },
    });

    if (existingEmail) {
      return res.status(409).json({ error: "Email already exists" });
    }

    // Create the user
    const newUser = await prisma.users.create({
      data: {
        username,
        email,
        password: hashedPassword,
        role,
      },
      select: {
        id: true,
        username: true,
        email: true,
        password: true,
        role: true,
      },
    });

    return res
      .status(201)
      .json({ message: "User added successfully", user: newUser });
  } catch (error) {
    console.error("Error saving user:", error);
    return res.status(500).send("Error occurred");
  }
};
