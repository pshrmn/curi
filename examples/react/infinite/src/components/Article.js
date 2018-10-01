import React from "react";

import generator from "../generator";

export default class Article extends React.Component {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
  }

  render() {
    const { id } = this.props;
    const data = generator(id);
    return (
      <div id={data.id} ref={this.ref}>
        <h2>{data.title}</h2>
        <div dangerouslySetInnerHTML={{ __html: data.content }} />
      </div>
    );
  }

  componentDidMount() {
    this.props.observe(this.ref.current);
  }
}
