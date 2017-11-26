import { CuriConfig, Response } from '@curi/core';
import { Action } from '@hickory/root';
export interface CuriContext {
    curi: CuriProps;
}
export interface CuriProps {
    config: CuriConfig;
    response: Response;
    action: Action;
}
