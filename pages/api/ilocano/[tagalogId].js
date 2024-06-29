import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const method = req.method;
  const { id, name, price, image, description, rating } = req.body;

  try {
    switch (method) {
      case "POST": {
        // Convert price and rating to strings
        const parsedPrice = String(price);
        const parsedRating = String(rating);

        const newIlocano = await prisma.ilocano.create({
          data: {
            name,
            price: parsedPrice,
            image,
            description,
            rating: parsedRating,
          },
        });

        console.log("New ilocano item added:", newIlocano);

        return res.status(201).json(newIlocano);
      }

      case "PUT": {
        // Convert price and rating to strings
        const parsedPrice = String(price);
        const parsedRating = String(rating);

        const updatedIlocano = await prisma.ilocano.update({
          where: { id: Number(id) },
          data: {
            name,
            price: parsedPrice,
            image,
            description,
            rating: parsedRating,
          },
        });

        if (!updatedIlocano) {
          return res.status(404).json({ message: "Ilocano item not found" });
        }

        console.log("Updated ilocano item:", updatedIlocano);

        return res.status(200).json(updatedIlocano);
      }

      case "DELETE": {
        const deletedIlocano = await prisma.ilocano.delete({
          where: { id: Number(id) },
        });

        if (!deletedIlocano) {
          return res.status(404).json({ message: "Ilocano item not found" });
        }

        console.log(`Ilocano item with ID ${id} deleted`);

        return res
          .status(200)
          .json({ message: `Ilocano item with ID ${id} deleted` });
      }

      case "GET": {
        const { id } = req.query;

        if (id) {
          const ilocanoItem = await prisma.ilocano.findUnique({
            where: { id: Number(id) },
          });

          if (!ilocanoItem) {
            return res.status(404).json({ message: "Ilocano item not found" });
          }

          return res.status(200).json(ilocanoItem);
        } else {
          const ilocanoItems = await prisma.ilocano.findMany();
          return res.status(200).json(ilocanoItems);
        }
      }

      default:
        return res.status(405).json({ message: "Method Not Allowed" });
    }
  } catch (error) {
    console.error(`Error while processing ${method} request`, error);
    return res.status(500).json({
      message: `Failed to process ${method} request`,
      error: error.message,
    });
  }
}
