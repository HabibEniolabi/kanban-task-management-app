import * as React from "react"
import { SVGProps } from "react"

const Cancel = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 15 15"
    fill="currentColor"
    {...props}
  >
    <path fill="currentColor" d="m12.727 0 2.121 2.121L2.121 14.849l-2.122-2.121z" />
    <path fill="currentColor" d="M0 2.121 2.12 0 14.85 12.728l-2.121 2.121z" />
  </svg>
)
export default Cancel