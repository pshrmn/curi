import { CuriConfig, AnyResponse } from '@curi/core';

export interface CuriContext {
  curi: CuriConfig;
  curiResponse: AnyResponse;
}
