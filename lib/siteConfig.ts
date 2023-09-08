export const siteConfig = {
  name: "MVP SaaS Kit",
  domain: "MVPSaaSKit.com",
  url: "https://mvpsaaskit.com",
  description:
    "🚀 Starter kit to kick start your SaaS development and deploy fast.",
};

export const getSiteTitle = (pageName: string) => {
  if (!pageName) {
    return siteConfig.name;
  }

  return `${pageName} | ${siteConfig.name}`;
};

export const getEnvString = (key: string) => {
  if (!key) return "";

  return process.env[key] as string;
};
