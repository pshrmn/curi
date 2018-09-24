/*
Adapted from https://github.com/tomchentw/react-prism, but adds support for passing
other props to the <pre> as well

The MIT License (MIT)

Copyright (c) 2015 Tom Chen <developer@tomchentw.com>

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

import React from "react";
import { PropTypes } from "prop-types";

import "../../scss/prismOverrides.scss";

class PrismCode extends React.PureComponent {
  static propTypes = {
    async: PropTypes.bool,
    className: PropTypes.string,
    children: PropTypes.any,
    component: PropTypes.node
  };

  static defaultProps = {
    component: `code`
  };

  componentDidMount() {
    this._hightlight();
  }

  componentDidUpdate() {
    this._hightlight();
  }

  _hightlight() {
    window.Prism &&
      window.Prism.highlightElement(this._domNode, this.props.async);
  }

  _handleRefMount = domNode => {
    this._domNode = domNode;
  };

  render() {
    const { component: Wrapper, children, ...rest } = this.props;
    return (
      <Wrapper ref={this._handleRefMount} {...rest}>
        {children}
      </Wrapper>
    );
  }
}

export default PrismCode;
