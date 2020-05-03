import React from "react";
import { useRouter } from "@curi/react-dom";

const CLASSNAMES = "m-0 mr-1 mb-1";

let Version = ({ versions, major, params }) => {
  let router = useRouter();

  // only render dropdown for packages with multiple versions
  if (Object.keys(versions).length > 1) {
    return (
      <label className={CLASSNAMES}>
        Version:{" "}
        <select
          value={major}
          onChange={e => {
            let url = router.url({
              name: "Package",
              params: { ...params, version: e.target.value }
            });
            router.navigate({ url });
          }}
          className="font-serif my-1 mx-0 text-xl"
        >
          {Object.keys(versions).map(m => {
            return (
              <option key={m} value={m}>
                {versions[m]}
              </option>
            );
          })}
        </select>
      </label>
    );
  }

  return <p className={CLASSNAMES}>v{versions[major]}</p>;
};

export default Version;
