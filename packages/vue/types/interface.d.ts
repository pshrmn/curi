import { CuriRouter, Response } from '@curi/core';
import { Action } from '@hickory/root';
export interface ReactiveResponse {
    response: Response;
    action: Action;
}
declare module 'vue/types/vue' {
    interface Vue {
        $curi: ReactiveResponse;
        $router: CuriRouter;
    }
}
