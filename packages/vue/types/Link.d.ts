import Vue from "vue";
import { ComponentOptions } from "vue";
export interface LinkComponent extends Vue {
    name: string;
    params?: object;
    hash?: string;
    query?: any;
    state?: any;
    url: string;
    click(e: MouseEvent): void;
}
declare let Link: ComponentOptions<LinkComponent>;
export default Link;
