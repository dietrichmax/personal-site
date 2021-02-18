import Link from "next/link"
import React, { useRef, useState} from "react"

export default React.forwardRef(({ to, prefetch, ...props }: IProps, ref: any) => {

  const handleSubmit = (type,to) => {
    window.location.href.includes("mxd.codes") ?
    window._paq.push(['trackEvent', 'link click', `${type} link click` , to]) : console.log("Event tracking disabled on local")
  }

  return (
    to.startsWith("/") ? 
    <Link href={to} prefetch={prefetch || false}>
      <a {...props} ref={ref} onClick={() => trackLink("internal",to)} />
    </Link> 
    :
    <a href={to} {...props} onClick={() => trackLink("external",to)} />

  );
});
