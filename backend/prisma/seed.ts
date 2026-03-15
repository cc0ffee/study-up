import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient, seatingLevel } from "@prisma/client";

const prisma = new PrismaClient({
    adapter: new PrismaPg({
        connectionString: process.env.DATABASE_URL!
    }),
    log: process.env.NODE_ENV === "development" 
    ? ["query", "error", "warn"] 
    : ["error"],
});


const locations: any = [
]

const main = async () => {
    console.log("Seeding Locations!");

    for (const location of locations) {
        await prisma.location.create({
           data: location,
        });
        console.log(`Inserted location: ${location.cityName}`);
    }
}

main().catch((err) => {
    console.error(err);
    process.exit(1);
    }).finally(async () => {
        await prisma.$disconnect();
    })