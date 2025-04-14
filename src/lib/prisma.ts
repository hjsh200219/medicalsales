import { PrismaClient } from '@/generated/prisma';

// PrismaClient는 싱글톤 패턴으로 구현하여 여러 API 라우트에서 연결 문제가 발생하지 않도록 함
const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

export default prisma; 