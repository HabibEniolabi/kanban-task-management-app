import * as React from "react"
import { SVGProps } from "react"

interface EyeProps extends SVGProps<SVGSVGElement> {
    color?: string;
}
const Eye = ({color, ...props}: EyeProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 11"
    fill="none"
    className={color}
    {...props}
  >
    <path
      fill={color}
      fillRule="evenodd"
      d="M15.815 4.434A9.055 9.055 0 0 0 8 0 9.055 9.055 0 0 0 .185 4.434a1.333 1.333 0 0 0 0 1.354A9.055 9.055 0 0 0 8 10.222c3.33 0 6.25-1.777 7.815-4.434a1.334 1.334 0 0 0 0-1.354ZM8 8.89A3.776 3.776 0 0 1 4.222 5.11 3.776 3.776 0 0 1 8 1.333a3.776 3.776 0 0 1 3.778 3.778A3.776 3.776 0 0 1 8 8.89ZM8 8a2.889 2.889 0 1 0-1.36-5.438 1.19 1.19 0 1 1-1.189 1.19V3.75A2.889 2.889 0 0 0 8 8Z"
      clipRule="evenodd"
    />
  </svg>
)
export default Eye