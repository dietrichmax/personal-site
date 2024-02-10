import { usePathname } from "next/navigation"
import Link from "next/link"
import React, { Children } from "react"

interface ActiveLink {
  children: React.ReactNode
  activeClassName: string
  href: string
}
const ActiveLink = ({ children, activeClassName, href }: ActiveLink) => {
  const child = Children.only(children)

  // pages/index.js will be matched via props.href
  // pages/about.js will be matched via props.href
  // pages/[slug].js will be matched via props.as
  const className = `${activeClassName}`.trim()

  return (
    <Link href={href} legacyBehavior passHref={true}>
      {children}
    </Link>
  )
}

export default ActiveLink
