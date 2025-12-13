import * as React from "react"
import { SVGProps } from "react"

export interface ToggleProps extends SVGProps<SVGSVGElement>{
    color: string
}

const Toggle = ({color, ...props}: ToggleProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 40 20"
    fill="none"
    className={color}
    {...props}
  >
    <rect width={40} height={20} fill={color} rx={10} />
  </svg>
)
export default Toggle