import fs from "fs";
import path from "path";
import { SitemapStream, streamToPromise } from "sitemap";

// Define your website URL
const BASE_URL = "https://www.preploom.com";

// List of important pages to be included in the sitemap
const pages = [
  "/",                // Home Page
  "/dsa",             // DSA Section
  "/webdev",          // Web Development Section
  "/interview",       // Interview Prep Section
  "/resume-portfolio-tips",
  "/feedback",        // Feedback Page
  "/contact",         // Contact Page
];

(async () => {
  try {
    const sitemap = new SitemapStream({ hostname: BASE_URL });

    pages.forEach((page) => {
      sitemap.write({ url: page, changefreq: "weekly", priority: 0.8 });
    });

    sitemap.end();

    const sitemapXML = await streamToPromise(sitemap).then((data) => data.toString());

    // Define the public folder path
    const publicPath = path.join(process.cwd(), "public");

    // Ensure the "public" directory exists
    if (!fs.existsSync(publicPath)) {
      fs.mkdirSync(publicPath, { recursive: true });
    }

    // Save the sitemap.xml file in the "public" folder
    fs.writeFileSync(path.join(publicPath, "sitemap.xml"), sitemapXML);

    console.log("✅ Sitemap generated successfully!");
  } catch (error) {
    console.error("❌ Error generating sitemap:", error);
  }
})();
