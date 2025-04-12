import { PrismaClient } from '../generated/prisma';

// PrismaClient 인터페이스를 확장하여 타입 정의
declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

// Prisma 클라이언트 인스턴스화
export const db = global.prisma || new PrismaClient({
  log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
});

if (process.env.NODE_ENV !== "production") global.prisma = db; 