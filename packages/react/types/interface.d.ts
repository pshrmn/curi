import { CuriRouter, Response } from '@curi/core';
import { Action } from '@hickory/root';
export interface CuriContext {
    curi: CuriProps;
}
export interface CuriProps {
    router: CuriRouter;
    response: Response;
    action: Action;
}
