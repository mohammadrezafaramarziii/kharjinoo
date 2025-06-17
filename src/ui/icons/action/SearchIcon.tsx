import type { SVGProps } from "react";

export function SearchIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <g fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="11.5" cy="11.5" r="9.5" />
        <path strokeLinecap="round" d="m20 20l2 2" />
      </g>
    </svg>
  );
}
