import { Observer, Emitted } from "@curi/types";
export declare type TitleBuilder = (emitted: Emitted) => string;
declare let title: (callback: TitleBuilder) => Observer;
export default title;
