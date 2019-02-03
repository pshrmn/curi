import React from "react";
import { useCuri } from "@curi/react-dom";

export default function Version({ versions, major, params }) {
  const { router } = useCuri();

  // only render dropdown for packages with multiple versions
  if (Object.keys(versions).length > 1) {
    return (
      <select
        value={major}
        onChange={e => {
          router.navigate({
            name: "Package",
            params: { ...params, version: e.target.value }
          });
        }}
      >
        {Object.keys(versions).map(m => {
          return (
            <option key={m} value={m}>
              v{versions[m]}
            </option>
          );
        })}
      </select>
    );
  }

  return <div>v{versions[major]}</div>;
}
