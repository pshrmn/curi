import { CuriConfig, Response } from '@curi/core';

export interface CuriContext {
  curi: CuriConfig;
  curiResponse: Response;
}
