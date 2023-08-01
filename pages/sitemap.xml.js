import fs from "fs";
import path from "path";

// TODO: Add static url like about us page here
function generateSiteMap(posts) {
  console.log("posts", posts);
  const baseUrl = "https://jeffdevslife.com";
  return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
     <!--We manually set the two URLs we know already-->
     <url>
       <loc>${baseUrl}</loc>
     </url>
     <url>
       <loc>${baseUrl}/about</loc>
     </url>
     <url>
       <loc>${baseUrl}/contact</loc>
     </url>
     ${posts
       .map((url) => {
         return `
       <url>
           <loc>${`${baseUrl}/${url}`}</loc>
       </url>
     `;
       })
       .join("")}
   </urlset>
 `;
}

function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps({ res }) {
  const filesPath = fs.readdirSync(path.join("content/posts"));
  const sanitizeFiles = filesPath.flatMap((file) =>
    file.includes(".md") ? [file.slice(0, file.indexOf("."))] : []
  );

  // We generate the XML sitemap with the posts data
  const sitemap = generateSiteMap(sanitizeFiles);

  res.setHeader("Content-Type", "text/xml");
  // we send the XML to the browser
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default SiteMap;
