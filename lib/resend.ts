"use server";
import { Resend } from "resend";

import { getEnvString } from "./siteConfig";
import UserWelcomeEmail from "@/emails/user-welcome";

interface WelcomeEmailOptions {
  firstName: string;
  to: string | string[];
}

const RESEND_API_KEY = getEnvString("RESEND_API_KEY");
const resend = new Resend(RESEND_API_KEY);

export async function sendWelcomeEmail({
  firstName: userFirstname,
  to,
}: WelcomeEmailOptions) {
  const emailTemplate = UserWelcomeEmail({ userFirstname });
  try {
    return resend.emails.send({
      from: "MVP SaaS Kit <onboarding@resend.dev>",
      to,
      subject: "Welcome to MVP SaaS Kit!",
      react: emailTemplate,
    });
  } catch (error) {
    // Log any errors and re-throw the error
    alert(`Error occurred: ${error}`);
    console.log({ error });
    throw error;
  }
}
