import React, { useEffect } from 'react';
import { lightTheme, darkTheme } from '@/styles/themes';
import useDarkMode from 'use-dark-mode';
import { ThemeProvider } from "styled-components"

export default function Providers ({ children }) {
  const { value } = useDarkMode(true, { storageKey: null, onChange: null })
  const theme = value ? darkTheme : lightTheme

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
