import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaClient } from "@/generated/prisma";

// Prisma 클라이언트 초기화
const prisma = new PrismaClient();

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub as string;
      }
      return session;
    },
  },
  events: {
    async signIn({ user }) {
      try {
        if (!user.email) {
          console.error("사용자 이메일이 없습니다.");
          return;
        }

        // 사용자 정보를 salesdb의 user_info 테이블에 업데이트
        await prisma.user_info.upsert({
          where: { 
            email: user.email
          },
          update: { 
            name: user.name,
            image: user.image,
            last_login: new Date(),
          },
          create: { 
            email: user.email,
            name: user.name || "",
            image: user.image || null,
            last_login: new Date(),
          },
        });
        console.log(`사용자 정보가 업데이트되었습니다: ${user.email}`);
      } catch (error) {
        console.error("사용자 정보 업데이트 중 오류 발생:", error);
      }
    },
  },
});

export { handler as GET, handler as POST }; 