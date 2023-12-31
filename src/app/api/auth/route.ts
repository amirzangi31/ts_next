import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(req: NextRequest) {
  return NextResponse.json({ message: "success" });
}

export async function POST(req: NextRequest) {
  const body = await req.json();

  try {
    const res = await axios.post(
      `${process.env.NOBATAPI_DEV}/Public/Auth/VerifyCode`,
      {
        verificationCode: body.verificationCode,
        phoneVerificationCodeId: body.phoneVerificationCodeId,
      }
    );
    if (res.data.resultCode === 200) {
      cookies().set("accessToken", res.data.value.accessToken, { path: "/" });
      cookies().set("refreshToken", res.data.value.refreshToken, { path: "/" });
      return NextResponse.json({
        message: "ورود با موفقیت انجام شد",
        status: 200,
      });
    }
    if (res.data.resultCode === 1200) {
      return NextResponse.json({
        message: "شما هنوز ثبت نام نکرده اید",
        sessionId: res.data.value.sessionId,
        status: 1200,
      });
    }
  } catch (error) {
    return NextResponse.json({ error: "کد اشتباه میباشد", staus: 401 });
  }

  return NextResponse.json({});
}
