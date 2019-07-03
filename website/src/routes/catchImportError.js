import React from "react";

export default function catchImportError(name) {
  return function caught(error) {
    if (process.env.NODE_ENV !== "production") {
      console.error("Failed to load module for:", name, error);
    }
    return () => <p>Sorry, something went wrong...</p>;
  };
}
