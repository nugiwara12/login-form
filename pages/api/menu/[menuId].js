// handler.js

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { name, price, image, description, rating } = req.body;

      // Convert price to a string
      const parsedPrice = String(price);
      const parsedRating = String(rating);

      const newMenu = await prisma.menu.create({
        data: {
          name,
          price: parsedPrice,
          image,
          description,
          rating: parsedRating,
        },
      });

      console.log("New menu item added:", newMenu);

      return res.status(201).json(newMenu);
    } catch (error) {
      console.error("Error while creating menu", error);
      return res
        .status(500)
        .json({ message: "Failed to create menu", error: error.message });
    }
  } else if (req.method === "PUT") {
    try {
      const { id, name, price, image, description, rating } = req.body;

      // Convert price to a string
      const parsedPrice = String(price);
      const parsedRating = String(rating);

      const updatedMenu = await prisma.menu.update({
        where: { id: Number(id) },
        data: {
          name,
          price: parsedPrice,
          image,
          description,
          rating: parsedRating,
        },
      });

      if (!updatedMenu) {
        return res.status(404).json({ message: "Menu item not found" });
      }

      console.log("Updated menu item:", updatedMenu);

      return res.status(200).json(updatedMenu);
    } catch (error) {
      console.error("Error while updating menu", error);
      return res
        .status(500)
        .json({ message: "Failed to update menu", error: error.message });
    }
  } else if (req.method === "DELETE") {
    try {
      const { id } = req.body;

      const deletedMenu = await prisma.menu.delete({
        where: { id: Number(id) },
      });

      if (!deletedMenu) {
        return res.status(404).json({ message: "Menu item not found" });
      }

      console.log(`Menu item with ID ${id} deleted`);

      return res
        .status(200)
        .json({ message: `Menu item with ID ${id} deleted` });
    } catch (error) {
      console.error("Error while deleting menu", error);
      return res
        .status(500)
        .json({ message: "Failed to delete menu", error: error.message });
    }
  } else if (req.method === "GET") {
    try {
      const { id } = req.query;

      if (id) {
        const menuItem = await prisma.menu.findUnique({
          where: { id: Number(id) },
        });

        if (!menuItem) {
          return res.status(404).json({ message: "Menu item not found" });
        }

        return res.status(200).json(menuItem);
      } else {
        const menuItems = await prisma.menu.findMany();
        return res.status(200).json(menuItems);
      }
    } catch (error) {
      console.error("Error while fetching menu", error);
      return res
        .status(500)
        .json({ message: "Failed to fetch menu", error: error.message });
    }
  } else {
    return res.status(405).json({ message: "Method Not Allowed" });
  }
}
