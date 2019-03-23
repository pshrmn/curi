import Vue, { DirectiveOptions } from "vue";
export interface FocusComponent extends Vue {
}
export interface FocusDirectiveProperties {
    key: any;
    preventScroll?: boolean;
    preserve?: boolean;
}
declare const focus_directive: DirectiveOptions;
export default focus_directive;
