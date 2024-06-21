import { PrismaClient } from "@prisma/client";

// Create a global variable to store the PrismaClient instance
const globalForPrisma = globalThis;

// Initialize the PrismaClient
const prisma = globalForPrisma.prisma || new PrismaClient();

// Set the global variable to the PrismaClient instance in development mode
if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export const db = prisma;
