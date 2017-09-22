import { SideEffect, AnyResponse } from '@curi/core';

export interface TitleOptions {
  prefix?: string;
  suffix?: string;
}

function createTitleSideEffect(options?: TitleOptions): SideEffect {
  const { prefix = '', suffix = '' } = options || {};

  return function(response: AnyResponse) {
    document.title = [prefix, response.title, suffix].join(' ');
  };
}

export default createTitleSideEffect;
