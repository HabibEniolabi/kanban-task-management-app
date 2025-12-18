import * as React from "react"
import { SVGProps } from "react"
interface SelectProps extends SVGProps<SVGSVGElement> {
    color: string;
}
const Select = ({color, ...props}: SelectProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 11 7"
    className={color}
    fill="none"
    {...props}
  >
    <path
      stroke={color}
      strokeWidth={2}
      d="m.707.707 4.699 4.699L10.104.707"
    />
  </svg>
)
export default Select
