import * as React from "react"
import { SVGProps } from "react"

export interface MoonProps extends SVGProps<SVGSVGElement>{
    color: string
}

const Moon = ({color, ...props}: MoonProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 15 15"
    fill="none"
    className={color}
    {...props}
  >
    <path
      fill={color}
      fillRule="evenodd"
      d="M14.242 9.7c.407-.18.893.166.723.57-1.16 2.776-3.943 4.73-7.193 4.73C3.479 15 0 11.59 0 7.385 0 3.845 2.467.868 5.808.015c.433-.11.717.407.48.78a6.067 6.067 0 0 0-.945 3.258c0 3.418 2.827 6.188 6.315 6.188.889.001 1.77-.183 2.584-.54ZM9.835.76c-.294-.442.232-.97.674-.674l.788.525a1.943 1.943 0 0 0 2.156 0l.787-.525c.442-.295.97.232.674.673l-.525.788a1.943 1.943 0 0 0 0 2.156l.525.788c.295.442-.232.968-.673.673l-.788-.525a1.943 1.943 0 0 0-2.156 0l-.787.525c-.442.295-.97-.231-.675-.673l.525-.788a1.943 1.943 0 0 0 0-2.156L9.835.759Z"
      clipRule="evenodd"
    />
  </svg>
)
export default Moon
