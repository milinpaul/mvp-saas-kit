import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";
import { Icons } from "../co/Icons";
import { siteConfig } from "../lib/siteConfig";
import { routes } from "../lib/routes";

interface UserWelcomeEmailProps {
  userFirstname: string;
}

const baseURL = "http://localhost:3000";

export const UserWelcomeEmail = ({
  userFirstname = "John",
}: UserWelcomeEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>{siteConfig.description}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Icons.logo className="w-10 h-10" />
          <Text style={paragraph}>Hi {userFirstname},</Text>
          <Text style={paragraph}>
            {` Welcome to ${siteConfig.name}, ${siteConfig.description}`}
          </Text>
          <Section style={btnContainer}>
            <Button
              pX={12}
              pY={12}
              style={button}
              href={`${baseURL}/${routes.login}`}
            >
              Verfiy email
            </Button>
          </Section>
          <Text style={paragraph}>
            Best,
            <br />
            {siteConfig.name}
          </Text>
          <Hr style={hr} />
          <Text style={footer}>YOUR ADDRESS GOES HERE</Text>
        </Container>
      </Body>
    </Html>
  );
};

export default UserWelcomeEmail;

const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
};

const logo = {
  margin: "0 auto",
};

const paragraph = {
  fontSize: "16px",
  lineHeight: "26px",
};

const btnContainer = {
  textAlign: "center" as const,
};

const button = {
  backgroundColor: "#5F51E8",
  borderRadius: "3px",
  color: "#fff",
  fontSize: "16px",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
};

const hr = {
  borderColor: "#cccccc",
  margin: "20px 0",
};

const footer = {
  color: "#8898aa",
  fontSize: "12px",
};
