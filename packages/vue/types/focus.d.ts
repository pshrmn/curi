import { DirectiveOptions } from "vue";
export interface FocusDirectiveProperties {
    key: any;
    preventScroll?: boolean;
    preserve?: boolean;
}
declare let focusDirective: DirectiveOptions;
export default focusDirective;
