import { NextRequest, NextResponse } from "next/server";
import { getProfileData } from "@/lib/markdown";

export async function POST(request: NextRequest) {
  try {
    const { name, email, message } = await request.json();

    // Validate input
    if (!name || !email || !message) {
      return NextResponse.json(
        { message: "请填写所有必填字段" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { message: "请输入有效的邮箱地址" },
        { status: 400 }
      );
    }

    // Get profile data to retrieve the recipient email
    const profile = await getProfileData();

    // In a production environment, you would use a service like:
    // - Resend (https://resend.com)
    // - SendGrid
    // - AWS SES
    // - Nodemailer with SMTP
    
    // For now, we'll log the message and return success
    // You can replace this with actual email sending logic
    console.log("Contact form submission:", {
      from: email,
      to: profile.contact.email,
      name,
      message,
    });

    // Example using Resend (uncomment and configure when ready):
    /*
    const resend = new Resend(process.env.RESEND_API_KEY);
    
    await resend.emails.send({
      from: "contact@yourdomain.com",
      to: profile.contact.email,
      subject: `来自 ${name} 的留言`,
      text: `发件人: ${name} <${email}>\n\n${message}`,
      reply_to: email,
    });
    */

    return NextResponse.json(
      { message: "消息发送成功" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { message: "发送失败，请稍后重试" },
      { status: 500 }
    );
  }
}
