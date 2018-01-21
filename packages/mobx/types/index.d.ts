import { CuriRouter, Response } from "@curi/core";
import { Action } from "@hickory/root";
export default class CuriStore {
    router: CuriRouter;
    response: Response;
    action: Action;
    constructor(router: CuriRouter);
    update(response: Response, action: Action): void;
}
