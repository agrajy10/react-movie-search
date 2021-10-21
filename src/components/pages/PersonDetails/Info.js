import { useState } from "react";

export default function Info({ biography }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <h2 className="text-primary-color text-lg font-bold mb-2">About:</h2>
      <p className="leading-7">
        {expanded ? biography : `${biography.slice(0, 200)}...`}
      </p>
      <button
        type="button"
        onClick={() => setExpanded((prev) => !prev)}
        className="text-secondary-color font-bold mt-2"
      >
        {expanded ? "Show less" : "Show more"}
      </button>
    </>
  );
}
