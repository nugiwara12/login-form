import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { name, price, image, description, rating } = req.body;

      // Convert price and rating to strings
      const parsedPrice = String(price);
      const parsedRating = String(rating);

      const newTagalog = await prisma.tagalog.create({
        data: {
          name,
          price: parsedPrice,
          image,
          description,
          rating: parsedRating,
        },
      });

      console.log("New tagalog item added:", newTagalog);

      return res.status(201).json(newTagalog);
    } catch (error) {
      console.error("Error while creating tagalog", error);
      return res
        .status(500)
        .json({ message: "Failed to create tagalog", error: error.message });
    }
  } else if (req.method === "PUT") {
    try {
      const { id, name, price, image, description, rating } = req.body;

      // Convert price and rating to strings
      const parsedPrice = String(price);
      const parsedRating = String(rating);

      const updatedTagalog = await prisma.tagalog.update({
        where: { id: Number(id) },
        data: {
          name,
          price: parsedPrice,
          image,
          description,
          rating: parsedRating,
        },
      });

      if (!updatedTagalog) {
        return res.status(404).json({ message: "Tagalog item not found" });
      }

      console.log("Updated tagalog item:", updatedTagalog);

      return res.status(200).json(updatedTagalog);
    } catch (error) {
      console.error("Error while updating tagalog", error);
      return res
        .status(500)
        .json({ message: "Failed to update tagalog", error: error.message });
    }
  } else if (req.method === "DELETE") {
    try {
      const { id } = req.body;

      const deletedTagalog = await prisma.tagalog.delete({
        where: { id: Number(id) },
      });

      if (!deletedTagalog) {
        return res.status(404).json({ message: "Tagalog item not found" });
      }

      console.log(`Tagalog item with ID ${id} deleted`);

      return res
        .status(200)
        .json({ message: `Tagalog item with ID ${id} deleted` });
    } catch (error) {
      console.error("Error while deleting Tagalog", error);
      return res
        .status(500)
        .json({ message: "Failed to delete tagalog", error: error.message });
    }
  } else if (req.method === "GET") {
    try {
      const { id } = req.query;

      if (id) {
        const tagalogItem = await prisma.tagalog.findUnique({
          where: { id: Number(id) },
        });

        if (!tagalogItem) {
          return res.status(404).json({ message: "Tagalog item not found" });
        }

        return res.status(200).json(tagalogItem);
      } else {
        const tagalogItems = await prisma.tagalog.findMany();
        return res.status(200).json(tagalogItems);
      }
    } catch (error) {
      console.error("Error while fetching tagalog", error);
      return res
        .status(500)
        .json({ message: "Failed to fetch tagalog", error: error.message });
    }
  } else {
    return res.status(405).json({ message: "Method Not Allowed" });
  }
}
