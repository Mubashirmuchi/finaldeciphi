import { draftMode } from "next/headers";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

function getPreviewPath(
  contentType: string | undefined,
  slug: string | null,
  locale: string | null,
  status: string | null,
): string {
  const basePath = (() => {
    if (!contentType) return "/";

    if (contentType === "post" || contentType.includes("posts")) {
      return slug ? "/blog/" + slug : "/blog";
    }

    if (contentType === "page" || contentType.includes("pages")) {
      return slug ? "/" + slug : "/";
    }

    return "/" + contentType;
  })();

  const localePath =
    locale && locale !== "en" ? "/" + locale + basePath : basePath;
  const statusParam = status ? "?status=" + status : "";
  return localePath + statusParam;
}

export const GET = async (request: Request) => {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");
  const slug = searchParams.get("slug");
  const locale = searchParams.get("locale");
  const uid = searchParams.get("uid");
  const status = searchParams.get("status");

  if (secret !== process.env.PREVIEW_SECRET) {
    return new Response("Invalid token", { status: 401 });
  }

  const contentType = uid?.split(".").pop();
  const finalPath = getPreviewPath(contentType, slug, locale, status);

  const draft = await draftMode();
  status === "draft" ? draft.enable() : draft.disable();

  redirect(finalPath);
};

