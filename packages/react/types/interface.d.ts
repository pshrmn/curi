import { CuriRouter, Response, Navigation } from '@curi/core';
export interface CuriContext {
    curi: CuriProps;
}
export interface CuriProps {
    router: CuriRouter;
    response: Response;
    navigation: Navigation;
}
