import { ResponseHandler } from '@curi/core';
export interface TitleOptions {
    prefix?: string;
    suffix?: string;
    delimiter?: string;
}
declare function createTitleSideEffect(options?: TitleOptions): ResponseHandler;
export default createTitleSideEffect;
