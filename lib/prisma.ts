import { PrismaClient } from '@prisma/client';

declare module global {
  let prisma: PrismaClient | undefined;
  export { prisma };
}

export const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') global.prisma = prisma;
