import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient({
    log: process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
});

export const connectDB = async () => {
    try {
        await prisma.$connect();
        console.log("Prisma connected!");

        const locationCount = await prisma.location.count();
        console.log(`Location table accessible. Total locations: ${locationCount}`);
    } catch (err: any) {
        console.error(`Database connection error: ${err.message}`);
        process.exit(1);
    }
};

export const disconnectDB = async () => {
    await prisma.$disconnect();
};
