import React from "react";
import { PrismBlock, InlineJS as IJS } from "../../../components/PrismBlocks";
import { Section } from "../../../components/Sections";
import { isNull } from "util";

const NPM = ({ name }) => (
  <div>
    <PrismBlock lang="bash">
      {`npm install @curi/${name}
yarn add @curi/${name}`}
    </PrismBlock>
  </div>
);

class Unpkg extends React.Component {
  state = { expanded: false };

  toggle = () => {
    this.setState({
      expanded: !this.state.expanded
    });
  };

  render() {
    const { name, version, globalName } = this.props;
    return (
      <div>
        <p>Prefer inline scripts?</p>
        <button type="button" onClick={this.toggle}>
          {this.state.expanded ? "Hide <script> info" : "Show <script> info"}
        </button>
        {this.state.expanded ? (
          <React.Fragment>
            <p>
              <a href="https://unpkg.com">Unpkg</a> will always have the latest
              version of <IJS>@curi/{name}</IJS> available.
            </p>
            <PrismBlock lang="markup">
              {`<script src="https://unpkg.com/@curi/${name}@${version}/dist/curi-${name}.js"></script>`}
            </PrismBlock>
            <p>
              There is also a minimized version available if you change the
              filename to <IJS>{name}.min.js</IJS>. The package will be attached
              to the window as <IJS>window.{globalName}</IJS>.
            </p>
          </React.Fragment>
        ) : null}
      </div>
    );
  }
}

export default ({ name, version, globalName, unpkg }) => (
  <Section title="Installation" id="installation">
    <NPM name={name} />
    {unpkg ? (
      <Unpkg name={name} version={version} globalName={globalName} />
    ) : null}
  </Section>
);
