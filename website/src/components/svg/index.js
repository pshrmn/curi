import React from "react";

export function Down() {
  return (
    <svg
      width="25"
      height="15"
      viewBox="0 0 25 15"
      xmlns="http://www.w3.org/2000/svg"
      className="inline-block"
    >
      <path d="M2,5 l5,5 l5,-5" fill="none" stroke="black" strokeWidth={3} />
    </svg>
  );
}

export function Up() {
  return (
    <svg
      width="25"
      height="15"
      viewBox="0 0 25 15"
      xmlns="http://www.w3.org/2000/svg"
      className="inline-block"
    >
      <path d="M2,10 l5,-5 l5,5" fill="none" stroke="black" strokeWidth={3} />
    </svg>
  );
}
