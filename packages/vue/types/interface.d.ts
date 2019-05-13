import { CuriRouter, Response, Navigation } from "@curi/types";
export interface ReactiveResponse {
    response: Response | undefined;
    navigation: Navigation | undefined;
}
declare module "vue/types/vue" {
    interface Vue {
        $curi: ReactiveResponse;
        $router: CuriRouter;
    }
}
