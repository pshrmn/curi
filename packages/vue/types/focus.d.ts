import Vue, { DirectiveOptions } from "vue";
export interface FocusComponent extends Vue {
}
export interface FocusDirectiveProperties {
    key: any;
    preventScroll?: boolean;
    preserve?: boolean;
}
declare let focusDirective: DirectiveOptions;
export default focusDirective;
