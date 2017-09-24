import { CuriConfig } from '@curi/core';
declare module 'vue/types/vue' {
    interface Vue {
        $curi: CuriConfig;
    }
}
