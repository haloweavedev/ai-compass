/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "ai-compass",
      region: "us-east-1",
      home: "aws",
    };
  },
  async run() {
    const web = new sst.aws.Remix("web", {
      environment: {
        CLERK_PUBLISHABLE_KEY: process.env.CLERK_PUBLISHABLE_KEY || "",
        CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY || "",
        CLERK_SIGN_IN_FALLBACK_REDIRECT_URL: "/dashboard",
        CLERK_SIGN_UP_FALLBACK_REDIRECT_URL: "/dashboard"
      }
    });

    return {
      websiteUrl: web.url
    };
  }
});