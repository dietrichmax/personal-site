import puppeteer from "puppeteer";
import config from "@/lib/data/internal/SiteConfig"
const fs = require('fs');

export default async function generatePDF () {
  const browser = await puppeteer.launch({headless:true});  
  
  const page = await browser.newPage();


  // go topage
  await page.goto(config.siteUrl+"/cv", {
      waitUntil: 'networkidle0',
      timeout: 60000
  })

  // get cv content
  const cv = await page.evaluate(() => document.querySelector("section").innerHTML);
  await page.setContent(cv)
  
  //  Style
  const pdfBuffer = await page.pdf({ 
      format: "A4",
      printBackground: true,
  });

  await page.close();
  await browser.close();

  return pdfBuffer;
};
