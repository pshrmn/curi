import { CuriConfig, Response } from '@curi/core';
import { Action } from '@hickory/root';
export interface ReactiveCuriProps {
    config: CuriConfig;
    response: Response;
    action: Action;
}
declare module 'vue/types/vue' {
    interface Vue {
        $curi: ReactiveCuriProps;
    }
}
