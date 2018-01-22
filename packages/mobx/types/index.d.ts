import { CuriRouter, Response, Navigation } from "@curi/core";
export default class CuriStore {
    router: CuriRouter;
    response: Response;
    navigation: Navigation;
    constructor(router: CuriRouter);
    update(response: Response, navigation: Navigation): void;
}
