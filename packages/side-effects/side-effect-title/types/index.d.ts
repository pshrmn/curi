import { SideEffect } from '@curi/core';
export interface TitleOptions {
    prefix?: string;
    suffix?: string;
}
declare function createTitleSideEffect(options?: TitleOptions): SideEffect;
export default createTitleSideEffect;
