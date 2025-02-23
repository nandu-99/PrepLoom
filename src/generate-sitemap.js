
import fs from "fs";
import { SitemapStream, streamToPromise } from "sitemap";

// Define your website URL
const BASE_URL = "https://www.preploom.com";

// List of important pages to be included in the sitemap
const pages = [
  "/",                // Home Page
  "/dsa",             // DSA Section
  "/webdev", // Web Development Section
  "/interview",  // Interview Prep Section
  "/resume-portfolio-tips",
  "/feedback",           // Feedback Page
  "/contact",         // Contact Page
];

(async () => {
  const sitemap = new SitemapStream({ hostname: BASE_URL });

  pages.forEach((page) => {
    sitemap.write({ url: page, changefreq: "weekly", priority: 0.8 });
  });

  sitemap.end();

  const sitemapXML = await streamToPromise(sitemap).then((data) => data.toString());

  // Save the sitemap.xml file in the "public" folder
  fs.writeFileSync("./public/sitemap.xml", sitemapXML);

  console.log("✅ Sitemap generated successfully!");
})();
