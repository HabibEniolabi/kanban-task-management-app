"use client";
import * as React from "react";
import { SVGProps } from "react";
import { motion } from "framer-motion";

export interface ToggleProps extends SVGProps<SVGSVGElement> {
  checked: boolean;
  onToggle: () => void;
}

const Toggle = ({
  checked,
  onToggle,
  ...props
}: ToggleProps) => {
  const [showFocus, setShowFocus] = React.useState(false);
  return(
  <svg
      viewBox="0 0 40 20"
      width={40}
      height={20}
      role="switch"
      aria-checked={checked}
      tabIndex={0}
      onClick={onToggle}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onToggle();
        }
      }}
      {...props}
      onFocus={() => setShowFocus(true)}
      onBlur={() => setShowFocus(false)}
      onPointerDown={() => setShowFocus(false)} 
      style={{
        cursor: "pointer",
        outline:  "none",
        outlineOffset: "4px",
        borderRadius: "999px",
      }}
    >
      {/* Track */}
      <rect width={40} height={20} rx={10} fill="#635FC7" />

      {/* Knob */}
      <motion.circle
        cx={checked ? 30 : 10}
        cy={10}
        r={7}
        fill="#fff"
        animate={{ cx: checked ? 30 : 10 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      />
    </svg>
  )
};
export default Toggle;
