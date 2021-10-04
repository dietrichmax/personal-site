import puppeteer from "puppeteer";
import config from "@/lib/data/internal/SiteConfig"
import { ServerStyleSheet } from 'styled-components';




export default async function generatePDF () {
  
  // get css
  const stylesheet = new ServerStyleSheet();
  const css = stylesheet.getStyleTags();
  
  console.log(css)
  
  //launch pupeteer
  const browser = await puppeteer.launch({
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox'
    ]
  })
  const page = await browser.newPage();

  // go to page
  await page.goto(config.siteUrl+"/cv", {
      waitUntil: 'networkidle0',
  })
  
  await page.addStyleTag({content: '.colTitle{color: var(--secondary-color)'})
  
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
