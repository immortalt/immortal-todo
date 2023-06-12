// delay the display of the children of the component by 0.5 second
import React, { useEffect, useState } from 'react'

type DelayDisplayProps = {
  delay?: number
  children: React.ReactNode
}
const DelayDisplay: React.FC<DelayDisplayProps> = ({
  delay = 500,
  children
}) => {
  const [display, setDisplay] = useState(false)
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDisplay(true)
    }, delay)
    return () => clearTimeout(timeout)
  }, [delay])
  return display ? <>{children}</> : null
}
export default DelayDisplay
