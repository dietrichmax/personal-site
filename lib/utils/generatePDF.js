import React, { useState, useEffect } from "react"
import puppeteer from "puppeteer";
import config from "@/lib/data/internal/SiteConfig"
import ReactDOMServer from 'react-dom/server';
import CV from "@/components/cv/cv"
import { ServerStyleSheet } from 'styled-components';


export default async function generatePDF (cvData) {

  const stylesheet = new ServerStyleSheet();
  const html = ReactDOMServer.renderToString(stylesheet.collectStyles(<CV data={cvData}/>));


  const css = stylesheet.getStyleTags();


  //launch pupeteer
  const browser = await puppeteer.launch({
    headless: true,
    defaultViewport: null,
    args: ['--start-maximized'] 
  })


  const page = await browser.newPage();



  // go to page
  await page.goto(config.siteUrl+"/cv", {
      waitUntil: 'networkidle0',
  })
  

  // get cv content
  const cv = await page.evaluate(() => document.querySelector("section").innerHTML);

 
  await page.setContent(`${css}${html}`, {
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
