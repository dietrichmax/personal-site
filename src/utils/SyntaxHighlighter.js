// components/SyntaxHighlighter.tsx
import Prism from "prismjs"

import "prismjs/components/prism-bash"
import "prismjs/components/prism-jsx"
import "prismjs/components/prism-markdown"
import "prismjs/components/prism-python"
import "prismjs/components/prism-sql"
import "prismjs/components/prism-yaml"

// include line numbers and line highlights plugin,
//import "prismjs/plugins/line-numbers/prism-line-numbers";
//import "prismjs/plugins/line-highlight/prism-line-highlight";

// include css for line numbers and highlights
//import "prismjs/plugins/line-numbers/prism-line-numbers.css";
//import "prismjs/plugins/line-highlight/prism-line-highlight.css";

import { useEffect, useRef, useState } from "react"

const SyntaxHighlighter = ({
  showlineNumbers = false,
  language,
  code,
  lineHighlights,
}) => {
  // 1. Add a state to track if the component has already been highlighted
  const [hihlighted, setHighlighted] = useState(typeof window === "undefined")
  const ref = useRef(null)
  useEffect(() => {
    if (ref.current) {
      // 2. create an IntersectionObserver to observe the ref to the div wrapper element.
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            // 4. Check if it's showing and not yet higlighted
            if (entry.isIntersecting && !hihlighted) {
              setHighlighted(true)
              setTimeout(() => {
                Prism.highlightAllUnder(entry.target)
              }, 50)
            }
          })
        },
        // 5. Add root margin so that we can highlight the code in advance before it shows to the screen.
        {
          rootMargin: "100%",
        }
      )
      // 3. Wire up ref and observer
      observer.observe(ref.current)
    }
  }, [])

  return (
    <div ref={ref}>
      <pre
        className={`line-numbers:${showlineNumbers}`}
        data-line={lineHighlights?.join(",")}
      >
        <code className={`language-${language}`}>{code.trim()}</code>
      </pre>
    </div>
  )
}
export default SyntaxHighlighter
