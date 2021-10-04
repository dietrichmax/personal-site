import puppeteer from "puppeteer";
import config from "@/lib/data/internal/SiteConfig"
import { ServerStyleSheet } from 'styled-components';


const stylesheet = new ServerStyleSheet();
const css = stylesheet.getStyleTags();

export default async function generatePDF () {
  const browser = await puppeteer.launch({headless:true});  
  
  const page = await browser.newPage();

  // go to page
  await page.goto(config.siteUrl+"/cv", {
      waitUntil: 'networkidle0',
      timeout: 60000
  })

  // get cv content
  const cv = await page.evaluate(() => document.querySelector("section").innerHTML);
  await page.setContent(`${css}${cv}`, {
    waitUntil: 'networkidle0'
  });
  
  //  Style
  const pdfBuffer = await page.pdf({ 
      format: "a4",
      printBackground: true,
  });

  await page.close();
  await browser.close();

  return pdfBuffer;
};
