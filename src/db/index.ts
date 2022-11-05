import { PrismaClient } from '@prisma/client'
const env = process.env
export default new PrismaClient({
    datasources: {
        db: {
            url: env.NODE_ENV==="dev" ? env.LOCAL_DATABASE_URL : env.DATABASE_URL
        }
    }
})
