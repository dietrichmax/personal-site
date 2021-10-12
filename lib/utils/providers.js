import React, { useEffect } from 'react';
import { lightTheme, darkTheme } from '@/styles/themes';
import { useDarkMode } from 'next-dark-mode'
import { ThemeProvider } from "styled-components"

export default function Providers ({ children }) {
  const { darkModeActive } = useDarkMode()
  const theme = darkModeActive ? darkTheme : lightTheme

  const [mounted, setMounted] = React.useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])
    
  const body = 
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>

  // prevents ssr flash for mismatched dark mode
  if (!mounted) {
      return <div style={{ visibility: 'hidden' }}>{body}</div>
  }

  return body
}