export async function POST(request: NextRequest) {
  try {
    const { name, email, service, message } = await request.json();

    if (!name || !email || !service) {
      return NextResponse.json(
        { error: "Name, email, and service are required" },
        { status: 400 },
      );
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // Use App Password for Gmail
      },
    });

    const notificationEmail = {
      from: process.env.EMAIL_USER,
      to: "mubashirfreston@gmail.com",
      subject: `Contact Form: ${name} - ${service}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Service:</strong> ${service}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, "<br>")}</p>
        <hr>
        <p><small>Submitted: ${new Date().toLocaleString()}</small></p>
      `,
      replyTo: email,
    };

    // Auto-reply email to customer
    // const autoReplyEmail = {
    //   from: process.env.EMAIL_USER,
    //   to: email,
    //   subject: "Thank You for Your Inquiry - We'll Be In Touch Soon!",
    //   html: `
    //     <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
    //       <h1 style="color: #2563eb; text-align: center;">Thank You for Contacting Us!</h1>

    //       <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
    //         <p>Hi <strong>${name}</strong>,</p>
    //         <p>Thank you for reaching out to us regarding <strong>${service}</strong>. We have received your message and appreciate your interest in our cybersecurity services.</p>
    //         <p><strong>Our team will contact you within 24-48 hours</strong> to discuss your requirements and how we can help secure your business.</p>
    //       </div>

    //       <div style="border-left: 4px solid #10b981; padding-left: 16px; margin: 20px 0;">
    //         <p style="font-size: 14px; color: #6b7280;">
    //           <strong>Your Message Summary:</strong><br>
    //           Service: ${service}<br>
    //           Submitted: ${new Date().toLocaleString()}
    //         </p>
    //       </div>

    //       <div style="margin-top: 30px;">
    //         <p style="color: #6b7280;">
    //           Best regards,<br>
    //           <strong>Your Cybersecurity Team</strong><br>
    //           Email: mubashirfreston@gmail.com
    //         </p>
    //       </div>

    //       <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
    //         <p style="font-size: 12px; color: #9ca3af;">
    //           This is an automated response. Please do not reply to this email.
    //         </p>
    //       </div>
    //     </div>
    //   `,
    // };

    const autoReplyEmail = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Thank You for Your Inquiry - We'll Be In Touch Soon!",
      html: `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  </head>
  <body
    style="
      margin: 0;
      padding: 0;
      background-color: #ffffff;
      font-family: Arial, sans-serif;
    "
  >
    <div
      style="
        max-width: 600px;
        margin: 0 auto;
        padding: 40px 40px 0 40px;
        background-color: #ffffff;
      "
    >
      <!-- Logo top-left -->
      <div style="margin-bottom: 36px">
        <img
          src="https://deciphi.vercel.app/img_frame_39.svg"
          alt="Deciphi Logo"
          style="height: 40px"
        />
      </div>

      <!-- Headline -->
      <h1
        style="
          font-size: 24px;
          font-weight: 700;
          color: #1a1a1a;
          margin: 0 0 24px 0;
          line-height: 1.3;
        "
      >
        Thanks for reaching out, ${name}!
      </h1>

      <!-- Body text -->
      <p
        style="
          font-size: 15px;
          color: #4a4a4a;
          line-height: 1.7;
          margin: 0 0 16px 0;
        "
      >
        Hi <strong>${name}</strong>,
      </p>

      <p
        style="
          font-size: 15px;
          color: #4a4a4a;
          line-height: 1.7;
          margin: 0 0 16px 0;
        "
      >
        We've received your enquiry regarding <strong>${service}</strong>. One
        of our specialists will get back to you shortly to understand your
        requirements in detail.
      </p>

      <p
        style="
          font-size: 15px;
          color: #4a4a4a;
          line-height: 1.7;
          margin: 0 0 24px 0;
        "
      >
        Your submission is safe with us. We aim to respond within
        <strong>2–4 hours</strong>.
      </p>

      <!-- What happens next block -->
      <p
        style="
          font-size: 15px;
          font-weight: 700;
          color: #1a1a1a;
          margin: 0 0 6px 0;
        "
      >
        What happens next:
      </p>
      <p
        style="
          font-size: 15px;
          color: #4a4a4a;
          line-height: 1.7;
          margin: 0 0 32px 0;
        "
      >
        One of our team members will reach out to discuss your requirements and
        how Deciphi can help.
      </p>

      <p
        style="
          font-size: 15px;
          color: #4a4a4a;
          line-height: 1.7;
          margin: 0 0 40px 0;
        "
      >
        In the meantime, please find our
        <span style="font-size: 15px; color: #4a4a4a"
          >company brochure attached</span
        >, which provides an overview of our services.
      </p>

      <!-- Divider -->
      <hr
        style="border: none; border-top: 1px solid #eeeeee; margin: 0 0 28px 0"
      />

      <!-- Signature -->
      <p style="font-size: 14px; color: #4a4a4a; margin: 0 0 2px 0">
        Best Regards,
      </p>
      <p
        style="
          font-size: 16px;
          font-weight: 700;
          color: #1a1a1a;
          margin: 0 0 8px 0;
        "
      >
        Deciphi Team
      </p>

      <!-- Contact info using table for alignment -->
      <table
        cellpadding="0"
        cellspacing="0"
        border="0"
        style="margin: 0 0 4px 0"
      >
        <tr>
          <td style="vertical-align: middle; padding-right: 6px">
            <img
              src="https://img.icons8.com/?size=100&id=86875&format=png&color=000000"
              width="16"
              height="16"
              alt="email"
              style="display: block"
            />
          </td>
          <td style="vertical-align: middle">
            <a
              href="mailto:info@deciphi.com"
              style="font-size: 13px; color: #888888; text-decoration: none"
              >info@deciphi.com</a
            >
          </td>
        </tr>
      </table>

      <table cellpadding="0" cellspacing="0" border="0" style="margin: 4px 0">
        <tr>
          <td style="vertical-align: middle; padding-right: 6px">
            <img
              src="https://img.icons8.com/?size=100&id=78382&format=png&color=000000"
              width="16"
              height="16"
              alt="phone"
              style="display: block"
            />
          </td>
          <td style="vertical-align: middle">
            <a
              href="tel:+97441499289"
              style="font-size: 13px; color: #888888; text-decoration: none"
              >+974 4149 9289</a
            >
          </td>
        </tr>
      </table>

      <table
        cellpadding="0"
        cellspacing="0"
        border="0"
        style="margin: 4px 0 40px 0"
      >
        <tr>
          <td style="vertical-align: middle; padding-right: 6px">
            <img
              src="https://img.icons8.com/?size=100&id=wlHxVPEvvzku&format=png&color=000000"
              width="16"
              height="16"
              alt="location"
              style="display: block"
            />
          </td>
          <td style="vertical-align: middle">
            <span style="font-size: 13px; color: #888888"
              >Hub Business Center-A55, Doha Souq Mall, Doha, Qatar</span
            >
          </td>
        </tr>
      </table>

      <!-- Divider -->
      <hr
        style="border: none; border-top: 1px solid #eeeeee; margin: 0 0 24px 0"
      />

      <!-- Social icons — table-based, centered -->
      <table
        cellpadding="0"
        cellspacing="0"
        border="0"
        width="100%"
        style="margin-bottom: 20px"
      >
        <tr>
          <td align="center">
            <table cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td style="padding: 0 10px">
                  <a
                    href="https://www.deciphi.com"
                    style="
                      color: #555555;
                      text-decoration: none;
                      font-size: 13px;
                    "
                  >
                    <img
                      src="https://img.icons8.com/?size=512w&id=Kqsi3v5rWFW9&format=png"
                      width="16"
                      height="16"
                      alt="website"
                      style="
                        display: inline-block;
                        vertical-align: middle;
                        margin-right: 4px;
                      "
                    /><span style="vertical-align: middle">Website</span>
                  </a>
                </td>
                <td style="padding: 0 10px">
                  <a
                    href="mailto:mubashir@deciphi.com"
                    style="
                      color: #555555;
                      text-decoration: none;
                      font-size: 13px;
                    "
                  >
                    <img
                      src="https://img.icons8.com/?size=512w&id=86840&format=png"
                      width="16"
                      height="16"
                      alt="email"
                      style="
                        display: inline-block;
                        vertical-align: middle;
                        margin-right: 4px;
                      "
                    /><span style="vertical-align: middle">Email</span>
                  </a>
                </td>
                <td style="padding: 0 10px">
                  <a
                    href="https://linkedin.com"
                    style="
                      color: #555555;
                      text-decoration: none;
                      font-size: 13px;
                    "
                  >
                    <img
                      src="https://img.icons8.com/?size=512&id=98960&format=png"
                      width="18"
                      height="18"
                      alt="linkedin"
                      style="
                        display: inline-block;
                        vertical-align: middle;
                        margin-right: 4px;
                      "
                    /><span style="vertical-align: middle">LinkedIn</span>
                  </a>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>

      <!-- Footer links -->
      <div style="text-align: center; margin-bottom: 16px">
        <a
          href="https://www.deciphi.com/privacy"
          style="
            font-size: 13px;
            color: #888888;
            text-decoration: underline;
            margin: 0 8px;
          "
          >Privacy</a
        >
        <span style="color: #cccccc">|</span>
        <a
          href="https://www.deciphi.com/terms"
          style="
            font-size: 13px;
            color: #888888;
            text-decoration: underline;
            margin: 0 8px;
          "
          >Terms</a
        >
      </div>

      <!-- Copyright footer -->
      <div
        style="background-color: #8b1a1a; margin: 0 -40px; padding: 16px 40px"
      >
        <p
          style="
            margin: 0;
            font-size: 11px;
            color: rgba(255, 255, 255, 0.75);
            text-align: center;
            line-height: 1.6;
          "
        >
          © Deciphi &nbsp;|&nbsp; Hub Business
          Center-A55, 7FFW+JX Doha Souq Mall, Doha, Qatar<br />
          This e-mail is confidential and intended for the named recipient only.
        </p>
      </div>
    </div>
  </body>
</html>


      `,
    };

    await Promise.all([
      transporter.sendMail(notificationEmail),
      transporter.sendMail(autoReplyEmail),
    ]);

    return NextResponse.json(
      { success: true, message: "Emails sent successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 },
    );
  }
}
