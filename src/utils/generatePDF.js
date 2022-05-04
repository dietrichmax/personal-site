import React, { useState, useEffect } from "react"
import puppeteer from "puppeteer"
import config from "src/data/internal/SiteConfig"
import ReactDOMServer from "react-dom/server"
import CV from "src/components/cv/cv"
import { ServerStyleSheet } from "styled-components"

export default async function generatePDF(cvData) {
  /*const stylesheet = new ServerStyleSheet()
  /*const html = ReactDOMServer.renderToString(
    stylesheet.collectStyles(<CV data={cvData} />)
  )
  const css = stylesheet.getStyleTags()*/

  //launch pupeteer
  const browser = await puppeteer.launch({
    headless: true,
    defaultViewport: null,
    args: ["--start-maximized"],
  })

  const page = await browser.newPage()
  await page.setViewport({width:800,height:1020});
  await page.goto('https://mxd.codes/cv',{ waitUntil: 'networkidle0'});
  await page.evaluate(() => {
    /*var cookieBanner = document.querySelector("#cookies_accept");
    cookieBanner.parentNode.removeChild(cookieBanner);
    document.getElementById("cv");*/
  })
  

  await page.emulateMediaType('screen'); 
  const pdfBuffer = await page.pdf({
    format: "A4",
    printBackground: true,
  })
  
  await page.close()
  await browser.close()

  return pdfBuffer
}
