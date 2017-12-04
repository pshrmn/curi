import { ResponseHandler, Response } from '@curi/core';

export interface TitleOptions {
  prefix?: string;
  suffix?: string;
}

function createTitleSideEffect(options?: TitleOptions): ResponseHandler {
  const { prefix = '', suffix = '' } = options || {};

  return function(response: Response) {
    document.title = [prefix, response.title, suffix].join(' ');
  };
}

export default createTitleSideEffect;
