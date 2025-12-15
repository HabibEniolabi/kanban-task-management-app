import * as React from "react"
import { SVGProps } from "react"
interface CancelProps extends SVGProps<SVGSVGElement> {
    color: string
}
const Cancel = ({color, ...props}: CancelProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 15 15"
    fill="none"
    className={color}
    {...props}
  >
    <path fill={color} d="m12.727 0 2.121 2.121L2.121 14.849l-2.122-2.121z" />
    <path fill={color} d="M0 2.121 2.12 0 14.85 12.728l-2.121 2.121z" />
  </svg>
)
export default Cancel