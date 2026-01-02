import * as React from "react"
import { SVGProps } from "react"

export interface HideIconProps extends SVGProps<SVGSVGElement> {
    color: string;
}
const Hide = ({color, ...props}: HideIconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 18 16"
    fill="none"
    className={color}
    {...props}
  >
    <path
      fill={color}
      fillRule="evenodd"
      d="M17.792 8.762a10.14 10.14 0 0 1-4.486 4.046l1.504 2.148a.375.375 0 0 1-.092.523l-.648.453a.375.375 0 0 1-.523-.092L3.19 1.044A.375.375 0 0 1 3.282.52L3.93.068a.375.375 0 0 1 .523.092l1.735 2.479A10.308 10.308 0 0 1 9 2.25c3.746 0 7.031 2 8.792 4.988a1.5 1.5 0 0 1 0 1.524ZM1.5 8a8.685 8.685 0 0 0 7.738 4.246l1.001 1.43c-.411.05-.825.074-1.239.074-3.746 0-7.031-2-8.792-4.988a1.5 1.5 0 0 1 0-1.524A10.112 10.112 0 0 1 3.4 3.906l.86 1.23A8.612 8.612 0 0 0 1.5 8Zm7.022 3.223a4.252 4.252 0 0 1-3.654-5.22l3.654 5.22Zm1.223-7.442A8.674 8.674 0 0 1 16.5 8a8.641 8.641 0 0 1-4.07 3.557l-.834-1.192a4.25 4.25 0 0 0 1.154-5.366V5a1.75 1.75 0 1 1-3.005-1.219Z"
      clipRule="evenodd"
    />
  </svg>
)
export default Hide
