import { PrismaClient } from "@prisma/client";
const env = process.env;
const prisma =  new PrismaClient({
    datasources: {
        db: {
            url: env.DATABASE_URL,
        },
    },
});

export default prisma;