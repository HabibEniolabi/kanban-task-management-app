import * as React from "react"
import { SVGProps } from "react"

export interface EllipsisProps extends SVGProps<SVGSVGElement>{
    color: string
}
const Ellipsis = ({color, ...props}: EllipsisProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 5 20"
    fill="none"
    className={color}
    {...props}
  >
    <circle cx={2.308} cy={2.308} r={2.308} fill={color} />
    <circle cx={2.308} cy={10} r={2.308} fill={color} />
    <circle cx={2.308} cy={17.692} r={2.308} fill={color} />
  </svg>
)
export default Ellipsis