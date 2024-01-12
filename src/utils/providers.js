import React, { useEffect, useState } from "react"
import { lightTheme, darkTheme } from "@/styles/themes"
import { ThemeProvider } from "styled-components"

export default function Providers({ children }) {
  const isDarkMode = () =>
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  console.log(isDarkMode)
  const theme = value ? darkTheme : lightTheme

  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const body = <ThemeProvider theme={theme}>{children}</ThemeProvider>

  // prevents ssr flash for mismatched dark mode
  if (!mounted) {
    return <div style={{ visibility: "hidden" }}>{body}</div>
  }

  return body
}
