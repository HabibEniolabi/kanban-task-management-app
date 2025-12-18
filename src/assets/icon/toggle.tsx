import * as React from "react";
import { SVGProps } from "react";

export interface ToggleProps extends SVGProps<SVGSVGElement> {
  primaryColor: string;
  secondaryColor: string;
  isDark: boolean;
}

const Toggle = ({
  primaryColor,
  secondaryColor,
  isDark,
  ...props
}: ToggleProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 40 20"
    fill="none"
    className={primaryColor}
    {...props}
  >
    <rect width={40} height={20} fill={secondaryColor} rx={10} />
    <circle
      cx={10}
      cy={10}
      r={7}
      fill={primaryColor}
      className="transition-transform duration-300 ease-out"
      style={{
        transform: isDark ? "translateX(20px)" : "translateX(0px)",
        transformOrigin: "center",
      }}
    />
  </svg>
);
export default Toggle;
