import React, { useEffect, useState } from "react"
import { lightTheme, darkTheme } from "@/styles/themes"
import useDarkMode from "use-dark-mode"
import { ThemeProvider } from "styled-components"

export default function Providers({ children }) {
  const { value } = useDarkMode(false, { storageKey: null, onChange: null })
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
