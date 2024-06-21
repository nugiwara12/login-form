import { prisma } from "../../../config/db";
import bcrypt from "bcryptjs";

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      return await getUser(req, res);

    case "PUT":
      return await updateUser(req, res);

    case "DELETE":
      return await deleteUser(req, res);

    default:
      return res.status(400).send("Method not allowed");
  }
}

const getUser = async (req, res) => {
  try {
    const { userId } = req.query;

    // Validate userId
    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }

    const result = await prisma.users.findUnique({
      where: {
        id: parseInt(userId),
      },
    });

    if (!result) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json(result);
  } catch (error) {
    console.error("Error fetching user:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateUser = async (req, res) => {
  try {
    const { username, email, title } = req.body;
    const { userId } = req.query;

    // Validate userId
    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }

    const updatedUser = await prisma.users.update({
      where: {
        id: parseInt(userId),
      },
      data: {
        username,
        email,
        title,
      },
      select: {
        id: true,
        username: true,
        email: true,
        title: true,
      },
    });

    return res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { userId } = req.query;

    // Validate userId
    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }

    await prisma.users.delete({
      where: {
        id: parseInt(userId),
      },
    });

    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
