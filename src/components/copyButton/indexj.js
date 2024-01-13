import { useState } from 'react'
import clsx from 'clsx'
import { ClipboardIcon, CheckIcon } from '@heroicons/react/20/solid'

const buttonClasses = 'flex items-center text-xs font-medium text-white rounded'

export function CopyButton({ text, className }) {
  const [isCopied, setIsCopied] = useState(false)

  const copy = async () => {
    await navigator.clipboard.writeText(text)
    setIsCopied(true)

    setTimeout(() => {
      setIsCopied(false)
    }, 2500)
  }

  const Icon = isCopied ? CheckIcon : ClipboardIcon

  return (
    <button
      disabled={isCopied}
      onClick={copy}
      className={clsx(buttonClasses, className)}
    >
      <Icon className="mr-1 h-4 w-4" />
      <span>{isCopied ? 'Copied!' : 'Copy'}</span>
    </button>
  )
}

