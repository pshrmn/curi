import React from "react";
import { Curious } from "@curi/react-dom";

class VersionSelect extends React.Component {
  goToVersion = e => {
    this.props.router.navigate({
      name: "Package",
      params: {
        ...this.props.params,
        version: e.target.value
      }
    });
  };
  render() {
    const { versions, major } = this.props;
    return (
      <select value={major} onChange={this.goToVersion}>
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
}

const CuriousVersionSelect = props => {
  return (
    <Curious>
      {({ router }) => <VersionSelect {...props} router={router} />}
    </Curious>
  );
};

export default function Version({ versions, major, params }) {
  if (Object.keys(versions).length > 1) {
    return (
      <CuriousVersionSelect versions={versions} major={major} params={params} />
    );
  }

  return <div>v{versions[major]}</div>;
}
