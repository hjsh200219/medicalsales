import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { PrismaClient } from '@/generated/prisma';

const prisma = new PrismaClient();

// GET: 사용자 정보 조회
export async function GET(request: NextRequest) {
  try {
    // 세션 확인
    const session = await getServerSession();
    if (!session || !session.user) {
      return NextResponse.json({ error: '인증이 필요합니다' }, { status: 401 });
    }

    // 쿼리 파라미터에서 이메일 추출
    const searchParams = request.nextUrl.searchParams;
    const email = searchParams.get('email');

    if (!email) {
      return NextResponse.json({ error: '이메일이 필요합니다' }, { status: 400 });
    }

    // 인증된 사용자가 자신의 정보만 조회할 수 있도록 검증
    if (email !== session.user.email) {
      return NextResponse.json({ error: '권한이 없습니다' }, { status: 403 });
    }

    // 사용자 정보 조회
    const userInfo = await prisma.user_info.findUnique({
      where: { email },
    });

    if (!userInfo) {
      return NextResponse.json({ error: '사용자를 찾을 수 없습니다' }, { status: 404 });
    }

    return NextResponse.json(userInfo);
  } catch (error) {
    console.error('사용자 정보 조회 중 오류 발생:', error);
    return NextResponse.json({ error: '서버 오류가 발생했습니다' }, { status: 500 });
  }
}

// PATCH: 사용자 정보 업데이트
export async function PATCH(request: NextRequest) {
  try {
    // 세션 확인
    const session = await getServerSession();
    if (!session || !session.user) {
      return NextResponse.json({ error: '인증이 필요합니다' }, { status: 401 });
    }

    // 요청 본문 파싱
    const body = await request.json();
    const { email, name, company, address } = body;

    if (!email) {
      return NextResponse.json({ error: '이메일이 필요합니다' }, { status: 400 });
    }

    // 인증된 사용자가 자신의 정보만 업데이트할 수 있도록 검증
    if (email !== session.user.email) {
      return NextResponse.json({ error: '권한이 없습니다' }, { status: 403 });
    }

    // 사용자 정보 업데이트
    const updatedUserInfo = await prisma.user_info.update({
      where: { email },
      data: { 
        name: name || null,
        company: company || null,
        address: address || null,
      },
    });

    return NextResponse.json(updatedUserInfo);
  } catch (error) {
    console.error('사용자 정보 업데이트 중 오류 발생:', error);
    return NextResponse.json({ error: '서버 오류가 발생했습니다' }, { status: 500 });
  }
}

// DELETE: 사용자 탈퇴
export async function DELETE(request: NextRequest) {
  try {
    // 세션 확인
    const session = await getServerSession();
    if (!session || !session.user) {
      return NextResponse.json({ error: '인증이 필요합니다' }, { status: 401 });
    }

    // 요청 본문 파싱
    const body = await request.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json({ error: '이메일이 필요합니다' }, { status: 400 });
    }

    // 인증된 사용자가 자신의 계정만 탈퇴할 수 있도록 검증
    if (email !== session.user.email) {
      return NextResponse.json({ error: '권한이 없습니다' }, { status: 403 });
    }

    // 사용자 정보 삭제
    await prisma.user_info.delete({
      where: { email },
    });

    return NextResponse.json({ message: '회원 탈퇴가 완료되었습니다' });
  } catch (error) {
    console.error('사용자 탈퇴 중 오류 발생:', error);
    return NextResponse.json({ error: '서버 오류가 발생했습니다' }, { status: 500 });
  }
} 