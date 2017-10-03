import { Subscriber } from '@curi/core';
export interface TitleOptions {
    prefix?: string;
    suffix?: string;
}
declare function createTitleSideEffect(options?: TitleOptions): Subscriber;
export default createTitleSideEffect;
