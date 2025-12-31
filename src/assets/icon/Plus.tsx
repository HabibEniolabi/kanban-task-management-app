import * as React from "react"
import { SVGProps } from "react"

interface PlusProps extends  SVGProps<SVGSVGElement> {
    color: string,
}

const Plus = ({color, ...props}: PlusProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 12 12"
    fill="none"
    className={color}
    {...props}
  >
    <path
      fill={color}
      d="M7.368 12V7.344H12V4.632H7.368V0H4.656v4.632H0v2.712h4.656V12h2.712Z"
    />
  </svg>
)
export default Plus
