import { ReactNode, useEffect, useState } from "react"
import { lightTheme, darkTheme } from "@/styles/themes"
import { ThemeProvider } from "styled-components"

interface Providers {
  children: ReactNode
}

export default function Providers({ children }) {
  const [mounted, setMounted] = useState(false)
  const [darkMode, setDarkMode] = useState(true)
  const preferDarkQuery = "(prefers-color-scheme: dark)"

  useEffect(() => {
    setMounted(true)
    // Add listener to update styles
    window
      .matchMedia(preferDarkQuery)
      .addEventListener("change", (e) => setDarkMode(e.matches))
    // Setup dark/light mode for the first time
    setDarkMode(global.matchMedia(preferDarkQuery).matches)
    // Remove listener
    return () => {
      window.matchMedia(preferDarkQuery).removeEventListener("change", () => {})
    }
  }, [])

  const theme: any = darkMode ? darkTheme : lightTheme
  const body = <ThemeProvider theme={theme}>{children}</ThemeProvider>

  // prevents ssr flash for mismatched dark mode
  if (!mounted) {
    return <div style={{ visibility: "hidden" }}>{body}</div>
  }

  return body
}
