import { ResponseHandler } from '@curi/core';
export interface TitleOptions {
    prefix?: string;
    suffix?: string;
}
declare function createTitleSideEffect(options?: TitleOptions): ResponseHandler;
export default createTitleSideEffect;
