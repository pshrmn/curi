import { ReactNode, Ref } from "react";
export interface FocusProps {
    children(ref: Ref<any>): ReactNode;
    preventScroll?: boolean;
    preserve?: boolean;
}
declare const Focus: (props: FocusProps) => JSX.Element;
export default Focus;
