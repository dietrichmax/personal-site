import React from "react"
import CustomLayout from './wrapPageElement';

export const onRenderBody = ({ setHeadComponents }) => {
    setHeadComponents([
      <link
        rel="preconnect"
        key="preconnect-cloud"
        href="https://cdnjs.cloudflare.com"
      ></link>,
      <link
        rel="dns-prefetch"
        key="dns-prefetch-cloud"
        href="https://cdnjs.cloudflare.com"
      ></link>,
    ])
  }

export const wrapPageElement = CustomLayout;
