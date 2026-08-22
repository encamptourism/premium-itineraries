/**
 * Server-Side Environment Configuration
 * This configuration is strictly server-side and never exposed to the client browser.
 */
export const config = {
  baseUrl: process.env.BASE_URL || "http://localhost:3000",
  baseToken: process.env.BASE_TOKEN || "",
};

export default config;
