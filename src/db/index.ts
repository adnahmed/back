import { PrismaClient } from "@prisma/client";
const env = process.env;
const prisma =  new PrismaClient({
    datasources: {
        db: {
            url: env.APP_ENV === "dev" ? env.LOCAL_DATABASE_URL : env.DATABASE_URL,
        },
    },
});

export default prisma;